using EDoc.Facade;
using EDoc.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Imaging;
using Ghostscript.NET.Rasterizer;
using EDoc.Dtos;
using System.IO.Compression;

namespace EDoc.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IWebHostEnvironment _hostEnvironment;

        public DocumentsController(ApplicationDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet("GetDocuments")]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            return await _context.Documents.ToListAsync();
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            try
            {
                foreach (var file in files)
                {
                    if (file == null || file.Length == 0)
                        return BadRequest("No file uploaded.");

                    var allowedTypes = new[] { "application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "image/jpeg", "image/png" };
                    if (!allowedTypes.Contains(file.ContentType))
                        return BadRequest("Invalid file type.");

                    var uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");
                    if (!Directory.Exists(uploadsFolderPath))
                        Directory.CreateDirectory(uploadsFolderPath);

                    var fileName = $"{Guid.NewGuid()}-{file.FileName}";
                    var filePath = Path.Combine(uploadsFolderPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var document = new Document
                    {
                        Name = fileName,
                        Type = file.ContentType,
                        UploadDateTime = DateTime.Now
                    };

                    _context.Documents.Add(document);
                    await _context.SaveChangesAsync();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("{id}/Share")]
        public IActionResult ShareDocument(int id, [FromBody] ShareDocumentRequestDto request)
        {
            var document = _context.Documents.FirstOrDefault(d => d.Id == id);
            if (document == null)
                return NotFound();

            var token = Guid.NewGuid().ToString();

            var expiration = DateTime.UtcNow.Add(request.Duration);

            var shareLink = new ShareLink
            {
                Token = token,
                DocumentId = document.Id,
                Expiration = expiration
            };

            _context.ShareLinks.Add(shareLink);
            _context.SaveChanges();

            var shareUrl = Url.Action("Download" , "Documents", new { token }, Request.Scheme,Request.Host + "/api/v1");

            return Ok(new { shareUrl });
        }

        [HttpGet("Download")]
        public IActionResult DownloadSharedDocument(string token)
        {
            var shareLink = _context.ShareLinks.FirstOrDefault(sl => sl.Token == token);
            if (shareLink == null || shareLink.Expiration < DateTime.UtcNow)
                return NotFound();

            var document = _context.Documents.FirstOrDefault(d => d.Id == shareLink.DocumentId);
            if (document == null)
                return NotFound();

            var uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");
            var filePath = Path.Combine(uploadsFolderPath, document.Name);

            return PhysicalFile(filePath, "application/octet-stream", document.Name);
        }

        [HttpGet("{id}/Download")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            var document = _context.Documents.FirstOrDefault(d => d.Id == id);
            if (document == null)
                return NotFound();

            var uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");
            var filePath = Path.Combine(uploadsFolderPath, document.Name);
            document.DownloadCount++;
            _context.Update(document);
            await _context.SaveChangesAsync();
            return PhysicalFile(filePath, "application/octet-stream", document.Name);

        }

        [HttpPost("DownloadDocuments")]
        public async Task<IActionResult> DownloadDocuments([FromBody] int[] documentIds)
        {
            var documents = _context.Documents.Where(d => documentIds.Contains(d.Id)).ToList();
            if (documents.Count == 0)
                return NotFound();

            var tempDirectory = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            Directory.CreateDirectory(tempDirectory);
            var uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");

            try
            {
                foreach (var document in documents)
                {
                    var sourceFilePath = Path.Combine(uploadsFolderPath, document.Name);
                    var destinationFilePath = Path.Combine(tempDirectory, document.Name);
                    System.IO.File.Copy(sourceFilePath, destinationFilePath);
                    document.DownloadCount++;
                    _context.Update(document);
                    await _context.SaveChangesAsync();
                }

                var zipFileName = $"{Guid.NewGuid()}.zip";
                var zipFilePath = Path.Combine(Path.GetTempPath(), zipFileName);

                ZipFile.CreateFromDirectory(tempDirectory, zipFilePath);

                byte[] zipBytes = await System.IO.File.ReadAllBytesAsync(zipFilePath);

                System.IO.File.Delete(zipFilePath);
                Directory.Delete(tempDirectory, true);
                return File(zipBytes, "application/zip", zipFileName);
            }
            catch (Exception)
            {
                Directory.Delete(tempDirectory, true);
                throw;
            }
        }

        [HttpGet("{id}/Preview")]
        public IActionResult GetDocumentPreview(int id)
        {
            var document = _context.Documents.FirstOrDefault(d => d.Id == id);
            if (document == null)
                return NotFound();

            var uploadsFolderPath = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");
            var filePath = Path.Combine(uploadsFolderPath, document.Name);

            var isImage = IsImageFile(filePath);

            if (isImage)
            {
                return PhysicalFile(filePath, "image/jpeg");
            }
            if (IsPdfFile(filePath))
            {
                var tempImagePath = Path.GetTempFileName() + ".jpg";
                GeneratePreviewImage(filePath, tempImagePath);

                return PhysicalFile(tempImagePath, "image/jpeg");
            }
            else
            {
                var fileName = Path.GetFileName(filePath);
                return PhysicalFile(filePath, "application/octet-stream", fileName);
            }
        }

        private bool IsPdfFile(string filePath)
        {
            var pdfExtensions = new[] { ".pdf" };

            var extension = Path.GetExtension(filePath);
            return pdfExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase);
        }

        private void GeneratePreviewImage(string filePath, string tempImagePath)
        {
            using (var rasterizer = new GhostscriptRasterizer())
            {
                rasterizer.Open(filePath);

                // Get the first page of the PDF
                var previewImage = rasterizer.GetPage(96, 1);

                previewImage.Save(tempImagePath, ImageFormat.Png);
            }
        }

        private bool IsImageFile(string filePath)
        {
            var imageExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };

            var extension = Path.GetExtension(filePath);
            return imageExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase);
        }
    }

}
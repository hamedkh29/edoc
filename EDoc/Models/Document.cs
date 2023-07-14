namespace EDoc.Models
{
    public class Document
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime UploadDateTime { get; set; }
        public int DownloadCount { get; set; }
    }
}

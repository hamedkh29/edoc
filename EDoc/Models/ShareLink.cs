namespace EDoc.Models
{
    public class ShareLink
    {
        public long Id { get; set; }
        public string Token { get; set; }
        public int DocumentId { get; set; }
        public DateTime Expiration { get; set; }
    }
}

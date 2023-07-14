using EDoc.Models;
using Microsoft.EntityFrameworkCore;

namespace EDoc.Facade
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Document> Documents { get; set; }
        public DbSet<ShareLink> ShareLinks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}

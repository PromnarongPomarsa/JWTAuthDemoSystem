using backend_member.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_member.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UMEMUser> ume_m_user { get; set; }
    }
}

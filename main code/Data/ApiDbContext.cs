using Microsoft.EntityFrameworkCore;
using WebEnterprise.Entities;

namespace WebEnterprise.Data 
{
    public class ApiDbContext : DbContext
    {
        public virtual DbSet<Posts> Posts { get; set;}

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
            
        }
    }
}
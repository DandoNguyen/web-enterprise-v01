using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Data
{
    public class ApiDbContext : DbContext
    {
        public virtual DbSet<Posts> Posts {get; set;}
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }
    }
}
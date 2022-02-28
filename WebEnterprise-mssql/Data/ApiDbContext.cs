using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Data
{
    public class ApiDbContext : IdentityDbContext
    {
        public virtual DbSet<Posts> Posts {get; set;}
        public virtual DbSet<RefreshToken> RefreshTokens { get; set;}
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }
    }
}
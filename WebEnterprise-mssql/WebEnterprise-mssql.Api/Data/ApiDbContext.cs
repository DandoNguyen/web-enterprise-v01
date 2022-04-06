using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Data
{
    public class ApiDbContext : IdentityDbContext<ApplicationUser>
    {
        public virtual DbSet<Posts> Posts { get; set;}
        public virtual DbSet<FilesPath> FilesPath { get; set;}
        public virtual DbSet<Views> Views { get; set;}
        public virtual DbSet<Votes> Votes { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set;}
        public virtual DbSet<Departments> Department { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set;}
        public virtual DbSet<Topics> Topics { get; set; }
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }
    }
}
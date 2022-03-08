using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Dtos;

namespace WebEnterprise_mssql.Models
{
    public class Roles
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<ApplicationUser> ApplicationUser { get; set; }
    }
}
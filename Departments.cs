using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Dtos;

namespace WebEnterprise_mssql.Models
{
    public class Departments
    {
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }


        public virtual ICollection<ApplicationUser> ApplicationUser { get; set; }
    }
}
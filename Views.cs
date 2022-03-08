using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Dtos;

namespace WebEnterprise_mssql.Models
{
    public class Views
    {
        public string ViewId { get; set; }
        public string LastVistedDate { get; set; }

        [ForeignKey("Users")]

        [InverseProperty("Views")]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Dtos;

namespace WebEnterprise_mssql.Models
{
    public class Reactions
    {
        public string ReactionId { get; set; }
        public string ReactionType { get; set; }
        public string CreatedDate { get; set; }

        [ForeignKey("Users")]

        public virtual ICollection<ApplicationUser> ApplicationUser { get; set; }
    }
}
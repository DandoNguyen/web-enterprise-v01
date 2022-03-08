using System.ComponentModel.DataAnnotations.Schema;
using System;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Dtos;

namespace WebEnterprise_mssql.Models
{
    public class Comments
    {
        public string CommentId { get; set; }
        public string Content { get; set; }
        public string CreatedDate { get; set; }
        public string LastModifiedDate { get; set; }

        [ForeignKey("Users")]
        [ForeignKey("Posts")]

        [InverseProperty("Comments")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Posts Posts { get; set; }
    }
}
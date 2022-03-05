using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Dtos
{
    public record PostDto
    {
        public int id { get; set; }
        [Required]
        public string title { get; set; }
        public string Desc { get; set; }
        [Required]
        public string content { get; set; }
        public DateTimeOffset createdDate { get; set; }
        public DateTimeOffset LastModifiedDate { get; set; }
        public int ViewsCount { get; set; } 

        [InverseProperty("PostDto")]
        public virtual ApplicationUser UserId { get; set; }
        public int CategoryId { get; set; }
        public int SubmissionId { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System;

namespace WebEnterprise_mssql.Dtos
{
    public class DeleteCommentDto
    {
        [Required]
        public string PostId { get; set; }
        [Required]
        public Guid commentId { get; set; }
    }
}
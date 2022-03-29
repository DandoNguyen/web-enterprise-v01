using System.ComponentModel.DataAnnotations;
using System;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class CommentDto
    {
        [Required]
        public string PostId { get; set; }
        [Required]
        public string userId { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset LastModifiedDate { get; set; }
        public string PreviousCommentId { get; set; }
        [Required]
        public bool IsChild { get; set; }
        public Guid ParentId { get; set; }
    }
}
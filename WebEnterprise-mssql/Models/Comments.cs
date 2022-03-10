using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebEnterprise_mssql.Models
{
    public class Comments
    {
        [KeyAttribute]
        public Guid CommentId { get; set; }
        public string Content { get; set; }
        public string CreatedDate { get; set; }
        public string LastModifiedDate { get; set; }

        public string userId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public string PostId { get; set; }
        public virtual Posts Posts { get; set; }
    }
}
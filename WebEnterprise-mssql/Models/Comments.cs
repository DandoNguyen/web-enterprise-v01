using System.ComponentModel.DataAnnotations.Schema;

namespace WebEnterprise_mssql.Models
{
    public class Comments
    {
        public string CommentId { get; set; }
        public string Content { get; set; }
        public string CreatedDate { get; set; }
        public string LastModifiedDate { get; set; }

        [ForeignKey("Users")]
        

        [InverseProperty("Comments")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        [ForeignKey("Posts")]
        public virtual Posts Posts { get; set; }
    }
}
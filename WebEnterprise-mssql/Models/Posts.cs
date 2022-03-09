using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace WebEnterprise_mssql.Models 
{
    public record Posts
    {   
        public int id { get; set; }
        public string title { get; set; }
        public string Desc { get; set; }
        public string content { get; set; }
        public DateTimeOffset createdDate { get; set; }
        public DateTimeOffset LastModifiedDate { get; set; }
        public int ViewsCount { get; set; } 

        //[ForeignKey("Users")]
        //public string User { get; set; }

        [InverseProperty("Posts")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        [ForeignKey("Categories")]
        public virtual Categories Categories { get; set; }
        [ForeignKey("Submissions")]
        public virtual Submissions Submissions { get; set; }
        public virtual Views Views { get; set; }

            //public int CategoryId { get; set; }
            //public int SubmissionId { get; set; 
    }
}

    // ID_IDEA int,
    // TITLE NVARCHAR(100),
    // DESCRIPTION NVARCHAR(100),
    // CONTENT NVARCHAR(100),
    // CREATED_DATE NVARCHAR(100),
    // LAST_MODIFIED_DATE DATETIME,
    // VIEW_COUNT INT,
    // USER_ID INT,
    // CATEGORY_ID INT,
    // SUBMISSION_ID INT
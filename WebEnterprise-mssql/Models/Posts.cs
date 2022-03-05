using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

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

        [InverseProperty("Posts")]
        public virtual ApplicationUser UserId { get; set; }
        public int CategoryId { get; set; }
        public int SubmissionId { get; set; }
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
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebEnterprise_mssql.Dtos
{
    public class UpdatedPostDto
    {
        public string title { get; set; }
        public string Desc { get; set; }
        public string content { get; set; }
        public DateTimeOffset LastModifiedDate { get; set; }
        public int ViewsCount { get; set; } 
        public int CategoryId { get; set; }
        public int SubmissionId { get; set; }
    }
}
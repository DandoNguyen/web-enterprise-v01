using System;

namespace WebEnterprise_mssql.Models 
{
    public record Posts
    {   
        public int id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public DateTimeOffset createdDate { get; set; }
    }
}
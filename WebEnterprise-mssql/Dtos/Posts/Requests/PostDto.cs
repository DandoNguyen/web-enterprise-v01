using System;

namespace WebEnterprise_mssql.Dtos
{
    public record PostDto
    {
        public int id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public DateTimeOffset createdDate { get; set; }
    }
}
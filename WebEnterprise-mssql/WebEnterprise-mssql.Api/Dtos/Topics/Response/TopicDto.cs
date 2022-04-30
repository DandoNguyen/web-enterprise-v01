using System;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class TopicDto
    {
        public Guid TopicId { get; set; }
        public string TopicName { get; set; }
        public string TopicDesc { get; set; }
        public DateTimeOffset ClosureDate { get; set; }
        public DateTimeOffset FinalClosureDate { get; set; }
        public string Status { get; set; }
    }
}

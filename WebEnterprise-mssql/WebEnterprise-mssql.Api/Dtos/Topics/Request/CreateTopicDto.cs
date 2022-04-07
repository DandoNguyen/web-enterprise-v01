using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class CreateTopicDto
    {
        [Required]
        public string TopicName { get; set; }
        [Required]
        public DateTimeOffset ClosureDate { get; set; }
        [Required]
        public DateTimeOffset FinalClosureDate { get; set; }
    }
}
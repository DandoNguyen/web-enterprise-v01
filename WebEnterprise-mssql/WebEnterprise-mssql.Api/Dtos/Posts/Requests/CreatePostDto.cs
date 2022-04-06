using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class CreatePostDto
    {
        [Required]
        public string title { get; set;}  

        [Required]
        public string content { get; set; }
        [Required]
        public string Desc { get; set; }
        [Required]
        public bool IsAnonymous { get; set; }

        //QAC section
        [Required]
        public bool IsApproved { get; set; }
        [Required]
        public bool IsAssigned { get; set; }

        [Required]
        public List<string> Categories { get; set; }
    }
}
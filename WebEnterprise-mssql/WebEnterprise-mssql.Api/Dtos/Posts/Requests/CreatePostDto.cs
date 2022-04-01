using System.ComponentModel.DataAnnotations;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class CreatePostDto
    {
        [Required]
        public string title { get; set;}  

        [Required]
        public string content { get; set; }
    }
}
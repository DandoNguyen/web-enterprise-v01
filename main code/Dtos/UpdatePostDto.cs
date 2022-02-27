using System.ComponentModel.DataAnnotations;

namespace WebEnterprise.Dtos
{
    public record UpdatePostDto 
    {
        [Required]
        [MinLength(5)]
        public string Title { get; init; }

        public string Content { get; init; }
    }
}
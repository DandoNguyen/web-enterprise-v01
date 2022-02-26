using System;
using System.ComponentModel.DataAnnotations;

namespace WebEnterprise.Dtos
{
    public record CreatePostDto
    {
        [Required]
        [MinLength(5)]
        public string Title { get; init; }

        public string Content { get; init; }
    }
}
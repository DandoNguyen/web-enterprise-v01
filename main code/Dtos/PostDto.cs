using System;

namespace WebEnterprise.Dtos
{
    public record PostDto {
        public Guid id { get; init; }
        public string Title { get; init; }
        public string Content { get; init; }
        public DateTimeOffset CreatedDate { get; init; }
    }
}
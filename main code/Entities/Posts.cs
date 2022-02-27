using System.IO;
using System;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace WebEnterprise.Entities
{
    public record Posts {

        public Guid id { get; init; }
        public string Title { get; init; }
        public string Content { get; init; }
        public DateTimeOffset CreatedDate { get; init; }
    }
}
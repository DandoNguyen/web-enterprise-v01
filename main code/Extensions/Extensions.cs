using System.Data.Common;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Extensions
{
    public static class Extensions
    {
        public static PostDto AsDto(this Posts post)
        {
            return new PostDto {
                id = post.id,
                title = post.title,
                content = post.content,
                createdDate = post.createdDate
            };
        }
    }
}
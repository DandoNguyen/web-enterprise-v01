using WebEnterprise.Dtos;
using WebEnterprise.Entities;

namespace WebEnterprise
{
   public static class Extensions
   {
    public static PostDto AsDto(this Posts post)
    {
        return new PostDto {
                id = post.id,
                Title = post.Title,
                Content = post.Content,
                CreatedDate = post.CreatedDate
            };
        }   
   }
}
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using WebEnterprise.Entities;

namespace WebEnterprise.Repositories
{
    public interface IPostsRepo {
        Task<IEnumerable<Posts>> GetPostsAsync();
        Task<Posts> GetPostAsync(Guid id);
        Task CreatePostAsync(Posts post);
        Task UpdatePostAsync(Posts post);
        Task DeletePostAsync(Guid id);
    }
    
}
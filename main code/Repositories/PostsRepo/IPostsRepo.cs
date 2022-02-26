using System;
using System.Collections.Generic;
using WebEnterprise.Entities;

namespace WebEnterprise.Repositories
{
    public interface IPostsRepo {
        public IEnumerable<Posts> GetPosts();
        public Posts GetPost(Guid id);
        void CreatePost(Posts post);
        void UpdatePost(Posts post);
        void DeletePost(Guid id);
    }
    
}
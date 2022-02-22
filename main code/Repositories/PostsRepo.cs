using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise.Entities;

namespace WebEnterprise.Repositories
{
    public class PostsRepo : IPostsRepo
    {
        private readonly List<Posts> posts = new() {
            new Posts {
                id = Guid.NewGuid(),
                Title = "Quang Dung Dieu Huyen",
                Content = "Dung Dep Trai Huyen xinh gai Backend",
                CreatedDate = DateTimeOffset.UtcNow
            },
            new Posts {
                id = Guid.NewGuid(),
                Title = "Phuong Nam Mai Linh",
                Content = "Nam Linh Frontend",
                CreatedDate = DateTimeOffset.UtcNow
            },
            new Posts {
                id = Guid.NewGuid(),
                Title = "Nhu Ngoc Dong Hai",
                Content = "Ngoc Hai Data",
                CreatedDate = DateTimeOffset.UtcNow
            }
        };

        
        public IEnumerable<Posts> GetPosts() {
            return posts;
        }

        
        public Posts GetPost(Guid id) {
            return posts.Where(x => x.id == id).SingleOrDefault();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Repository
{
    public class PostsRepository : Repository<Posts>, IPostsRepository
    {
        private readonly ApiDbContext context;

        public PostsRepository(ApiDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<List<Posts>> GetAllPostsAsync()
        {
            var posts = await FindAll().ToListAsync();
            return posts;
        }

        public async Task<List<Posts>> GetAllPostsFromUserIDAsync(string userId)
        {
            var posts = await FindByCondition(x => x.UserId.Equals(userId))
                .ToListAsync();
            return posts;
        }

        public async Task<Posts> GetPostByIDAsync(Guid postId)
        {
            var post = await FindByCondition(x => x.PostId.Equals(postId))
                .FirstOrDefaultAsync();
            return post;
        }
    }
}
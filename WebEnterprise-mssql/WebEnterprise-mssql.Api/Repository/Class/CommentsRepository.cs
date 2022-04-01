using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Repository
{
    public class CommentsRepository : Repository<Comments>, ICommentsRepository
    {
        public CommentsRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<Comments>> GetListParentAsync(string PostId)
        {
            var listParent = await FindByCondition(x => x.PostId.Equals(PostId)).ToListAsync();
            return listParent;
        }
    }
}
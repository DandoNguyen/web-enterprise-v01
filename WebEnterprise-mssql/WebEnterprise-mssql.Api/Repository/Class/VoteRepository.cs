using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Repository
{
    public class VoteRepository : Repository<Votes>, IVoteRepository
    {
        public VoteRepository(ApiDbContext context) : base(context)
        {
        }

        public async Task<List<Votes>> GetlistVoteAsync(Guid postId)
        {
           var GetListVote = await FindByCondition(x => x.postId.Equals(postId)).ToListAsync();
           return GetListVote;
        }

        public async Task<List<Votes>> GetListVoteByVoteId(Guid voteId)
        {
            var GetLisVotebyVId = await FindByCondition(x => x.voteId.Equals(voteId)).ToListAsync();
            return GetLisVotebyVId;
        }
    }
}
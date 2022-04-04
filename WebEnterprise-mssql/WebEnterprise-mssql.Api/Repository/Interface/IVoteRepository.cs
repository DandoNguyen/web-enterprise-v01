using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Repository
{
    public interface IVoteRepository : IRepository<Votes>
    {
        Task<List<Votes>> GetlistVoteAsync(Guid postId);
        Task<List<Votes>> GetListVoteByVoteId(Guid voteId);
    }

}
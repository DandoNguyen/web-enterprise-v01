using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;
using WebEnterprise_mssql.Repository.Interface;

namespace WebEnterprise_mssql.Repository.Class
{
    public class DownVoteRepository : Repository<DownVote>, IDownVoteRepository
    {
        public DownVoteRepository(ApiDbContext context) : base(context)
        {

        }
    }
}

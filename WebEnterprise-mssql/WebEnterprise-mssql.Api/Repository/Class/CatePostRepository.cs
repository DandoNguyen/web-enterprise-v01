using System.Collections.Generic;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Repository
{
    public class CatePostRepository : Repository<CatePost>, ICatePostRepository
    {
        public CatePostRepository(ApiDbContext context) : base(context)
        {
        }
    }
}
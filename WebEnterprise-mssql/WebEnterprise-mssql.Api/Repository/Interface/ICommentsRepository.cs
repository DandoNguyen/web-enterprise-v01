using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Repository
{
    public interface ICommentsRepository : IRepository<Comments>
    {
        Task<List<Comments>> GetListParentAsync(string PostId);
    }
}
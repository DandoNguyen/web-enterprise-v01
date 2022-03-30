using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace WebEnterprise_mssql.Api.Repository
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entity);
    }
}
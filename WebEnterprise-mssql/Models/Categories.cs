using System.Collections.Generic;

namespace WebEnterprise_mssql.Models
{
    public class Categories
    {
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Posts> Posts { get; set; }
    }
}
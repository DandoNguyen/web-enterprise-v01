using System;
using System.Collections.Generic;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class CateDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Desc { get; set; }        
        public int postCount { get; set; }
    }
}

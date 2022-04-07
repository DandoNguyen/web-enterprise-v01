using System.ComponentModel.DataAnnotations;
using System;

namespace WebEnterprise_mssql.Api.Models
{
    public class CatePost
    {
        [KeyAttribute]
        public Guid CatePostId { get; set; }
        public string PostId { get; set; }
        public string CateId { get; set; }
    }
}
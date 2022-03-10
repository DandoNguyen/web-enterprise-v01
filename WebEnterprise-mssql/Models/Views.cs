using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebEnterprise_mssql.Models
{
    public class Views
    {
        [KeyAttribute]
        public Guid ViewId { get; set; }
        public string LastVistedDate { get; set; }

        public string userId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

        public ICollection<Posts> Posts { get; set; }
    }
}
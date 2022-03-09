using System.Collections.Generic;

namespace WebEnterprise_mssql.Models
{
    public class Roles
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<ApplicationUser> ApplicationUser { get; set; }
    }
}
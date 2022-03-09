using System.Collections.Generic;

namespace WebEnterprise_mssql.Models
{
    public class Departments
    {
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }


        public virtual ICollection<ApplicationUser> ApplicationUser { get; set; }
    }
}
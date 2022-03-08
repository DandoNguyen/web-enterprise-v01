using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Dtos;

namespace WebEnterprise_mssql.Models
{
    public class ApplicationUser : IdentityUser
    {
        //public int? Age { get; set; }

        Public int? StaffId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DOB { get; set; }
        public string Address { get; set; }

        //Foreign Key
        public virtual ICollection<Posts> Posts { get; set; }
    }
}


//Age = Now - DOB
//Position = Role
//Department
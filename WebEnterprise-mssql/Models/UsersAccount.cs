using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WebEnterprise_mssql.Models
{
    public class UsersAccount : IdentityUser
    {
        public int Age { get; set; }
        public string Address { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }

        //Foreign Key
        public virtual ICollection<Posts> Posts { get; set; }
    }
}
using System;

namespace WebEnterprise_mssql.Api.Dtos
{
    public class UpdateApplicationUserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public int? Age { get; set; }
        public string Address { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DOB { get; set; }

    }
}
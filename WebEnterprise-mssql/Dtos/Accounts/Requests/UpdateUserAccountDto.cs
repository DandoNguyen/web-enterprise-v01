namespace WebEnterprise_mssql.Dtos
{
    public class UpdateUserAccountDto
    {
        public string id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
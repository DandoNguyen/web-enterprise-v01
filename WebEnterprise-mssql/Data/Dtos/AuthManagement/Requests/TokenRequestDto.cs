using System.ComponentModel.DataAnnotations;

namespace WebEnterprise_mssql.Dtos
{
    public class TokenRequestDto
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string RefreshToken { get; set; }
    }
}
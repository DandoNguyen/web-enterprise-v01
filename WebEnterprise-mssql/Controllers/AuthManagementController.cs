using System;
using System.Security.Claims;
using System.Security.AccessControl;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebEnterprise_mssql.Configuration;
using WebEnterprise_mssql.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebEnterprise_mssql.Controllers
{
    [Route("api/[controller]")] // api/authManagement
    [ApiController]
    public class AuthManagementController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly JwtConfig jwtConfig;

        public AuthManagementController(UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> optionsManager)
        {
            this.userManager = userManager;
            this.jwtConfig = optionsManager.CurrentValue;
        }

        [HttpPost] 
        [Route("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UsersRegistrationDto usersRegistrationDto) {
            
            if(ModelState.IsValid) {
                
                var existingEmail = await userManager.FindByEmailAsync(usersRegistrationDto.Email);
                
                if(existingEmail is not null) {
                    return BadRequest(new RegistrationResponseDto() {
                       Errors = new List<string>()  {
                           "User Email already exist!!!"
                       },
                       Success = false
                    });
                }

                var newUser = new IdentityUser() {
                    Email = usersRegistrationDto.Email,
                    UserName = usersRegistrationDto.Username
                };

                var isCreated = await userManager.CreateAsync(newUser, usersRegistrationDto.Password);
                if(isCreated.Succeeded) {

                    var jwttoken = GenerateJwtToken(newUser);

                    return Ok(new RegistrationResponseDto() {
                        Success = true,
                        Token = jwttoken
                    });

                } else {
                    return BadRequest(new RegistrationResponseDto() {
                        Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                        Success = false
                    });
                }
            }
            return BadRequest(new RegistrationResponseDto() {
                Errors = new List<string>() {
                    "Invalid Payload!!!"
                },
                Success = false
            });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDto userLogin) {
            
            if(ModelState.IsValid) {
                var existingUser = await userManager.FindByEmailAsync(userLogin.Email);

                if(existingUser is null) {
                    return BadRequest(new RegistrationResponseDto() {
                        Errors = new List<string>() {
                            "Email is not exist!!"
                        }
                    });
                }

                var isCorrect = await userManager.CheckPasswordAsync(existingUser, userLogin.Password);

                if(!isCorrect) {
                    return BadRequest(new RegistrationResponseDto() {
                        Errors = new List<string>() {
                            "Password is not correct!!"
                        }
                    });
                }

                var jwtToken = GenerateJwtToken(existingUser);

                return Ok(new RegistrationResponseDto() {
                    Success = true,
                    Token = jwtToken
                });
            }
            return BadRequest(new RegistrationResponseDto() {
                Errors = new List<string>() {
                    "Ivalid Paylaod"
                }
            });
        }

        private string GenerateJwtToken(IdentityUser user) {
            var JwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new [] {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = JwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken =JwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
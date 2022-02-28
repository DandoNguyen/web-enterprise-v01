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
using WebEnterprise_mssql.Data;
using WebEnterprise_mssql.Models;
using Microsoft.EntityFrameworkCore;

namespace WebEnterprise_mssql.Controllers
{
    [Route("api/[controller]")] // api/authManagement
    [ApiController]
    public class AuthManagementController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly JwtConfig jwtConfig;
        private readonly TokenValidationParameters tokenValidationParams;
        private readonly ApiDbContext context;

        public AuthManagementController(
            UserManager<IdentityUser> userManager, 
            IOptionsMonitor<JwtConfig> optionsManager,
            TokenValidationParameters tokenValidationParams,
            ApiDbContext context)
        {
            this.context = context;
            this.userManager = userManager;
            this.jwtConfig = optionsManager.CurrentValue;
            this.tokenValidationParams = tokenValidationParams;
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

                    var jwttoken = await GenerateJwtToken(newUser);

                    return Ok(jwttoken);

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

                var jwtToken = await GenerateJwtToken(existingUser);

                return Ok(jwtToken);
            }
            return BadRequest(new RegistrationResponseDto() {
                Errors = new List<string>() {
                    "Ivalid Paylaod"
                }
            });
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<IActionResult> Refreshtoken([FromBody] TokenRequestDto tokenRequestDto) {
            if(ModelState.IsValid) {
                var result = await VerifyAndGenerateToken(tokenRequestDto);

                if(result is null) {
                    return BadRequest(new RegistrationResponseDto() {
                        Errors = new List<string>() {
                            "Invalid Token!!!",
                        },
                        Success = false
                    });
                }

                return Ok(result);
            }
            return BadRequest(new RegistrationResponseDto() {
                Errors = new List<string>() {
                    "Invalid Payload!!!",
                },
                Success = false
            });
        }

        private async Task<AuthResult> GenerateJwtToken(IdentityUser user) {
            var JwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new [] {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddSeconds(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = JwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = JwtTokenHandler.WriteToken(token);

            var refreshToken = new RefreshToken() {
                JwtId = token.Id,
                IsUsed = false,
                IsRevoked = false,
                UserId = user.Id,
                AddedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                Token = RandomString(35) + Guid.NewGuid()
            };

            await context.RefreshTokens.AddAsync(refreshToken);
            await context.SaveChangesAsync();

            return new AuthResult() {
                Token = jwtToken,
                Success = true,
                RefreshToken = refreshToken.Token
            };
        }


        public async Task<AuthResult> VerifyAndGenerateToken(TokenRequestDto tokenRequestDto) {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            try
            {
                //validation 1 - validate JWT token Format
                var tokenInVerification = jwtTokenHandler.ValidateToken(tokenRequestDto.Token, tokenValidationParams, out var validatedToken);
                
                //validation 2 - Validate the encryption Algorithms
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if (result is false)
                    {
                        return null;
                    }
                }

                //validation 3 - validate the expiry date
                var utcExpiryDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expiryDate = UnixTimeStamptoDateTime(utcExpiryDate);

                if (expiryDate > DateTime.UtcNow)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token Has Not Yet Been Expired!!!"
                        }
                    };
                }

                //validation 4 - validate the existence of the token
                var storedToken = await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == tokenRequestDto.RefreshToken);

                if (storedToken is null)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token is not exist!!!"
                        }
                    };
                }


                //Validation 5 - validate if it is used or not
                if (storedToken.IsUsed)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has been used!!!"
                        }
                    };
                }

                //validation 6 - validate if it is revoked
                if (storedToken.IsRevoked)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token has been revoked!!!"
                        }
                    };
                }

                //validation 7 - validate the Id
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                if (storedToken.JwtId != jti)
                {
                    return new AuthResult() {
                        Success = false,
                        Errors = new List<string>() {
                            "Token does NOT match!!!"
                        }
                    };
                }

                //update current token

                storedToken.IsUsed = true;
                context.RefreshTokens.Update(storedToken);
                await context.SaveChangesAsync();


                var dbUser = await userManager.FindByIdAsync(storedToken.UserId);
                return await GenerateJwtToken(dbUser);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DateTime UnixTimeStamptoDateTime(long UnixTimeStamp)
        {
            var datetimeVal = new DateTime(1999, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            datetimeVal = datetimeVal.AddSeconds(UnixTimeStamp).ToLocalTime();
            return datetimeVal;
        }

        public string RandomString(int length) {
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYIZ0123456789";
            
            return new string(Enumerable.Repeat(chars, length)
                                .Select(x => x[random.Next(x.Length)]).ToArray());
        }
    }
}
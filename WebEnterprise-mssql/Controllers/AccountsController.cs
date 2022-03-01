using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise_mssql.Data;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/accounts
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IPasswordHasher<IdentityUser> passwordHasher;
        private readonly ApiDbContext context;
        public AccountsController(UserManager<IdentityUser> userManager, ApiDbContext context, IPasswordHasher<IdentityUser> passwordHasher)
        {
            this.context = context;
            this.userManager = userManager;
            this.passwordHasher = passwordHasher;
        }

        [HttpGet] 
        public IActionResult GetAllUsersAsync() {
            var userList = context.Users.ToList();
            return Ok(userList);
        }

        [HttpGet]
        [Route("asd/{email}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email) {
            
            if (ModelState.IsValid)
            {
                var existingUser = await userManager.FindByEmailAsync(email);

                if(existingUser is null) {
                    return BadRequest( new AccountsControllerResponseDto() {
                        Errors = new List<string>() {
                            $"The user {email} was NOT found!!!"
                        }
                    });
                }
                return Ok(existingUser);
            }
            return BadRequest(new AccountsControllerResponseDto() {
                Errors = new List<string>() {
                    "Ivalid Paylaod"
                }
            });
        }

        [HttpPost]
        public async Task<ActionResult<AccountsControllerResponseDto>> UpdateUserAsync(UserAccountDto user) {
            
            //Check if the user account is exist 
            var existingUser = await userManager.FindByEmailAsync(user.Email);

            if(existingUser is null) {
                return BadRequest(new AccountsControllerResponseDto() {
                   Errors = new List<string>() {
                       $"The user {user.Email} was NOT found!!!"
                   }
                });
            }

            //Update the user account
            // var newUser = user with {
            //     Password = user.Password
            // };

            var result = await userManager.UpdateAsync(existingUser);

            if(!result.Succeeded) {
                return BadRequest(new AccountsControllerResponseDto() {
                    Success = false,
                    Errors = new List<string>() {
                        $"The user {user.Email} was NOT updated!!!"
                    }
                });
            } else {
                return Ok(new AccountsControllerResponseDto() {
                    Success = true,
                    Result = $"The user {user.Email} has been updated"
                });
            }
        }
    }
}
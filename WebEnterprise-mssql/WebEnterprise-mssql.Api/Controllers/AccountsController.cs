using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/accounts
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager; 
        private readonly IMapper mapper;
        private readonly IPasswordHasher<ApplicationUser> passwordHasher;
        private readonly ApiDbContext context;
        public AccountsController(
            UserManager<ApplicationUser> userManager, 
            IMapper mapper,
            ApiDbContext context, 
            IPasswordHasher<ApplicationUser> passwordHasher)
        {
            this.mapper = mapper;
            this.context = context;
            this.userManager = userManager;
            this.passwordHasher = passwordHasher;
        }

        [HttpGet] 
        public async Task<IEnumerable<ApplicationUserDto>> GetAllUsersAsync() {
            var userList = await context.Users.ToListAsync();
            return mapper.Map<List<ApplicationUserDto>>(userList);
        }

        [HttpGet] //Convert list string id to list string username
        [Route("usernameList")]
        public async Task<List<string>> GetListUsername(List<string> userIdList) {
            var newListUsername = new List<string>();
            foreach (var userId in userIdList)
            {
                var user = await userManager.FindByIdAsync(userId);
                newListUsername.Add(user.UserName);
            }
            return newListUsername;
        }

        [HttpGet] //convert string id to string username
        [Route("GetUsername")]
        public async Task<string> GetUsername(string userId) {
            var user = await userManager.FindByIdAsync(userId);
            return user.UserName;
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserByEmailAsync(string email) {
            if(email is null) {
                return BadRequest(new AccountsControllerResponseDto() {
                    Errors = new List<string>() {
                        "The Parameter is null!!!"
                    }
                });
            }
            
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
                return Ok(mapper.Map<ApplicationUserDto>(existingUser));
            }
            return BadRequest(new AccountsControllerResponseDto() {
                Errors = new List<string>() {
                    "Ivalid Payload"
                }
            });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync( UpdateApplicationUserDto user) {
            
            //Check if the user account is exist 
            var existingUser = await userManager.FindByEmailAsync(user.Email);

            if(existingUser is null) {
                return BadRequest(new AccountsControllerResponseDto() {
                   Errors = new List<string>() {
                       $"The user {user.Email} was NOT found!!!"
                   }
                });
            }

            mapper.Map(user, existingUser);

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
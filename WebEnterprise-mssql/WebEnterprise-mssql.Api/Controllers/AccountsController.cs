using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/accounts
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin, qac, qam")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager; 
        private readonly IMapper mapper;
        private readonly IRepositoryWrapper repo;

        public AccountsController(
            UserManager<ApplicationUser> userManager, 
            IMapper mapper,
            IRepositoryWrapper repo)
        {
            this.mapper = mapper;
            this.repo = repo;
            this.userManager = userManager;
        }

        [HttpGet] 
        [Route("GetAllUser")]
        public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync() {
            var userList = await repo.Users.FindAll()
                .Include(x => x.RoleName)
                .Include(x => x.Departments)
                .ToListAsync();
            foreach(var user in userList)
            {
                var userDto = mapper.Map<UserProfileResponseDto>(user);
                var roleList = await userManager.GetRolesAsync(user);
                foreach(var role in roleList)
                {
                    userDto.role.Add(role);
                }
                userDto.Department = user.Departments.DepartmentName;
            }
            return userList;
            //return mapper.Map<List<ApplicationUserDto>>(userList);
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

        [HttpGet]
        [Route("GetUserDetail")]
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
                var result = mapper.Map<ApplicationUserDto>(existingUser);
                result.Roles = (List<string>)await userManager.GetRolesAsync(existingUser);
                return Ok(result);
            }
            return BadRequest(new AccountsControllerResponseDto() {
                Errors = new List<string>() {
                    "Ivalid Payload"
                }
            });
        }

        [HttpPut]
        [Route("updateUser")]
        public async Task<IActionResult> UpdateUserAsync(UpdateApplicationUserDto user) {
            
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

        [HttpDelete]
        [Route("removeUser")]
        public async Task<IActionResult> RemoveUserAsync(string email) {
            var user = await userManager.FindByEmailAsync(email);
            if (user is null)
            {
                return NotFound($"No user found by email {email}");
            }
            await userManager.DeleteAsync(user);
            return Ok($"User {user.UserName} removed!");
        }
    }
}
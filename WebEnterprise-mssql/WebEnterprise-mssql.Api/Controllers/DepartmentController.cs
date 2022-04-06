using System.Linq;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using WebEnterprise_mssql.Api.Dtos;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")] // /api/department
    public class DepartmentController : ControllerBase
    {
        private readonly IRepositoryWrapper repo;
        private readonly UserManager<ApplicationUser> userManager;

        public DepartmentController(IRepositoryWrapper repo, UserManager<ApplicationUser> userManager)
        {
            this.repo = repo;
            this.userManager = userManager;
        }

        //POST Assign to user 
        [HttpPost]
        [Route("AssignUserToDepartment")]
        public async Task<IActionResult> AssignDepartmentToUserAsync(NewDepartmentUserDto newDepartmentUserDto) {
            var user = await userManager.FindByIdAsync(newDepartmentUserDto.UserId.ToString());
            var department = await repo.Departments.FindByCondition(x => x.DepartmentId.Equals(newDepartmentUserDto.DepartmentId)).FirstOrDefaultAsync();
            user.DepartmentId = newDepartmentUserDto.DepartmentId.ToString();
            repo.Users.Update(user);
            repo.Save();

            return new JsonResult($"User {user.UserName} has been assigned to Department {department.DepartmentName}") {StatusCode = 200};
        }

        //GET get all user in specific department
        [HttpGet]
        [Route("GetAllUserFromDepartment")]
        public async Task<IActionResult> GetAllUserFromDepartment(string departmentId) {
            var listUser = await repo.Users.FindByCondition(x => x.DepartmentId.Equals(departmentId)).ToListAsync();
            return Ok(listUser);
        }

        //GET get all
        [HttpGet]
        [Route("GetAllDepartment")]
        public async Task<IActionResult> GetListDepartmentAsync() {
            var list = await repo.Departments.FindAll().ToListAsync();
            return Ok(list);
        }

        //POST create Department
        [HttpPost]
        [Route("createDepartment")]
        public IActionResult CreateDepartmentAsync(string DepartmentName) {
             var newDepartment = new Departments() {
                DepartmentId = Guid.NewGuid(),
                DepartmentName = DepartmentName
            };
            repo.Departments.Create(newDepartment);

            return Ok();
        }
    }
}
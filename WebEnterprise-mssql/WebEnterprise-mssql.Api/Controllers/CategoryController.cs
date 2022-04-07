using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/Category
    public class CategoryController : ControllerBase 
    {
        private readonly IRepositoryWrapper repo;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public CategoryController(
            IRepositoryWrapper repo, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager)
        {
            this.repo = repo;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        //Post Create Cate Tag
        [HttpPost]
        [Route("CreateTag")]
        public async Task<IActionResult> CreateTaskAsync(string CategoryName) {
            var existingCate = await repo.Categories
                .FindByCondition(x => x.CategoryName.ToLower().Equals(CategoryName.ToLower()))
                .FirstOrDefaultAsync();
            if (existingCate is null)
            {
                var newCate = new Categories();
                newCate.CategoryName = CategoryName;
                if (ModelState.IsValid)
                {
                    repo.Categories.Create(newCate);
                    repo.Save();
                }
                return Ok($"Category {CategoryName} has been created");
            }
            return BadRequest($"There has been a Category Tag with the name {CategoryName}");
        }

        //GET get all cate tag
        [HttpGet]
        [Route("AllTag")]
        public async Task<IActionResult> GetAllCateTagAsync() {
            var listCate = await repo.Categories.FindAll().ToListAsync();
            return Ok(listCate);
        }

        //Post Add Cate Tag to Post
        [HttpPost]
        [Route("AddTagToPost")]
        public async Task<IActionResult> AddCateTagToPostAsync(PostCateGoryDto postCategoryDto) {
            var cate = await repo.Categories.FindByCondition(x => x.CategoryId.Equals(postCategoryDto.CategoryId)).FirstOrDefaultAsync();
            var post = await repo.Posts.FindByCondition(x => x.PostId.Equals(postCategoryDto.PostId)).FirstOrDefaultAsync();
            
            var newCatePost = new CatePost();
            newCatePost.CateId = cate.CategoryId.ToString();
            newCatePost.PostId = post.PostId.ToString();
            if (ModelState.IsValid)
            {
                repo.CatePost.Create(newCatePost);
                repo.Save();
                return Ok($"Category Tag {cate.CategoryName} added to post successfully!");
            }
            return BadRequest("Error in add Tag to Post");
        }

        //DELETE delete Cata tag
        [HttpDelete]
        [Route("DeleteCate")]
        public async Task<IActionResult> DeleteCateTagAsync(string cateId) {
            var cate = await repo.Categories.FindByCondition(x => x.CategoryId.Equals(Guid.Parse(cateId))).FirstOrDefaultAsync();
            var listCatePost = await repo.CatePost.FindByCondition(x => x.CateId.Equals(cateId)).ToListAsync();
            if (listCatePost.Count().Equals(0))
            {
                repo.Categories.Delete(cate);
                repo.Save();
            }
            else
            {
                return BadRequest(
                    $"All Posts tagged with this Category Tag {cate.CategoryName} must be removed before atempting to delete this Category Tag {cate.CategoryName}");
            }
            return Ok($"Category {cate.CategoryName} has been deleted");
        }
    }
}
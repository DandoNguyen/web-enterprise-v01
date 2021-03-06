using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Collections.Generic;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/Category
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "staff")]
    public class CategoryController : ControllerBase 
    {
        private readonly IRepositoryWrapper repo;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IMapper mapper;

        public CategoryController(
            IRepositoryWrapper repo, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager,
            IMapper mapper)
        {
            this.repo = repo;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.mapper = mapper;
        }

        //Post Create Cate Tag
        [HttpPost]
        [Route("CreateTag")]
        public async Task<IActionResult> CreateTagAsync(CreateCategoryDto dto) {
            var existingCate = await repo.Categories
                .FindByCondition(x => x.CategoryName.ToLower().Equals(dto.CategoryName.ToLower()))
                .FirstOrDefaultAsync();
            if (existingCate is null)
            {
                var newCate = mapper.Map<Categories>(dto);
                if (ModelState.IsValid)
                {
                    repo.Categories.Create(newCate);
                    await repo.Save();
                }
                return Ok($"Category {dto.CategoryName} has been created");
            }
            return BadRequest($"There has been a Category Tag with the name {dto.CategoryName}");
        }

        //GET get all cate tag
        [HttpGet]
        [Route("AllTag")]
        public async Task<IActionResult> GetAllCateTagAsync() {
            var listCate = await repo.Categories.FindAll().Include(x => x.posts).ToListAsync();
            List<CateDto> listResult = new();
            foreach (var cate in listCate)
            {
                var newCateDto = mapper.Map<CateDto>(cate);
                newCateDto.postCount = cate.posts.Count;
                listResult.Add(newCateDto);
            }
            return Ok(listResult);
        }

        [HttpGet]
        [Route("GetListPostsOfThisCate")]
        public async Task<IActionResult> GetAllPostInCateAsync(string cateId)
        {
            var targetCate = await repo.Categories
                .FindByCondition(x => x.CategoryId.Equals(Guid.Parse(cateId)))
                .Include(x => x.posts)
                .FirstOrDefaultAsync();
            var listPosts = targetCate.posts;
            
            List<PostDto> listResult = new();
            foreach(var post in listPosts)
            {
                var postDto = mapper.Map<PostDto>(post);
                postDto.CategoryName.Add(targetCate.CategoryName);
                listResult.Add(postDto);
            }
            return Ok(listResult);
        }

        //Post Add Cate Tag to Post
        [HttpPost]
        [Route("AddTagToPost")]
        public async Task<IActionResult> AddCateTagToPostAsync(PostCateGoryDto postCategoryDto) {
                 
            var cate = await repo.Categories
                .FindByCondition(x => x.CategoryId
                    .ToString()
                    .Equals(postCategoryDto.CategoryId))
                .FirstOrDefaultAsync();

            var post = await repo.Posts
                .FindByCondition(x => x.PostId
                    .ToString()
                    .Equals(postCategoryDto.PostId))
                .FirstOrDefaultAsync();
            
            try
            {
                cate.posts.Add(post);
                CheckEntityEntry(cate);
                repo.Categories.Update(cate);
                await repo.Save();
            }
            catch (Exception ex)
            {
                
                return BadRequest($"Function return an error:\n{ex}");
            }
            return Ok($"Seem Fine\nPost ID: {post.PostId}\nCategory ID: {cate.CategoryId}");
            // var newCatePost = new CatePost();
            // newCatePost.CateId = cate.CategoryId.ToString();
            // newCatePost.PostId = post.PostId.ToString();
            // if (ModelState.IsValid)
            // {
            //     repo.CatePost.Create(newCatePost);
            //     await repo.Save();
            //     return Ok($"Category Tag {cate.CategoryName} added to post successfully!");
            // }
            // return BadRequest("Error in add Tag to Post");
        }

        //DELETE delete Cate tag
        [HttpDelete]
        [Route("DeleteCate")]
        public async Task<IActionResult> DeleteCateTagAsync(string cateId) {
            var cate = await repo.Categories
                .FindByCondition(x => x.CategoryId.Equals(Guid.Parse(cateId)))
                .Include(x => x.posts)
                .FirstOrDefaultAsync();

            if (!cate.posts.Count.Equals(0))
            {
                return BadRequest($"{cate.CategoryName} is in used!");
            }

            try 
            {
                repo.Categories.Delete(cate);
                await repo.Save();
                return Ok($"Category {cate.CategoryName} has been deleted");
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

        private void CheckEntityEntry(Categories cate)
        {
            foreach (var post in cate.posts)
            {
                var postEntry = repo.Posts.GetEntityEntry(post);
                if (postEntry.State == EntityState.Detached)
                {
                    //context.[Model].Attach(cate);
                    repo.Posts.AttachEntity(post);
                }
            }
        }
    }
}
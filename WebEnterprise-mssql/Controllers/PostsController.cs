using System.Collections;
using System.Reflection.Metadata.Ecma335;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Data;
using WebEnterprise_mssql.Models;
using WebEnterprise_mssql.Extensions;
using System.Collections.Generic;
using WebEnterprise_mssql.Dtos;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "staff")]
    public class PostsController : ControllerBase
    {
        private readonly ApiDbContext context;
        public PostsController(ApiDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<PostDto>> GetAllPostsAsync() {
            // var allposts = await context.Posts.ToListAsync();
            // return Ok(allposts);
            return (await context.Posts.ToListAsync()).Select(post => post.AsDto());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetPostAsync(int id) {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if(post is null) {
                return NotFound();
            }

            return Ok(post.AsDto());
        }

        [HttpPost]
        public async Task<ActionResult<PostDto>> CreatePostAsync(CreatePostDto postDto) {
            if(ModelState.IsValid) {
                Posts newPost = new() {
                    title = postDto.title,
                    content = postDto.content,
                    createdDate = DateTimeOffset.UtcNow
                };
                await context.Posts.AddAsync(newPost);
                await context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPostAsync), new {newPost.id}, newPost.AsDto());
            }
            return new JsonResult("Error in creating Post") {StatusCode = 500};
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PostDto>> UpdatePostsAsync(int id, Posts updatedPostDto) 
        {    
            var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if(existingPost is null) {
                return NotFound();
            }

            existingPost.title = updatedPostDto.title;
            existingPost.content = updatedPostDto.content;
            existingPost.createdDate = DateTimeOffset.UtcNow;

            //Better way to updating object is to use Automapper
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PostDto>> DeletePostAsync(int id) {
            var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if (existingPost is null)
            {
                return NotFound();
            }
            context.Posts.Remove(existingPost);
            await context.SaveChangesAsync();

            return Ok(existingPost);
        }
    }
}
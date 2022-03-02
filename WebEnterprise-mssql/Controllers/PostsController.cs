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
using AutoMapper;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "staff")]
    public class PostsController : ControllerBase
    {
        private readonly ApiDbContext context;
        private readonly IMapper mapper;
        public PostsController(ApiDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPostsAsync() {
            // var allposts = await context.Posts.ToListAsync();
            // return Ok(allposts);
            // return (await context.Posts.ToListAsync()).Select(post => post.AsDto());
            var posts = await context.Posts.ToListAsync();
            var postsDto = mapper.Map<List<PostDto>>(posts);

            return Ok(postsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostAsync(int id) {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if(post is null) {
                return NotFound();
            }

            return Ok(mapper.Map<PostDto>(post));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync(CreatePostDto postDto) {
            if(ModelState.IsValid) {
                Posts newPost = mapper.Map<Posts>(postDto);
                await context.Posts.AddAsync(newPost);
                await context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPostAsync), new {newPost.id}, mapper.Map<PostDto>(newPost));
            }
            return new JsonResult("Error in creating Post") {StatusCode = 500};
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePostsAsync(int id, UpdatedPostDto updatedPostDto) 
        {    
            var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if(existingPost is null) {
                return NotFound();
            }

            mapper.Map(updatedPostDto, existingPost);
            existingPost.LastModifiedDate = DateTimeOffset.UtcNow;

            context.Posts.Update(existingPost);

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

            return NoContent();
        }
    }
}
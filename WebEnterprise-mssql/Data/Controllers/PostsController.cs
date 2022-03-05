using System.Collections.ObjectModel;
using System.Runtime.InteropServices;
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
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "staff")]
    public class PostsController : ControllerBase
    {
        private readonly ApiDbContext context;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public PostsController(ApiDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.context = context;
        }

        //this method is for test purpose, shoule be DELETE later
        [HttpGet]
        [Route("LogTokenInfo")]
        public IActionResult LogUserInfoFromToken([FromHeader] string Authorization) {
            //var email = HttpContext.User.Claims;
            //Request.Headers.TryGetValue("Authorization", out var getToken);
            if (Authorization is null)
            {
                return BadRequest(new PostResponseDto() {
                    Success = false,
                    Errors = new List<string>() {
                        "The Token param is NOT availablel!!!"
                    }
                });
            }
            //var handler = new JwtSecurityTokenHandler();
            //var token = handler.ReadJwtToken(getToken);

            // if (token is null)
            // {
            //     return BadRequest(new PostResponseDto() {
            //         Errors = new List<string>() {
            //             "The Token has NOT been read!!!"
            //         }
            //     });
            // }
            string[] Collection = Authorization.Split(" ");
            
            //Console.WriteLine(Collection[1]);

            //Decode the token
            var stream = Collection[1];  
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;

            //get the user's email
            var email = tokenS.Claims.First(claim => claim.Type == "email").Value;


            return Ok(email);
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
        public async Task<IActionResult> CreatePostAsync(CreatePostDto postDto, [FromHeader] string Authorization) {
            //Get current user
            //Validate authorization state
            if (Authorization is null)
            {
                return BadRequest(new PostResponseDto() {
                    Success = false,
                    Errors = new List<string>() {
                        "The Authorization param is NOT availablel!!!"
                    }
                });
            }

            string[] Collection = Authorization.Split(" ");

            //Decode the token
            var stream = Collection[1];  
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;

            //get the user's email
            var email = tokenS.Claims.First(claim => claim.Type == "email").Value;
            
            //Validating Post
            if(ModelState.IsValid) {
                Posts newPost = mapper.Map<Posts>(postDto);
                newPost.createdDate = DateTimeOffset.UtcNow;
                //Get user ID
                var userId = await userManager.FindByEmailAsync(email);
                newPost.UserId = userId;
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
        public async Task<IActionResult> DeletePostAsync(int id) {
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
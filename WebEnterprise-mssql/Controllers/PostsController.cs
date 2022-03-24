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
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "staff")]
    public class PostsController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly ApiDbContext context;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public PostsController(ApiDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.mapper = mapper;
            this.context = context;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllPostsAsync() {
            var posts = await context.Posts.ToListAsync();
            var postsDto = mapper.Map<List<PostDto>>(posts);

            return Ok(postsDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPostsFromUserIDAsync(string userId) {
            // var allposts = await context.Posts.ToListAsync();
            // return Ok(allposts);
            // return (await context.Posts.ToListAsync()).Select(post => post.AsDto());
            var posts = await context.Posts.Where(x => x.UserId == userId).ToListAsync();
            var postsDto = mapper.Map<List<PostDto>>(posts);

            return Ok(postsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostAsync(Guid id) {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if(post is null) {
                return NotFound();
            }
            var getPost = mapper.Map<PostDto>(post);

            //List<FilesPath> filesPathObj = await context.FilesPath.FindAsync(id); //Get id from post => return all object from filesPath
            // if (filesPathObj is null)
            // {
            //     return Ok(new 
            //     {
            //         getPost,
            //         filePath = "There is no file attached"
            //     });
            // }
            return Ok(new 
            {
                getPost,
                //filePath = filesPathObj.filePath
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync([FromForm] CreatePostDto postDto, [FromHeader] string Authorization,[FromForm] List<IFormFile> files) {
            
            if (Authorization is null)
            {
                return BadRequest(new {
                    error = "the Authorization params is NOT exist!!!"
                });
            }
            var user = await DecodeToken(Authorization);

            //Get the file path config
            string rootPath = configuration["FileConfig:filePath"];
            // string rootPath = Path.Combine("~", "App_Data");

            if (ModelState.IsValid)
            {
                Posts newPost = new Posts();
                newPost = mapper.Map<Posts>(postDto);
                newPost.id = Guid.NewGuid();
                newPost.createdDate = DateTimeOffset.UtcNow;
                newPost.UserId = user.Id;
                var newPostDto = mapper.Map<PostDto>(newPost);

                var listOfPaths = new List<string>();
                //Check if there is files or not
                if (!files.Count().Equals(0))
                {

                    //UploadFile(files, user.UserName, newPost.id, listOfPaths, newPostDto);
                    foreach (var formFile in files)
                    {
                        if (!IsValidFileType(formFile))
                        {
                            newPostDto.Message.Add($"the file {formFile.FileName} is not accepted!!!");
                            break;
                        }

                        var newFilePathObj = new FilesPath();
                        if (formFile.Length > 0)
                        {
                            var newRootPath = Path.Combine(rootPath, user.UserName);
                            if (!Directory.Exists(newRootPath)) 
                            {
                                Directory.CreateDirectory(newRootPath); 
                            } 

                            var finalFilePath = Path.Combine(newRootPath, MakeValidFileName(formFile.FileName));
                            newFilePathObj.PostId = newPost.id;
                            newFilePathObj.filePath = finalFilePath;
                            context.FilesPath.Add(newFilePathObj);
                            await context.SaveChangesAsync();

                            listOfPaths.Add(finalFilePath);
                            newPostDto.Message.Add($"the file {formFile.FileName} uploaded successfully!!!");

                            using (var fileStream = new FileStream(finalFilePath, FileMode.OpenOrCreate))
                            {
                                await formFile.CopyToAsync(fileStream);
                            }
                        }
                    }
                }

                await context.Posts.AddAsync(newPost);
                await context.SaveChangesAsync();
                newPostDto.FilesPaths = listOfPaths;
                return CreatedAtAction(nameof(GetPostAsync), new {newPost.id}, newPostDto);
            }
            return new JsonResult("Error in creating Post") {StatusCode = 500};
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePostsAsync(Guid id, UpdatedPostDto updatedPostDto) 
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
        public async Task<IActionResult> DeletePostAsync(Guid id) {
            var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.id == id);
            if (existingPost is null)
            {
                return NotFound();
            }
            context.Posts.Remove(existingPost);
            await context.SaveChangesAsync();

            return NoContent();
        }

        //internal Methods

        private static bool IsValidFileType(IFormFile file) {
            string fileExtension = Path.GetExtension(file.FileName).ToLower();
            switch (fileExtension)
            {
                case ".doc": case ".docx": return true;
                case ".xls": case ".xlsx": return true;
                case ".jpg": case ".png": return true;
                default: return false;
            }
        }
        private static string MakeValidFileName( string name )
        {

            string invalidChars = System.Text.RegularExpressions.Regex.Escape( new string( System.IO.Path.GetInvalidFileNameChars() ) );
            string invalidRegStr = string.Format( @"([{0}]*\.+$)|([{0}]+) ", invalidChars );
            var newString = System.Text.RegularExpressions.Regex.Replace( name, invalidRegStr, "_" ).ToString();
            return newString;
        }
        // private async Task<FilesPath> UploadFile(IFormFile file, string username, Guid postId) 
        // {
        //     string Message;
        //     Guid outPostId;
        //     var newFilePathObj = new FilesPath();
        //     //Get the file path config
        //     string rootPath = configuration["FileConfig:filePath"];

        //     if (!IsValidFileType(file))
        //     {
        //         Message = $"the file {file.FileName} is not accepted!!!";
        //     }

            
        //     if (file.Length > 0)
        //     {
        //         var newRootPath = Path.Combine(rootPath, username);
        //         if (!Directory.Exists(newRootPath)) 
        //         {
        //             Directory.CreateDirectory(newRootPath); 
        //         } 

        //         var finalFilePath = Path.Combine(newRootPath, MakeValidFileName(file.FileName));
        //         newFilePathObj.PostId = postId;
        //         newFilePathObj.filePath = finalFilePath;
        //         context.FilesPath.Add(newFilePathObj);
        //         await context.SaveChangesAsync();

        //         listOfPaths.Add(finalFilePath);
        //         newPostDto.Message.Add($"the file {file.FileName} uploaded successfully!!!");

        //         using (var fileStream = new FileStream(finalFilePath, FileMode.OpenOrCreate))
        //         {
        //             await file.CopyToAsync(fileStream);
        //         }
        //     }

        //     return Message;  
        // }

        private async Task<ApplicationUser> DecodeToken(string Authorization) {

            string[] Collection = Authorization.Split(" ");

            //Decode the token
            var stream = Collection[1];  
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;

            //get the user
            var email = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);

            //return the username
            return user;
        }
    }
}
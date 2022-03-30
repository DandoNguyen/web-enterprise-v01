using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Models;
using System.Collections.Generic;
using WebEnterprise_mssql.Api.Dtos;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.IO;
using WebEnterprise_mssql.Api.Configuration;
using WebEnterprise_mssql.Api.Repository;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme/*, Roles = "staff"*/)]
    public class PostsController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IPostsRepository repo;
        private readonly ApiDbContext context;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public PostsController(
            ApiDbContext context, 
            IMapper mapper, 
            UserManager<ApplicationUser> userManager, 
            IConfiguration configuration, 
            IPostsRepository repo)
        {
            this.configuration = configuration;
            this.repo = repo;
            this.userManager = userManager;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        [Route("PostFeed")]
        public async Task<IActionResult> GetAllPostsAsync()
        {
            var posts = await repo.GetAllPostsAsync();
            var postsDto = mapper.Map<List<PostDto>>(posts);
            return Ok(postsDto);
        }

        [HttpGet]
        [Route("AllPost")]
        public async Task<IActionResult> GetAllPostsFromUserIDAsync(getPostReqDto getPostReqDto)
        {
            var posts = await repo.GetAllPostsFromUserIDAsync(getPostReqDto.userId);
            var postsDto = mapper.Map<List<PostDto>>(posts);

            return Ok(postsDto);
        }

        [HttpGet]
        [Route("PostReq")]
        public async Task<IActionResult> GetPostByIDAsync(
            /*[FromHeader] Guid id, [FromHeader] string Authorization,[FromHeader] string username*/
            getPostReqDto getPostReqDto, [FromHeader] string Authorization)
        {
            var user = await DecodeToken(Authorization);
            //Check if username is correct
            if (!getPostReqDto.username.Equals(user.UserName))
            {
                return BadRequest(new AccountsResult()
                {
                    Errors = new List<string>() {
                        "username is NOT match with token!!!"
                    },
                    Success = false
                });
            }


            var post = await repo.GetPostByIDAsync(getPostReqDto.postId);
            if (post is null)
            {
                return NotFound();
            }
            var getPost = mapper.Map<PostDto>(post);
            getPost.ViewsCount = await CheckViewCount(user.UserName, post.PostId);
            getPost.FilesPaths = await GetFilePaths(post.PostId);


            return Ok(getPost);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync([FromHeader] CreatePostDto postDto, [FromHeader] string Authorization, [FromForm] List<IFormFile> files)
        {

            if (Authorization is null)
            {
                return BadRequest(new
                {
                    error = "the Authorization params is NOT exist!!!"
                });
            }
            var user = await DecodeToken(Authorization);

            if (ModelState.IsValid)
            {
                var newPost = mapper.Map<Posts>(postDto);

                newPost.PostId = Guid.NewGuid();
                newPost.createdDate = DateTimeOffset.UtcNow;
                newPost.UserId = user.Id;
                newPost.username = user.UserName;

                await context.Posts.AddAsync(newPost);
                await context.SaveChangesAsync();

                var newPostDto = mapper.Map<PostDto>(newPost);
                newPostDto.FilesPaths = await UploadFiles(files, user.UserName, newPost.PostId);

                return CreatedAtAction(nameof(GetPostByIDAsync), new { newPost.PostId }, newPostDto);
            }
            return new JsonResult("Error in creating Post") { StatusCode = 500 };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePostsAsync(UpdatedPostDto updatedPostDto)
        {
            var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.PostId == updatedPostDto.postId);
            if (existingPost is null)
            {
                return NotFound();
            }

            //update new value to var existingPost
            mapper.Map(updatedPostDto, existingPost);
            existingPost.LastModifiedDate = DateTimeOffset.UtcNow;

            context.Posts.Update(existingPost);
            await context.SaveChangesAsync();

            var newPostDto = mapper.Map<PostDto>(existingPost);
            newPostDto.FilesPaths = await UploadFiles(updatedPostDto.files, existingPost.username, existingPost.PostId);

            return CreatedAtAction(nameof(GetPostByIDAsync), newPostDto);
        }

        [HttpDelete]
        [Route("Deletepost")]
        public async Task<IActionResult> DeletePostAsync([FromHeader] Guid id)
        {
            var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.PostId == id);
            if (existingPost is null)
            {
                return NotFound();
            }
            context.Posts.Remove(existingPost);
            await context.SaveChangesAsync();

            //Delete Files in directory
            DeleteFiles(existingPost.PostId, existingPost.username);

            return new JsonResult($"Post {id} had been deleted successfully!") { StatusCode = 200 };
        }

        //=================================================================================================================================
        //=================================================================================================================================
        //INTERAL STATIC METHODS
        //=================================================================================================================================
        //=================================================================================================================================

        private async void DeleteFiles(Guid postId, string username)
        {
            string rootPath = configuration["FileConfig:filePath"];
            var userRootPath = Path.Combine(rootPath, username, postId.ToString());
            if (Directory.Exists(userRootPath))
            {
                while (!Directory.GetFiles(userRootPath).Count().Equals(0))
                {
                    var files = Directory.GetFiles(userRootPath);
                    foreach (var fileItem in files)
                    {
                        System.IO.File.Delete(fileItem);
                        var filePathsArray = await context.FilesPath
                            .Where(x => x.PostId.Equals(postId.ToString()))
                            .ToArrayAsync();
                        context.FilesPath.RemoveRange(filePathsArray);
                        await context.SaveChangesAsync();
                        Console.WriteLine($"file {fileItem} deleted!");
                    }
                }

                var postRootPath = Path.Combine(rootPath, username);
                if (!Directory.Exists(postRootPath))
                {
                    Console.WriteLine("can't get postRootPath");
                }
                else
                {
                    foreach (var path in Directory.GetDirectories(postRootPath))
                    {
                        if (path.Equals(userRootPath))
                        {
                            try
                            {
                                Console.WriteLine($"path : {path}");
                                Directory.Delete(path);
                            }
                            catch (System.Exception ex)
                            {
                                Console.WriteLine(ex);
                            }
                        }
                    }
                }
                
            }
            else
            {
                Console.WriteLine("path doesn't exist!!!");
            }
        }
        private async Task<List<string>> UploadFiles( //upload files to table FilePaths and return list of string of file paths
            List<IFormFile> files,
            string username,
            Guid postId
        )
        {

            string rootPath = configuration["FileConfig:filePath"];

            var listOfPaths = new List<string>();
            //Check if there is files or not
            if (!files.Count().Equals(0))
            {
                foreach (var formFile in files)
                {
                    if (!IsValidFileType(formFile))
                    {
                        listOfPaths.Add($"the file {formFile.FileName} is not accepted!!!");
                    }

                    var newFilePathObj = new FilesPath();
                    if (formFile.Length > 0)
                    {
                        var newRootPath = Path.Combine(rootPath, username, postId.ToString());
                        if (!Directory.Exists(newRootPath))
                        {
                            Directory.CreateDirectory(newRootPath);
                        }

                        //Config final File Paths that has username and post ID as parents folders directory
                        var finalFilePath = Path.Combine(newRootPath, MakeValidFileName(formFile.FileName));

                        newFilePathObj.PostId = postId;
                        newFilePathObj.filePath = finalFilePath;
                        context.FilesPath.Add(newFilePathObj);
                        await context.SaveChangesAsync();

                        listOfPaths.Add(finalFilePath);

                        using (var fileStream = new FileStream(finalFilePath, FileMode.OpenOrCreate))
                        {
                            await formFile.CopyToAsync(fileStream);
                        }
                    }
                }
            }
            return listOfPaths;
        }

        private async Task<List<string>> GetFilePaths(Guid postId)
        {

            var listFilePaths = await context.FilesPath.Where(x => x.PostId == postId).Select(x => x.filePath).ToListAsync();


            if (!listFilePaths.Count().Equals(0))
            {
                return listFilePaths;
            }
            else
            {
                return new List<string>() {
                    "No File Attached!!!"
                };
            }
        }

        private async Task<int> CheckViewCount(string username, Guid postId)
        {
            // //check if the params are null
            // if (username is null)
            // {
            //     return "username cannot be null!!!";
            // }

            //check if user existed in view count of post
            var listViewCount = await context.Views.Where(x => x.postId == postId).Select(x => x.userId).ToListAsync();

            //get userID
            var user = await userManager.FindByNameAsync(username);
            var userID = user.Id.ToString();

            var postAuthor = context.Posts.Where(x => x.PostId == postId).Select(x => x.username);
            if (username.Equals(postAuthor))
            {
                return listViewCount.Count();
            }



            if (ModelState.IsValid)
            {
                if (listViewCount.Count().Equals(0))
                {
                    var newView = new Views()
                    {
                        ViewId = Guid.NewGuid(),
                        LastVistedDate = DateTimeOffset.UtcNow,
                        userId = userID,
                        postId = postId
                    };
                    await context.Views.AddAsync(newView);
                    await context.SaveChangesAsync();
                }
                else
                {

                    if (listViewCount.Contains(userID))
                    {
                        return listViewCount.Count();
                    }
                    else
                    {
                        var newView = new Views()
                        {
                            ViewId = Guid.NewGuid(),
                            LastVistedDate = DateTimeOffset.UtcNow,
                            userId = userID,
                            postId = postId
                        };
                        await context.Views.AddAsync(newView);
                        await context.SaveChangesAsync();
                    }
                }
            }


            await context.SaveChangesAsync();
            return listViewCount.Count();
        }

        private static bool IsValidFileType(IFormFile file)
        {
            string fileExtension = Path.GetExtension(file.FileName).ToLower();
            switch (fileExtension)
            {
                case ".doc": case ".docx": return true;
                case ".xls": case ".xlsx": return true;
                case ".jpg": case ".png": return true;
                default: return false;
            }
        }
        private static string MakeValidFileName(string name)
        {

            string invalidChars = System.Text.RegularExpressions.Regex.Escape(new string(System.IO.Path.GetInvalidFileNameChars()));
            string invalidRegStr = string.Format(@"([{0}]*\.+$)|([{0}]+) ", invalidChars);
            var newString = System.Text.RegularExpressions.Regex.Replace(name, invalidRegStr, "_").ToString();
            return newString;
        }

        private async Task<ApplicationUser> DecodeToken(string Authorization)
        {

            string[] Collection = Authorization.Split(" ");

            //Decode the token
            var stream = Collection[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;

            //get the user
            var email = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);

            //return the user
            return user;
        }
    }
}
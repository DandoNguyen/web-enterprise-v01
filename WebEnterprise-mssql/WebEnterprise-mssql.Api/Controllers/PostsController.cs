using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
using WebEnterprise_mssql.Api.Repository;
using Microsoft.EntityFrameworkCore;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme/*, Roles = "staff"*/)]
    public class PostsController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IRepositoryWrapper repo;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public PostsController( 
            IMapper mapper, 
            UserManager<ApplicationUser> userManager, 
            IConfiguration configuration, 
            IRepositoryWrapper repo)
        {
            this.configuration = configuration;
            this.repo = repo;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        //QAC Sections
        [HttpGet]
        [Route("QACListPost")]
        [Authorize(Roles = "QAC")]
        public async Task<IActionResult> GetAllUnAssignedPosts() {
            var listPosts = await repo.Posts.FindAll().ToListAsync();
            var listPostsDto = new List<PostDto>();
            foreach (var post in listPosts)
            {
                if (post.IsApproved.Equals(false) && post.IsAssigned.Equals(false))
                {
                    var newPostDto = mapper.Map<PostDto>(post);
                    listPostsDto.Add(newPostDto);
                }
            }
            return Ok(listPostsDto);
        }

        [HttpPost]
        [Route("AssignToQAC")]
        [Authorize(Roles = "QAC")]
        public async Task<IActionResult> AssignedPostToQAC(PostQACDto postQACDto) {
            var post = await repo.Posts.FindByCondition(x => x.PostId.Equals(postQACDto.postId)).FirstOrDefaultAsync();
            var QAC = await userManager.FindByIdAsync(postQACDto.QACId.ToString());
            post.QACUserId = QAC.Id;
            post.IsAssigned = true;
            repo.Save();
            var postDto = mapper.Map<PostDto>(post);
            return RedirectToAction(nameof(GetPostByIDAsync), postDto);
        }

        [HttpPost]
        [Route("QACfeedback")]
        [Authorize(Roles = "QAC")]
        public async Task<IActionResult> GetFeedbackFromQAC(QACFeedbackDto QACFeedbackDto) {
            var post = await repo.Posts.FindByCondition(x => x.PostId.Equals(QACFeedbackDto.postId)).FirstOrDefaultAsync();
            mapper.Map(QACFeedbackDto, post);
            repo.Posts.Update(post);
            repo.Save();
            return new JsonResult("Feedback Received!!!") {StatusCode = 200};
        }

        //Staff Section
        [HttpGet]
        [Route("PostFeed")]
        public async Task<IActionResult> GetAllPostsAsync()
        {
            var listPosts = await repo.Posts.GetAllPostsAsync();
            var allApprovedPosts = new List<PostDetailDto>();
            foreach (var post in listPosts)
            {
                if (post.IsApproved.Equals(true))
                {
                    var result = await GetCategoriesNameAsync(post);
                    allApprovedPosts.Add(result);
                }
            }
            //var postsDto = mapper.Map<List<PostDto>>(listPosts);
            return Ok(allApprovedPosts);
        }

        [HttpGet]
        [Route("MyPost")]
        public async Task<IActionResult> GetAllPostsFromUserIDAsync(getPostReqDto getPostReqDto)
        {
            var listPosts = await repo.Posts
                .GetAllPostsFromUserIDAsync(getPostReqDto.userId);
            
            var listPostsDto = new List<PostDetailDto>();
            foreach (var post in listPosts)
            {
                var result = await GetCategoriesNameAsync(post);
                listPostsDto.Add(result);
            }

            return Ok(listPostsDto);
        }

        [HttpGet]
        [Route("PostDetail")]
        public async Task<IActionResult> GetPostByIDAsync(getPostReqDto getPostReqDto, [FromHeader] string Authorization)
        {
            var user = await DecodeToken(Authorization);
            // //Check if username is correct
            // if (!getPostReqDto.username.Equals(user.UserName))
            // {
            //     return BadRequest(new AccountsResult()
            //     {
            //         Errors = new List<string>() {
            //             "username is NOT match with token!!!"
            //         },
            //         Success = false
            //     });
            // }


            var post = await repo.Posts.GetPostByIDAsync(getPostReqDto.postId);
            if (post is null)
            {
                return NotFound();
            }
            var result = await GetCategoriesNameAsync(post);
            
            result.ViewsCount = await CheckViewCount(user.UserName, post.PostId);
            result.FilesPaths = await GetFilePaths(post.PostId);


            return Ok(result);
        }

        

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync([FromBody] CreatePostDto dto, [FromHeader] string Authorization, [FromForm] List<IFormFile> files)
        {
            var topic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(Guid.Parse(dto.TopicId)))
                .FirstOrDefaultAsync();
            if (topic.ClosureDate <= DateTimeOffset.UtcNow)
            {
                return BadRequest($"no more Post can be created for Topic {topic.TopicName} after Date {topic.ClosureDate.UtcDateTime}");
            }

            if (Authorization is null)
            {
                return BadRequest(new
                {
                    error = "the Authorization params is NOT exist!!!"
                });
            }
            var user = await DecodeToken(Authorization);
            var requestCateName = dto.CategoryName;
            if (ModelState.IsValid)
            {
                var newPost = mapper.Map<Posts>(dto);
                newPost.PostId = Guid.NewGuid();
                foreach (var cateItem in requestCateName)
                {
                    var cate = await repo.Categories
                        .FindByCondition(x => x.CategoryName.ToLower().Equals(cateItem.ToLower()))
                        .FirstOrDefaultAsync();
                    var catePost = new CatePost();
                    catePost.CateId = cate.CategoryId.ToString();
                    catePost.PostId = newPost.PostId.ToString();
                    if (ModelState.IsValid)
                    {
                        repo.CatePost.Create(catePost);
                        repo.Save();
                    }
                }

                
                newPost.createdDate = DateTimeOffset.UtcNow;
                newPost.UserId = user.Id;
                newPost.username = user.UserName;

                if (ModelState.IsValid)
                {
                    repo.Posts.CreatePostAsync(newPost);
                    repo.Save();
                }
                var newPostDto = await GetCategoriesNameAsync(newPost);
                newPostDto.FilesPaths = await UploadFiles(files, user.UserName, newPost.PostId);

                return CreatedAtAction(nameof(GetPostByIDAsync), new { newPost.PostId }, newPostDto);
                // return Ok($"Post {newPost.PostId} created!");
            }
            return new JsonResult("Error in creating Post") { StatusCode = 500 };
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePostsAsync(UpdatedPostDto dto)
        {
            var topic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(dto.TopicId))
                .FirstOrDefaultAsync();
            if (topic.ClosureDate <= DateTimeOffset.UtcNow)
            {
                return Forbid($"Post cannot be updated for Topic {topic.TopicName} after Date: {topic.ClosureDate.UtcDateTime}");
            }

            // var existingPost = await context.Posts.FirstOrDefaultAsync(x => x.PostId == updatedPostDto.postId);
            var existingPost = await repo.Posts.GetPostAsync(dto.postId.ToString());
            if (existingPost is null)
            {
                return NotFound();
            }

            //update new value to var existingPost
            mapper.Map(dto, existingPost);
            existingPost.LastModifiedDate = DateTimeOffset.UtcNow;

            // context.Posts.Update(existingPost);
            // await context.SaveChangesAsync();
            repo.Posts.Update(existingPost);
            repo.Save();

            var newPostDto = mapper.Map<PostDto>(existingPost);
            newPostDto.FilesPaths = await UploadFiles(dto.files, existingPost.username, existingPost.PostId);

            return CreatedAtAction(nameof(GetPostByIDAsync), newPostDto);
        }

        [HttpDelete]
        [Route("Deletepost")]
        public async Task<IActionResult> DeletePostAsync(RemovePostDto dto)
        {
            var topic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(dto.TopicId))
                .FirstOrDefaultAsync();
            if (topic.ClosureDate <= DateTimeOffset.UtcNow)
            {
                return Forbid($"Post cannot be removed for Topic {topic.TopicName} after Date: {topic.ClosureDate.UtcDateTime}");
            }
            
            var existingPost = await repo.Posts
                .FindByCondition(x => x.PostId.Equals(dto.PostId))
                .FirstOrDefaultAsync();
            if (existingPost is null)
            {
                return NotFound();
            }
            repo.Posts.Delete(existingPost);
            repo.Save();

            //Delete Files in directory
            DeleteFiles(existingPost.PostId, existingPost.username);

            return new JsonResult($"Post {dto.PostId} had been deleted successfully!") { StatusCode = 200 };
        }

        //=================================================================================================================================
        //=================================================================================================================================
        //INTERAL STATIC METHODS
        //=================================================================================================================================
        //=================================================================================================================================

        private async Task<PostDetailDto> GetCategoriesNameAsync(Posts post) {
            var listCatePost = await repo.CatePost.FindByCondition(x => x.PostId.Equals(post.PostId.ToString())).ToListAsync();
            var resultDto = mapper.Map<PostDetailDto>(post);
            var listNameCate = new List<string>();
            foreach (var catePostItem in listCatePost)
            {
                var cateName = await repo.Categories
                    .FindByCondition(x => x.CategoryId.Equals(Guid.Parse(catePostItem.CateId)))
                    .Select(x => x.CategoryName)
                    .FirstOrDefaultAsync();
                listNameCate.Add(cateName);
            }
            resultDto.CategoryName = listNameCate;
            return resultDto;
        }

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

                        var filePathsArray = await repo.FilesPaths.GetListObj(postId.ToString());
                        repo.FilesPaths.RemoveListOfFilesPaths(filePathsArray);
                        repo.Save();

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

                        repo.FilesPaths.Create(newFilePathObj);
                        repo.Save();

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

            var listFilePaths = await repo.FilesPaths.GetListStringFilesPath(postId.ToString());
            
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
            var listViewCount = await repo.Views.GetListUserIdString(postId);

            //get userID
            var user = await userManager.FindByNameAsync(username);
            var userID = user.Id.ToString();

            var postAuthor = await repo.Posts.GetPostAuthorAsync(postId.ToString());
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
                    
                    repo.Views.Create(newView);
                    repo.Save();
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
                        repo.Views.Create(newView);
                        repo.Save();
                    }
                }
            }


            repo.Save();
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
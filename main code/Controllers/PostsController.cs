using System.Runtime.CompilerServices;
using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise.Repositories;
using WebEnterprise.Entities;
using WebEnterprise.Dtos;
using System.Threading.Tasks;

namespace WebEnterprise.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostsRepo repo;
        public PostsController(IPostsRepo repo) {
            this.repo = repo;
        }


        //GET /Posts
        [HttpGet]
        public async Task<IEnumerable<PostDto>> GetAllPostsAsync() {
            return (await repo.GetPostsAsync())
                    .Select(post => post.AsDto());
        }

        //GET /Posts/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetPostAsync(Guid id) {
            var post = await repo.GetPostAsync(id);
            if(post is null) {
                return NotFound();
            } 
            return post.AsDto();
        }

        //POST /posts
        [HttpPost]
        public async Task<ActionResult<PostDto>> CreatePostAsync(CreatePostDto postDto) {
            Posts post = new() {
                // id = Guid.NewGuid(),
                Title = postDto.Title,
                Content = postDto.Content,
                CreatedDate = DateTimeOffset.UtcNow
            };

            await repo.CreatePostAsync(post);

            return CreatedAtAction(nameof(GetPostAsync), new {id = post.id}, post.AsDto());
        }

        //PUT /posts/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePostAsync(Guid id, UpdatePostDto postDto) {
            var post = await repo.GetPostAsync(id);
            if (post is null)
            {
                return NotFound();
            }

            Posts updatedPost = post with {
                Title = postDto.Title,
                Content = postDto.Content
            };

            await repo.UpdatePostAsync(updatedPost);
            return NoContent();
        }

        //DELETE /posts/{id}
        [HttpDelete("{id}")]
        public ActionResult DeletePost(Guid id) {
            var postID = repo.GetPostAsync(id);
            if(postID is null) {
                return NotFound();
            }
            
            repo.DeletePostAsync(id);
            return NoContent();
        }
    }
}
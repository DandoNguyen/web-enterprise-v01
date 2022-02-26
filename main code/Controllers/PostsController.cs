using System.Runtime.CompilerServices;
using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise.Repositories;
using WebEnterprise.Entities;
using WebEnterprise.Dtos;

namespace WebEnterprise.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IPostsRepo repo;
        public PostsController(IPostsRepo repo) {
            this.repo = repo;
        }


        //GET /Posts
        [HttpGet]
        public IEnumerable<PostDto> GetAllPosts() {
            return repo.GetPosts().Select(post => post.AsDto());
        }

        //GET /Posts/{id}
        [HttpGet("{id}")]
        public ActionResult<PostDto> GetPost(Guid id) {
            var post = repo.GetPost(id);
            if(post is null) {
                return NotFound();
            } 
            return post.AsDto();
        }

        //POST /posts
        [HttpPost]
        public ActionResult<PostDto> CreatePost(CreatePostDto postDto) {
            Posts post = new() {
                id = Guid.NewGuid(),
                Title = postDto.Title,
                Content = postDto.Content,
                CreatedDate = DateTimeOffset.UtcNow
            };

            repo.CreatePost(post);

            return CreatedAtAction(nameof(GetPost), new {id = post.id}, post.AsDto());
        }

        //PUT /posts/{id}
        [HttpPut("{id}")]
        public ActionResult UpdatePost(Guid id, UpdatePostDto postDto) {
            var post = repo.GetPost(id);
            if (post is null)
            {
                return NotFound();
            }

            Posts updatedPost = post with {
                Title = postDto.Title,
                Content = postDto.Content
            };

            repo.UpdatePost(updatedPost);
            return NotFound();
        }

        //DELETE /posts/{id}
        [HttpDelete("{id}")]
        public ActionResult DeletePost(Guid id) {
            var postID = repo.GetPost(id);
            if(postID is null) {
                return NotFound();
            }
            
            repo.DeletePost(id);
            return NoContent();
        }
    }
}
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise.Repositories;
using WebEnterprise.Entities;

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
        public IEnumerable<Posts> GetAllPosts() {
            return repo.GetPosts();
        }

        //GET /Posts/{id}
        [HttpGet("{id}")]
        public Posts GetPost(Guid id) {
            return repo.GetPost(id);
        }
    }
}
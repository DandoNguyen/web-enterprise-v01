using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/Topics
    public class TopicsController : ControllerBase 
    {
        private readonly IMapper mapper;
        private readonly IRepositoryWrapper repo;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public TopicsController(
            IMapper mapper,
            IRepositoryWrapper repo, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager)
        {
            this.mapper = mapper;
            this.repo = repo;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        //GET get all post of this topic
        [HttpGet]
        [Route("GetAllPostFromTopic")]
        public async Task<IActionResult> GetListPostsFromThisTopicAsync(string TopicId) {
            var listPosts = await repo.Posts
                .FindByCondition(x => x.TopicId.Equals(Guid.Parse(TopicId)))
                .ToListAsync();
            var topic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(Guid.Parse(TopicId)))
                .FirstOrDefaultAsync();
            if (listPosts.Count().Equals(0))
            {
                return NotFound($"No Post Available in Topic {topic.TopicName}");
            }
            var listPostsDto = new List<PostDetailDto>();
            foreach (var post in listPosts)
            {
                var postDto = await GetCategoriesNameAsync(post);
                listPostsDto.Add(postDto);
            }
            return Ok(listPostsDto);
        }

        //GET get all Topic 
        [HttpGet]
        [Route("GetAllTopic")]
        public async Task<IActionResult> GetListTopicAsync() {
            var listTopics = await repo.Topics
                .FindAll()
                .ToListAsync();
            if (listTopics.Count().Equals(0))
            {
                return Ok("No Topic available");
            }
            return Ok(listTopics);
        }

        //GET get Topic Details
        [HttpGet]
        [Route("GetTopicById")]
        public async Task<IActionResult> GetTopicDetailAsync(string TopicId) {
            var topic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(TopicId))
                .FirstOrDefaultAsync();
            if (topic is null)
            {
                return NotFound();
            }
            return Ok(topic);
        }

        //POST create Toptc
        [HttpPost]
        [Route("CreateTopic")]
        public async Task<IActionResult> CreateTopicAsync(CreateTopicDto createTopicDto) {
            var existingTopic = await repo.Topics
                .FindByCondition(x => x.TopicName.ToLower().Equals(createTopicDto.TopicName.ToLower()))
                .FirstOrDefaultAsync();
            if (existingTopic is null)
            {
                var newTopic = mapper.Map<Topics>(createTopicDto);
                if (ModelState.IsValid)
                {
                    repo.Topics.Create(newTopic);
                    repo.Save();
                }
                return Ok($"Topic {createTopicDto.TopicName} has been created!");
            }
            return BadRequest($"Topic name {createTopicDto.TopicName} has already exist");
        }

        //DELETE remove Topic
        [HttpDelete]
        [Route("RemoveTopic")]
        public async Task<IActionResult> RemoveTopicAsync(RemoveTopicDto removeTopicDto) {
            var listPosts = await repo.Posts
                .FindByCondition(x => x.TopicId.Equals(removeTopicDto.TopicId))
                .ToListAsync();
            var Topic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(Guid.Parse(removeTopicDto.TopicId)))
                .FirstOrDefaultAsync();
            if (listPosts.Count().Equals(0))
            {
                repo.Topics.Delete(Topic);
                repo.Save();
                return Ok($"Topic {Topic.TopicName} has been deleted");
            }
            return BadRequest($"All post inside Topic {Topic.TopicName} must be removed before Atempting to remove this Topic");
        }

        //PUT update Topic
        [HttpPut]
        [Route("UpdateTopic")]
        public async Task<IActionResult> UpdateTopicAsync(UpdateTopicDto dto) {
            var existingTopic = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(dto.TopicId))
                .FirstOrDefaultAsync();
            if (existingTopic is null)
            {
                return NotFound($"Topic with ID: {dto.TopicId} not found");
            }
            var newTopic = mapper.Map<Topics>(dto);
            if (ModelState.IsValid)
            {
                repo.Topics.Update(newTopic);
                repo.Save();
                return Ok($"Topic {newTopic.TopicName} has been updated");
            }
            return BadRequest($"Error in updating Topic {dto.TopicName}");
        }

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
        
    }
}
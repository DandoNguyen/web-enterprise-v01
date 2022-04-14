using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")] // /api/Statistic
    public class StatisticController : ControllerBase
    {
        private readonly IRepositoryWrapper repo;

        public StatisticController(
            IRepositoryWrapper repo
        )
        {
            this.repo = repo;
        }

        [HttpGet]
        [Route("AllPostByTopic")]
        public async Task<IActionResult> GetAllPostByTopic() {
            var listPosts = await repo.Posts
                .FindAll().ToListAsync();
            var listTopic = await repo.Topics
                .FindAll().ToListAsync();
            var listResult = new List<StatisticResultDto>();
            foreach (var topic in listTopic)
            {
                List<Posts> ListValue = new();
                foreach (var post in listPosts)
                {
                    
                    if (topic.TopicId.Equals(post.TopicId))
                    {
                        ListValue.Add(post);
                    }
                }
                var result = GetData(topic.TopicName, ListValue.Count());
                listResult.Add(result);
            }
            return Ok(listResult);
        }

        [HttpGet]
        [Route("PostApproveRatioByDepartment")]
        public async Task<IActionResult> GetPostApproveRatioByDepartment() {
            var listPosts = await repo.Posts
                .FindByCondition(x => x.Status.Equals(1)) //Status = 1 (approved)
                .Include(x => x.ApplicationUser)
                .ToListAsync();
            var listDepartment = await repo.Departments
                .FindAll().ToListAsync();
            var listResult = new List<StatisticResultDto>();
            foreach (var department in listDepartment)
            {
                List<Posts> ListValue = new();
                foreach (var post in listPosts)
                {
                    if (department.DepartmentId.Equals(Guid.Parse(post.ApplicationUser.DepartmentId)))
                    {
                        ListValue.Add(post);
                    }
                }
                var result = GetData(department.DepartmentName, ListValue.Count());
                listResult.Add(result);
            }
            return Ok(listResult);
        }

        [HttpGet]
        [Route("AllPostByDepartment")]
        public async Task<IActionResult> GetAllPostByDepartment() {
            var listPosts = await repo.Posts
                .FindAll().Include(x => x.ApplicationUser)
                .ToListAsync();
            var listDepartment = await repo.Departments
                .FindAll().ToListAsync();
            var listResult = new List<StatisticResultDto>();

            foreach (var department in listDepartment)
            {
                List<Posts> ListValue = new();
                foreach (var post in listPosts)
                {
                    if (department.DepartmentId.Equals(Guid.Parse(post.ApplicationUser.DepartmentId)))
                    {
                        ListValue.Add(post);
                    }
                }
                var result = GetData(department.DepartmentName, ListValue.Count());
                listResult.Add(result);
            }
            return Ok(listResult);
        }

        private StatisticResultDto GetData(string topic, int value) {
            return new StatisticResultDto() {
                DataName = topic,
                Value = value
            };
        }
    }
}
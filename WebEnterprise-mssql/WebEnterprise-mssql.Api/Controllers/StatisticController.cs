using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
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
        private readonly IConfiguration configuration;

        public StatisticController(
            IRepositoryWrapper repo,
            IConfiguration configuration
        )
        {
            this.repo = repo;
            this.configuration = configuration;
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
            var filePath = await SaveExcelFileAsync(listResult, $"{nameof(GetAllPostByTopic)}.xlsx", "default");
            return Ok(new {listResult, filePath});
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
            var filePath = await SaveExcelFileAsync(listResult, $"{nameof(GetPostApproveRatioByDepartment)}.xlsx", "default");
            return Ok(new {listResult, filePath});
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
            var filePath = await SaveExcelFileAsync(listResult, $"{nameof(GetAllPostByDepartment)}.xlsx", "default");
            return Ok(new {listResult, filePath});
        }

        private StatisticResultDto GetData(string topic, int value) {
            return new StatisticResultDto() {
                DataName = topic,
                Value = value
            };
        }

        private async Task<string> SaveExcelFileAsync(IEnumerable<StatisticResultDto> listObject, string fileName, string worksheetName)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var newFileInfo = GetRootDirectory(fileName);
            var file = new FileInfo(newFileInfo);
            DeleteIfExist(file);

            using var package = new ExcelPackage(file);
            var worksheet = package.Workbook.Worksheets.Add(worksheetName);
            var range = worksheet.Cells["A1"].LoadFromCollection(listObject, true);
            range.AutoFitColumns();
            await package.SaveAsync();

            return file.DirectoryName;
        }

        private string GetRootDirectory(string filePath)
        {
            var rootPath = configuration["FileConfig:statisticFilePath"];
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }

            var newFilePath = Path.Combine(rootPath, filePath);
            return newFilePath;
        }

        private void DeleteIfExist(FileInfo file)
        {
            if(file.Exists)
            {
                file.Delete();
            }
        }
    }
}
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebEnterprise_mssql.Api.Repository;
using WebEnterprise_mssql.Api.Services;
using WebEnterprise_mssql.Dtos.SumUp;

namespace WebEnterprise_mssql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SumUpController : ControllerBase
    {
        private readonly IRepositoryWrapper repo;
        private readonly ILogger<SumUpController> logger;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;
        private readonly IFileActionService<SumUpDto> fileAction;

        public SumUpController(
            IRepositoryWrapper repo,
            ILogger<SumUpController> logger,
            IConfiguration configuration,
            IMapper mapper,
            IFileActionService<SumUpDto> fileAction)
        {
            this.repo = repo;
            this.logger = logger;
            this.configuration = configuration;
            this.mapper = mapper;
            this.fileAction = fileAction;
        }

        [HttpGet]
        [Route("SumUp")]
        public async Task<IActionResult> SumUpAsync(string TopicId)
        {
            var topicName = await repo.Topics
                .FindByCondition(x => x.TopicId.Equals(Guid.Parse(TopicId)))
                .Select(x => x.TopicName)
                .FirstOrDefaultAsync();
            var listPosts = await repo.Posts
                .FindByCondition(x => x.TopicId.Equals(Guid.Parse(TopicId)))
                .ToListAsync();
            List<SumUpDto> ListItem = new();
            foreach(var post in listPosts)
            {
                var item = mapper.Map<SumUpDto>(post);
                var votes = await GetVote(post.PostId.ToString());
                mapper.Map(votes, item);
                ListItem.Add(item);
            }
            var fileName = await SaveExcelFileAsync(ListItem, $"{topicName}.xlsx", "sheet 1");
            var filePath = GetRootDirectory(fileName);

            return Ok(filePath);
        }

        private async Task<SumUpDto> GetVote(string postId)
        {
            var upVoteCount = await repo.UpVotes
                .FindByCondition(x => x.postId.Equals(postId))
                .ToListAsync();
            var downVoteCount = await repo.DownVote
                .FindByCondition(x => x.postId.Equals(postId))
                .ToListAsync();
            return new SumUpDto { upVote = upVoteCount.Count(), downVote = downVoteCount.Count() };
        }

        private async Task<string> SaveExcelFileAsync(IEnumerable<SumUpDto> listObject, string fileName, string worksheetName)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var newFileInfo = GetRootDirectory(fileName);
            var file = new FileInfo(newFileInfo);
            DeleteIfExist(file);

            using var package = new ExcelPackage(file);
            var worksheet = package.Workbook.Worksheets.Add(worksheetName);
            var range = worksheet.Cells["B2"].LoadFromCollection(listObject, true);
            await package.SaveAsync();

            return file.Name;
        }

        private string GetRootDirectory(string filePath)
        {
            var rootPath = configuration["FileConfig:SumUpFilePath"];
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }

            var newFilePath = Path.Combine(rootPath, filePath);
            return newFilePath;
        }

        private void DeleteIfExist(FileInfo file)
        {
            if (file.Exists)
            {
                file.Delete();
            }
        }
    }
}

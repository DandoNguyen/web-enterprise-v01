using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Data;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("/api/[controller]")] // /api/comments
    public class CommentsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApiDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        public CommentsController(
            IMapper mapper, 
            ApiDbContext context,
            UserManager<ApplicationUser> userManager
        )
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        [Route("AllComments")]
        public async Task<List<ParentItemDto>> GetAllComment(string PostId) {
            var listParent = await context.Comments
                .Where(x => x.PostId.Equals(PostId))
                .Where(x => x.IsChild.Equals(false))
                .ToListAsync();
            var resultList = new List<ParentItemDto>();
            foreach (var parent in listParent)
            {
                var newParent = await GetChildren(parent.CommentId.ToString());
                var user = await userManager.FindByIdAsync(parent.userId);
                newParent.Username = user.UserName;
                resultList.Add(newParent);
            }
            return resultList;
        }

        private async Task<ParentItemDto> GetChildren(string ParentId) {
            var parent = await context.Comments
                .Where(x => x.CommentId.Equals(Guid.Parse(ParentId)))
                .FirstOrDefaultAsync();
            var parentDto = mapper.Map<ParentItemDto>(parent);
            var ListChildren = await context.Comments
                .Where(x => x.IsChild.Equals(true))
                .Where(x => x.ParentId.Equals(Guid.Parse(ParentId)))
                .ToListAsync();
            var newListChildren = new List<ChildItemDto>();
            foreach (var child in ListChildren)
            {
                var newChild = mapper.Map<ChildItemDto>(child);
                var user = await userManager.FindByIdAsync(child.userId);
                newChild.Username = user.UserName;
                newListChildren.Add(newChild);
            }
            parentDto.childItems = newListChildren;
            return parentDto;
        }

        [HttpDelete]
        [Route("{id}")]
        public async void DeleteComment(Guid id) {
            var existingComment = await context.Comments
                .Where(x => x.CommentId == id)
                .FirstOrDefaultAsync();
            context.Comments.Remove(existingComment);
            await context.SaveChangesAsync();
        }

        [HttpPut]
        public async void UpdateComment(CommentDto CommentDto) {
            var existingComment = await context.Comments
                .Where(x => x.CommentId == Guid.Parse(CommentDto.PreviousCommentId))
                .FirstOrDefaultAsync();
            existingComment = mapper.Map<Comments>(CommentDto);
            existingComment.LastModifiedDate = DateTimeOffset.UtcNow;
            context.Comments.Update(existingComment);
            await context.SaveChangesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddComment(CommentDto CommentDto)
        {
            var newComment = mapper.Map<Comments>(CommentDto);
            newComment.CreatedDate = DateTimeOffset.UtcNow;
            await context.Comments.AddAsync(newComment);
            await context.SaveChangesAsync();
            return RedirectToAction(nameof(GetAllComment), new {CommentDto.PostId});
        }
    }
}
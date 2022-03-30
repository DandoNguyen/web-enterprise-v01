using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebEnterprise_mssql.Api.Data;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")] // /api/comments
    public class CommentsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IRepositoryWrapper repo;

        public CommentsController(
            IMapper mapper, 
            UserManager<ApplicationUser> userManager,
            IRepositoryWrapper repo
        )
        {
            this.userManager = userManager;
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("AllComments")]
        public async Task<List<ParentItemDto>> GetAllComment(string PostId) {

            // var listParent = await context.Comments
            //     .Where(x => x.PostId.Equals(PostId))
            //     .Where(x => x.IsChild.Equals(false))
            //     .ToListAsync();
            var listParent = await repo.Comments.GetListParentAsync(PostId);

            var resultList = new List<ParentItemDto>();
            foreach (var parent in listParent)
            {
                var newParent = await GetChildrenToParent(parent.CommentId.ToString());
                var user = await userManager.FindByIdAsync(parent.userId);
                newParent.Username = user.UserName;
                resultList.Add(newParent);
            }
            return resultList;
        }

        private async Task<ParentItemDto> GetChildrenToParent(string ParentId) {

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
        public async Task<IActionResult> DeleteBtnClick(DeleteCommentDto deleteCommentDto) {
            var parent = await GetChildrenToParent(deleteCommentDto.commentId.ToString());

            if (parent.childItems.Count().Equals(0))
            {
                DeleteComment(parent.CommentId);
            } 
            else
            {
                DeleteRangeComment(parent.CommentId);
                DeleteComment(parent.CommentId);
            }
            
            return RedirectToAction(nameof(GetAllComment), new {deleteCommentDto.PostId});
        }

        private async void DeleteRangeComment(Guid parentId) {
            var childrenCommentArray = await context.Comments.Where(x => x.ParentId.Equals(parentId)).ToArrayAsync();
            
            context.Comments.RemoveRange(childrenCommentArray);
        }
        private async void DeleteComment(Guid commentId) {
            var existingComment = await context.Comments
                .Where(x => x.CommentId == commentId)
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
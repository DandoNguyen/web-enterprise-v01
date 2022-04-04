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

//    DATE           NAME      TODO
//   4/1/2022        Ngoc      use Repo(update,delete,create,getlist) instead of linQ
//   
//=============================================================================================

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
        public async Task<List<ParentItemDto>> GetAllComment(string PostId)
        {

            // var listParent = await context.Comments
            //     .Where(x => x.PostId.Equals(PostId))
            //     .Where(x => x.IsChild.Equals(false))
            //     .ToListAsync();
            var listParent = await repo.Comments.GetListParentAsync(PostId);

            var resultList = new List<ParentItemDto>();
            foreach (var parent in listParent)
            {
                if (parent.IsChild.Equals(false))
                {
                    var newParent = await GetChildrenToParent(parent.CommentId.ToString());
                    var user = await userManager.FindByIdAsync(parent.userId);
                    newParent.Username = user.UserName;
                    resultList.Add(newParent);
                }
            }
            return resultList;
        }

        private async Task<ParentItemDto> GetChildrenToParent(string ParentId)
        {

            // var parent = await context.Comments
            //     .Where(x => x.CommentId.Equals(Guid.Parse(ParentId)))
            //     .FirstOrDefaultAsync();
            var parent = await repo.Comments.GetParentByCommentIdAsync(ParentId);

            var parentDto = mapper.Map<ParentItemDto>(parent);

            // var ListChildren = await context.Comments
            //     .Where(x => x.ParentId.Equals(Guid.Parse(ParentId)))
            //     .ToListAsync();
            var ListChildren = await repo.Comments.GetListChildrenByParentIdAsync(Guid.Parse(ParentId));


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
        public async Task<IActionResult> DeleteBtnClick(DeleteCommentDto deleteCommentDto)
        {
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

            return RedirectToAction(nameof(GetAllComment), new { deleteCommentDto.PostId });
        }

        private async void DeleteRangeComment(Guid parentId)
        {
            // var childrenCommentArray = await context.Comments.Where(x => x.ParentId.Equals(parentId)).ToArrayAsync();
            var childrenCommentArray = await repo.Comments.GetListChildrenByParentIdAsync(parentId);

            // context.Comments.RemoveRange(childrenCommentArray);
            repo.Comments.DeleteListChildren(childrenCommentArray);
            repo.Save();
        }
        private async void DeleteComment(Guid commentId)
        {
            // var existingComment = await context.Comments
            //     .Where(x => x.CommentId == commentId)
            //     .FirstOrDefaultAsync();
            var existingComment = await repo.Comments.GetComments(commentId);

            //context.Comments.Remove(existingComment);
            repo.Comments.Delete(existingComment);

            repo.Save();
        }


        [HttpPut]
        public async Task<IActionResult> UpdateComment(CommentDto CommentDto)
        {
            // var existingComment = await context.Comments
            //      .Where(x => x.CommentId == Guid.Parse(CommentDto.PreviousCommentId))
            //      .FirstOrDefaultAsync();
            var existingComment = await repo.Comments.GetComments(Guid.Parse(CommentDto.PreviousCommentId));

            existingComment = mapper.Map<Comments>(CommentDto);
            existingComment.LastModifiedDate = DateTimeOffset.UtcNow;

            //context.Comments.Update(existingComment);
            repo.Comments.Update(existingComment);

            repo.Save();
            return RedirectToAction(nameof(GetAllComment), new { CommentDto.PostId });
        }

        [HttpPost]
        public IActionResult AddComment(CommentDto CommentDto)
        {
            var newComment = mapper.Map<Comments>(CommentDto);
            newComment.CreatedDate = DateTimeOffset.UtcNow;

            // await context.Comments.AddAsync(newComment);
            repo.Comments.Create(newComment);

            repo.Save();
            return RedirectToAction(nameof(GetAllComment), new { CommentDto.PostId });
        }
    }
}
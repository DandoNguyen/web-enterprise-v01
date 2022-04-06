using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    [Route("/api/[controller]")] // /api/vote
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme/*, Roles = "staff"*/)]
    public class VotesController : ControllerBase
    {

        
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;
        private readonly IRepositoryWrapper repo;

        public VotesController(
            ApiDbContext context,
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IRepositoryWrapper repo
        )
        {
            this.mapper = mapper;
            this.userManager = userManager;
            this.repo = repo;
            
        }

        [HttpGet]
        [Route("Vote")]
        public async Task<IActionResult> GetVoteStatus(Guid postId)
        {
            var voteStatus = await GetVote(postId);
            return Ok(voteStatus);
        }

        [HttpPost]
        [Route("voteBtnClick")]
        public async Task<IActionResult> VoteBtnClick(VoteBtnRequestDto voteBtnRequestDto)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(voteBtnRequestDto.postId)).ToListAsync();
            var vote = await repo.Votes.GetlistVoteAsync(Guid.Parse(voteBtnRequestDto.postId));

            var upVoteList = vote.Select(x => x.userUpvote).ToList();
            var downVoteList = vote.Select(x => x.userDownVote).ToList();
            switch (voteBtnRequestDto.VoteInput)
            {
                case true:
                    {
                        if (upVoteList.Contains(voteBtnRequestDto.UserId))
                        {
                            var voteId = vote.Where(x => x.userUpvote.Equals(voteBtnRequestDto.UserId)).FirstOrDefault();
                            removeVotes(voteId.voteId, voteBtnRequestDto.UserId, true);
                        }
                        else if (downVoteList.Contains(voteBtnRequestDto.UserId))
                        {
                            SwitchVoteTo(true, voteBtnRequestDto.postId, voteBtnRequestDto.UserId);
                        }
                        else
                        {
                            AddUpVote(Guid.Parse(voteBtnRequestDto.postId), voteBtnRequestDto.UserId);
                        }
                        break;
                    }

                case false:
                    {
                        if (downVoteList.Contains(voteBtnRequestDto.UserId))
                        {
                            var voteId = vote.Where(x => x.userDownVote.Equals(voteBtnRequestDto.UserId)).FirstOrDefault();
                            removeVotes(voteId.voteId, voteBtnRequestDto.UserId, false);
                        }
                        else if (upVoteList.Contains(voteBtnRequestDto.UserId))
                        {
                            SwitchVoteTo(false, voteBtnRequestDto.postId, voteBtnRequestDto.UserId);
                        }
                        else
                        {
                            AddDownVote(Guid.Parse(voteBtnRequestDto.postId), voteBtnRequestDto.UserId);
                        }
                        break;
                    }
            }

            return CreatedAtAction(nameof(GetVoteStatus), new { voteBtnRequestDto.postId });
        }

        private async Task<VoteDto> GetVote(Guid postId)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(postId)).ToListAsync();
            var vote = await repo.Votes.GetlistVoteAsync(postId);

            var voteDto = new VoteDto() {
                UpvoteCount = vote.Select(x => x.userUpvote).Count(),
                DownVoteCount = vote.Select(x => x.userDownVote).Count(),
                UpVoteUserList = vote.Select(x => x.userUpvote).ToList(),
                DownVoteUserList = vote.Select(x => x.userDownVote).ToList()
            };
            return voteDto;
        }
        // private async Task<IActionResult> GetVoteOfUser(Guid postId, string userId)
        // {
        //     var user = await userManager.FindByIdAsync(userId.ToString());
        //     var voteObj = await context.Votes.Where(x => x.postId.Equals(postId)).FirstOrDefaultAsync();

        //     var newVoteResponse = new IndividualVoteResponse()
        //     {
        //         UpVote = voteObj.upVoteList.Contains(userId),
        //         DownVote = voteObj.downVoteList.Contains(userId)
        //     };

        //     if (newVoteResponse.UpVote == newVoteResponse.DownVote)
        //     {
        //         if (newVoteResponse.UpVote == true)
        //         {
        //             removeVotes(voteObj.voteId, userId, 3);
        //             await context.SaveChangesAsync();
        //             return BadRequest(new IndividualVoteResponse()
        //             {
        //                 Error = $"Internal Error\nRemoved all votes from user {user.UserName}"
        //             });
        //         }
        //         else
        //         {
        //             return Ok(newVoteResponse);
        //         }
        //     }
        //     return Ok(newVoteResponse);
        // }

        private async void SwitchVoteTo(bool UpDown, string postId, string userId)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(postId)).ToListAsync();
            var vote = await repo.Votes.GetlistVoteAsync(Guid.Parse(postId));

            switch (UpDown) //Up = true, Down = false
            {
                case true:
                    var existingDownVote = vote.Where(x => x.userDownVote.Equals(userId)).FirstOrDefault();
                    removeVotes(existingDownVote.voteId, userId, false);
                    AddUpVote(Guid.Parse(postId), userId);
                    break;

                case false:
                    var existingUpVote = vote.Where(x => x.userUpvote.Equals(userId)).FirstOrDefault();
                    removeVotes(existingUpVote.voteId, userId, false);
                    AddDownVote(Guid.Parse(postId), userId);
                    break;
            }
        }
        private async void removeVotes(Guid voteId, string userId, bool UpDown)
        {
            //var vote = await context.Votes.Where(x => x.voteId.Equals(voteId)).ToListAsync();
            var vote = await repo.Votes. GetListVoteByVoteId(voteId);
            
            switch (UpDown)
            {
                case true: {
                    var upVote = vote.Where(x => x.userUpvote == userId).FirstOrDefault();

                    //context.Votes.Remove(upVote);
                    repo.Votes.Delete(upVote);

                    break;
                }
                case false: {
                    var downVote = vote.Where(x => x.userDownVote == userId).FirstOrDefault();

                    //context.Votes.Remove(downVote);
                    repo.Votes.Delete(downVote);

                    break;
                }
            }
            repo.Save();
        }
        private async void AddUpVote(Guid postId, string userId)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(postId)).ToListAsync();
            var vote = await repo.Votes.GetlistVoteAsync(postId);

            var upVote = vote.Select(x => x.userUpvote).ToList();
            var newUpVote = new Votes() {
                    postId = postId,
                    userDownVote = userId
                };

            //context.Votes.Add(newUpVote);
            repo.Votes.Create(newUpVote);

            repo.Save();
        }

        private async void AddDownVote(Guid postId, string userId)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(postId)).ToListAsync();
            var vote = await repo.Votes.GetlistVoteAsync(postId);

            var downVote = vote.Select(x => x.userDownVote).ToList();
            var newDownVote = new Votes() {
                    postId = postId,
                    userDownVote = userId
                };

            //context.Votes.Add(newDownVote);
            repo.Votes.Create(newDownVote);

            repo.Save();
        }
    }
}
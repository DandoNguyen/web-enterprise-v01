using System;
using System.IdentityModel.Tokens.Jwt;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
        [Route("GetUserVoteStatus")]
        public async Task<IActionResult> GetUserVoteStatus([FromHeader] string Authorization, string postId)
        {
            if (Authorization is null)
            {
                return BadRequest("Param Authoorization is null");
            }
            var user = await DecodeToken(Authorization);

            if (postId is null)
            {
                return BadRequest("Cannot get chosen Idea ID");
            }
            var listVote = await repo.Votes
                .FindByCondition(x => x.postId.Equals(Guid.Parse(postId)))
                .ToListAsync();
            if (listVote.Count.Equals(0))
            {
                return Ok();
            }
            var userVoteStatus = new userVoteStatusDto()
            {
                UpVote = false,
                DownVote = false,
            };
            foreach (var vote in listVote)
            {
                if (vote.userUpvoteId.Equals(user.Id))
                {
                    userVoteStatus.UpVote = true;
                }
                else if (vote.userDownVoteId.Equals(user.Id))
                {
                    userVoteStatus.DownVote = true;
                }
            }
            return Ok(userVoteStatus);
        }

        [HttpGet]
        [Route("GetVoteStatusOfPost")]
        public async Task<IActionResult> GetVoteStatus(Guid postId)
        {
            var voteStatus = await GetVote(postId);
            return Ok(voteStatus);
        }

        [HttpPost]
        [Route("voteBtnClick")]
        public async Task<IActionResult> VoteBtnClick(VoteBtnRequestDto dto, [FromHeader] string Authorization)
        {
            if (Authorization is null)
            {
                return BadRequest("Authorization Param is null");
            }
            var user = await DecodeToken(Authorization);

            //var vote = await context.Votes.Where(x => x.postId.Equals(voteBtnRequestDto.postId)).ToListAsync();
            var vote = await repo.Votes
                .FindByCondition(x => x.postId.Equals(Guid.Parse(dto.postId)))
                .FirstOrDefaultAsync();

            if (vote is null)
            {
                await AddVoteAsync(dto.postId, user.Id, dto.VoteInput);
                switch(dto.VoteInput)
                {
                    case true: return Ok($"User {user.UserName} vote up");
                    case false: return Ok($"User {user.UserName} vote down");
                }
            }
            else
            {
                switch(dto.VoteInput)
                {
                    case true:
                        {
                            if(vote.userUpvoteId.Contains(user.Id))
                            {
                                await removeVotes(vote.voteId, user.Id, true);
                            }
                            else if(vote.userDownVoteId.Contains(user.Id))
                            {
                                await SwitchVoteTo(true, dto.postId, user.Id);
                            }
                            else
                            {
                                await AddVoteAsync(dto.postId, user.Id, true);
                            }
                            break;
                        }
                    case false:
                        {
                            if (vote.userDownVoteId.Contains(user.Id))
                            {
                                await removeVotes(vote.voteId, user.Id, false);
                            }
                            else if (vote.userUpvoteId.Contains(user.Id))
                            {
                                await SwitchVoteTo(false, dto.postId, user.Id);
                            }
                            else
                            {
                                await AddVoteAsync(dto.postId, user.Id, false);
                            }
                            break;
                        }
                }
                repo.Votes.Update(vote);
            }
            await repo.Save();
            return CreatedAtAction(nameof(GetVoteStatus), new { dto.postId });
        }

        private async Task<ApplicationUser> DecodeToken(string Authorization)
        {

            string[] Collection = Authorization.Split(" ");

            //Decode the token
            var stream = Collection[1];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;

            //get the user
            var email = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);

            //return the user
            return user;
        }
        private async Task<VoteDto> GetVote(Guid postId)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(postId)).ToListAsync();
            var vote = await repo.Votes.GetlistVoteAsync(postId);

            var voteDto = new VoteDto()
            {
                UpvoteCount = vote.Select(x => x.userUpvoteId).Count(),
                DownVoteCount = vote.Select(x => x.userDownVoteId).Count()
            };
            return voteDto;
        }

        private async Task SwitchVoteTo(bool UpDown, string postId, string userId)
        {
            //var vote = await context.Votes.Where(x => x.postId.Equals(postId)).ToListAsync();
            var vote = await repo.Votes
                .FindByCondition(x => x.postId.Equals(Guid.Parse(postId)))
                .FirstOrDefaultAsync();

            switch (UpDown) //Up = true, Down = false
            {
                case true:
                    if (vote.userDownVoteId.Contains(userId))
                    {
                        vote.userDownVoteId.Remove(userId);
                        vote.userUpvoteId.Add(userId);
                    }
                    break;

                case false:
                    if (vote.userUpvoteId.Contains(userId))
                    {
                        vote.userUpvoteId.Remove(userId);
                        vote.userDownVoteId.Add(userId);
                    }
                    break;
            }
            repo.Votes.Update(vote);
            await repo.Save();
        }
        private async Task removeVotes(Guid voteId, string userId, bool UpDown)
        {
            //var vote = await context.Votes.Where(x => x.voteId.Equals(voteId)).ToListAsync();
            var vote = await repo.Votes
                .FindByCondition(x => x.voteId.Equals(voteId))
                .FirstOrDefaultAsync();

            switch (UpDown)
            {
                case true:
                    {
                        vote.userUpvoteId.Remove(userId);
                        //context.Votes.Remove(upVote);
                        break;
                    }
                case false:
                    {
                        vote.userDownVoteId.Remove(userId);
                        //context.Votes.Remove(upVote);
                        break;
                    }
            }
            repo.Votes.Update(vote);
            await repo.Save();
        }

        private async Task AddVoteAsync(string postId, string userId, bool UpDown)
        {
            var newVote = new Votes();
            newVote.postId = Guid.Parse(postId);
            switch (UpDown)
            {
                case true: newVote.userUpvoteId.Add(userId); break;
                case false: newVote.userDownVoteId.Add(userId); break;
            }
            repo.Votes.Create(newVote);
            await repo.Save();
        }
    }
}
using System.Linq;
using AutoMapper;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Profiles
{
    public class VotesProfiles : Profile
    {
        public VotesProfiles()
        {
            CreateMap<Votes, VoteDto>()
                .ForMember(dest => dest.UpvoteCount, opt => opt.MapFrom(src => src.userUpvote));

            CreateMap<Votes, VoteDto>().ReverseMap();
        }
    }
}
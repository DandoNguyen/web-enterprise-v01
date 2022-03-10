using AutoMapper;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Profiles
{
    public class PostsProfile : Profile
    {
        public PostsProfile()
        {
            CreateMap<Posts, PostDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId));
            CreateMap<Posts, PostDto>().ReverseMap();
            CreateMap<Posts, CreatePostDto>().ReverseMap();
            CreateMap<Posts, UpdatedPostDto>().ReverseMap();
        }
    }
}
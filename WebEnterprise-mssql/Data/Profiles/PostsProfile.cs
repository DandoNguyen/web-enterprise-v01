using AutoMapper;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Profiles
{
    public class PostsProfile : Profile
    {
        public PostsProfile()
        {
            CreateMap<Posts, PostDto>();
            CreateMap<Posts, PostDto>().ReverseMap();
            CreateMap<Posts, CreatePostDto>().ReverseMap();
            CreateMap<Posts, UpdatedPostDto>().ReverseMap();
        }
    }
}
using System.Linq;
using AutoMapper;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Profiles
{
    public class CommentsProfile : Profile
    {
        public CommentsProfile()
        {
            CreateMap<Comments, CommentDto>();
            CreateMap<Comments, CommentDto>().ReverseMap();
            CreateMap<Comments, ParentItemDto>();
            CreateMap<Comments, ChildItemDto>();
        }
    }
}
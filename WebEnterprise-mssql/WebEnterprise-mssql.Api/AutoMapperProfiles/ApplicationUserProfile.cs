using AutoMapper;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Models;

namespace WebEnterprise_mssql.Api.Profiles
{
    public class ApplicationUserProfile : Profile
    {
        public ApplicationUserProfile()
        {
            CreateMap<UpdateApplicationUserDto, ApplicationUser>();
            CreateMap<ApplicationUserDto, ApplicationUser>().ReverseMap();
        }
    }
}
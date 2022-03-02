using AutoMapper;
using WebEnterprise_mssql.Dtos;
using WebEnterprise_mssql.Models;

namespace WebEnterprise_mssql.Profiles
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
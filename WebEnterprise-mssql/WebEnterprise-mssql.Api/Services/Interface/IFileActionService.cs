using System.Threading.Tasks;

namespace WebEnterprise_mssql.Api.Services
{
    public interface IFileActionService
    {
        Task ReadFile(); 
        Task DownloadFile();
    }
}
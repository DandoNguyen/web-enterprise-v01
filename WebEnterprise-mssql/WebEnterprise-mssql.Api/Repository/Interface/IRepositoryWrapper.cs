namespace WebEnterprise_mssql.Api.Repository
{
    public interface IRepositoryWrapper
    {
        IPostsRepository Post { get; }
        IFilesPathRepository FilesPath { get; }
        IViewsRepository Views { get; }
        ICommentsRepository Comments { get; }
        IVoteRepository Vote { get; }
        IDepartmentRepository Departments { get; }
        IUserRepository User { get; }
        void Save();
    }
}
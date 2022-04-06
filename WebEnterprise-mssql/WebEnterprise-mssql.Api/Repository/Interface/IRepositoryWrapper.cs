namespace WebEnterprise_mssql.Api.Repository
{
    public interface IRepositoryWrapper
    {
        IPostsRepository Posts { get; }
        IFilesPathRepository FilesPaths { get; }
        IViewsRepository Views { get; }
        ICommentsRepository Comments { get; }
        IVoteRepository Votes { get; }
        IDepartmentRepository Departments { get; }
        IUserRepository Users { get; }
        ITopicRepository Topics { get; }
        ICategoryRepository Categories {get;}
        void Save();
    }
}
using WebEnterprise_mssql.Api.Data;

namespace WebEnterprise_mssql.Api.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ApiDbContext context;
        private IPostsRepository _post;
        private IFilesPathRepository _filesPath;
        private IViewsRepository _view;
        private ICommentsRepository _comment;
        public IPostsRepository Post
        {
            get
            {
                if (_post == null)
                {
                    _post = new PostsRepository(context);
                }
                return _post;
            }
        }

        public IFilesPathRepository FilesPath
        {
            get
            {
                if (_filesPath == null)
                {
                    _filesPath = new FilesPathRepository(context);
                }
                return _filesPath;
            }
        }

        public IViewsRepository Views
        {
            get
            {
                if (_view is null)
                {
                    _view = new ViewsRepository(context);
                }
                return _view;
            }
        }

        public ICommentsRepository Comments {
            get
            {
                if (_comment is null)
                {
                    _comment = new CommentsRepository(context);
                }
                return _comment;
            }
        }

        public RepositoryWrapper(ApiDbContext context)
        {
            this.context = context;
        }

        public async void Save()
        {
            await context.SaveChangesAsync();
        }
    }
}
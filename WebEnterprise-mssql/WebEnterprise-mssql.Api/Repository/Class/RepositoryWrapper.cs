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
        private IVoteRepository _Vote;
        private IDepartmentRepository _Department;
        private IUserRepository _User;
        private ITopicRepository _Topic;
        private ICategoryRepository _Category;

        //===================================================
        public IPostsRepository Posts
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

        public IFilesPathRepository FilesPaths
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

        public IVoteRepository Votes {
            get
            {
                if (_Vote is null)
                {
                    _Vote = new VoteRepository(context);
                }
                return _Vote;
            }
        }

        public IDepartmentRepository Departments {
            get
            {
                if (_Department is null)
                {
                    _Department = new DepartmentRepository(context);
                }
                return _Department;
            }
        }

        public IUserRepository Users {
            get
            {
                if (_User is null)
                {
                    _User = new UserRepository(context);
                }
                return _User;
            }
        }

        public ITopicRepository Topics {
            get
            {
                if (_Topic is null)
                {
                    _Topic = new TopicRepository(context);
                }
                return _Topic;
            }
        }

        public ICategoryRepository Categories {
            get
            {
                if (_Category is null)
                {
                    _Category = new CategoryRepository(context);
                }
                return _Category;
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
using System;
using System.Collections.Generic;
using WebEnterprise.Entities;
using MongoDB.Driver;

namespace WebEnterprise.Repositories
{
    public class MongoDBPostsRepository : IPostsRepo
    {
        private const string databaseName = "Web-EnterPrise";
        private const string collectionName = "Posts";
        private readonly IMongoCollection<Posts> postsCollection;
        public MongoDBPostsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            postsCollection = database.GetCollection<Posts>(collectionName);
        }

        public Posts GetPost(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Posts> GetPosts()
        {
            throw new NotImplementedException();
        }
    }
}
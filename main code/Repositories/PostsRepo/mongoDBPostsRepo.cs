using System;
using System.Collections.Generic;
using WebEnterprise.Entities;
using MongoDB.Driver;

namespace WebEnterprise.Repositories
{
    public class MongoDBPostsRepository : IPostsRepo
    {
        private MongoClient mongoClient = null;
        private const string databaseName = "Web-EnterPrise";
        private const string collectionName = "Posts";
        private readonly IMongoCollection<Posts> postsCollection;
        public MongoDBPostsRepository()
        {
            mongoClient = new MongoClient("mongodb+srv://user1:YysfcWc4YOFasq8z@cluster0.v6pra.mongodb.net/project1?retryWrites=true&w=majority");
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            postsCollection = database.GetCollection<Posts>(collectionName);
        }

        public void CreatePost(Posts post)
        {
            postsCollection.InsertOne(post);
        }

        public void DeletePost(Guid id)
        {
            throw new NotImplementedException();
        }

        public Posts GetPost(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Posts> GetPosts()
        {
            throw new NotImplementedException();
        }

        public void UpdatePost(Posts post)
        {
            throw new NotImplementedException();
        }
    }

}
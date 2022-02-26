using System;
using System.Collections.Generic;
using WebEnterprise.Entities;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Linq;

namespace WebEnterprise.Repositories
{
    public class MongoDBPostsRepository : IPostsRepo
    {
        private MongoClient mongoClient = null;
        private const string databaseName = "Web-EnterPrise";
        private const string collectionName = "Posts";
        private readonly IMongoCollection<Posts> postsCollection;
        private readonly FilterDefinitionBuilder<Posts> filterBuilder = Builders<Posts>.Filter;
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
            var filter = filterBuilder.Eq(x => x.id, id);
            postsCollection.DeleteOne(filter);
        }

        public Posts GetPost(Guid id)
        {
            var filter = filterBuilder.Eq(x => x.id, id);
            return postsCollection.Find(filter).SingleOrDefault();
        }

        public IEnumerable<Posts> GetPosts()
        {
            return postsCollection.Find(new BsonDocument()).ToList();
        }

        public void UpdatePost(Posts post)
        {
            var filter = filterBuilder.Eq(x => x.id, post.id);
            postsCollection.ReplaceOne(filter, post);
        }
    }

}
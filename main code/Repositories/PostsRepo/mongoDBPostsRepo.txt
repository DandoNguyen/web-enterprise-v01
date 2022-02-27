using System.Threading.Tasks;
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

        public async Task CreatePostAsync(Posts post)
        {
            await postsCollection.InsertOneAsync(post);
        }

        public async Task DeletePostAsync(Guid id)        
        {
            var filter = filterBuilder.Eq(x => x.id, id);
            await postsCollection.DeleteOneAsync(filter);
        }

        public async Task<Posts> GetPostAsync(Guid id)
        {
            var filter = filterBuilder.Eq(x => x.id, id);
            return await postsCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Posts>> GetPostsAsync()
        {
            return await postsCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdatePostAsync(Posts post)
        {
            var filter = filterBuilder.Eq(x => x.id, post.id);
            await postsCollection.ReplaceOneAsync(filter, post);
        }
    }

}
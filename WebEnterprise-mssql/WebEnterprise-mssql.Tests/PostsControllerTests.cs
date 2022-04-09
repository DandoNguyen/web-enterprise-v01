using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Moq;
using Xunit;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Repository;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Controllers;

namespace WebEnterprise_mssql.Tests
{
    public class PostsControllerTests
    {
        private static Random random = new Random();

        
        [Fact]
        public void GetAllPostsAsync_WithNoParam_ReturnListOfPosts()
        {
            //Arrange
            var listPostMock = GetTestPost();

            var repoMock = new Mock<IPostsRepository>();
            repoMock.Setup(repo => repo.FindAll().ToList())
                .Returns(listPostMock);

            var controller = new PostsController(repoMock.Object);    
            //Act

            //Assert
        }

        private List<Posts> GetTestPost()
        {
            var postDtos = new List<Posts>();

            postDtos.Add(new Posts()
            {
                PostId = Guid.NewGuid(),
                title = RandomString(It.IsAny<int>()),
                Desc = RandomString(It.IsAny<int>()),
                content = RandomString(It.IsAny<int>()),
                username = RandomString(It.IsAny<int>()),
                isAnonymous = It.IsAny<bool>(),
                IsApproved = It.IsAny<bool>(),
                feedback = RandomString(It.IsAny<int>()),
                IsAssigned = It.IsAny<bool>(),
                QACUserId = RandomString(It.IsAny<int>()),
                TopicId = Guid.NewGuid(),
                createdDate = DateTimeOffset.UtcNow,
                LastModifiedDate = DateTimeOffset.UtcNow,
                UserId = (Guid.NewGuid()).ToString(),
                
            });

            postDtos.Add(new Posts()
            {
                PostId = Guid.NewGuid(),
                title = RandomString(It.IsAny<int>()),
                Desc = RandomString(It.IsAny<int>()),
                content = RandomString(It.IsAny<int>()),
                username = RandomString(It.IsAny<int>()),
                isAnonymous = It.IsAny<bool>(),
                IsApproved = It.IsAny<bool>(),
                feedback = RandomString(It.IsAny<int>()),
                IsAssigned = It.IsAny<bool>(),
                QACUserId = RandomString(It.IsAny<int>()),
                TopicId = Guid.NewGuid(),
                createdDate = DateTimeOffset.UtcNow,
                LastModifiedDate = DateTimeOffset.UtcNow,
                UserId = (Guid.NewGuid()).ToString(),
            });

            postDtos.Add(new Posts()
            {
                PostId = Guid.NewGuid(),
                title = RandomString(It.IsAny<int>()),
                Desc = RandomString(It.IsAny<int>()),
                content = RandomString(It.IsAny<int>()),
                username = RandomString(It.IsAny<int>()),
                isAnonymous = It.IsAny<bool>(),
                IsApproved = It.IsAny<bool>(),
                feedback = RandomString(It.IsAny<int>()),
                IsAssigned = It.IsAny<bool>(),
                QACUserId = RandomString(It.IsAny<int>()),
                TopicId = Guid.NewGuid(),
                createdDate = DateTimeOffset.UtcNow,
                LastModifiedDate = DateTimeOffset.UtcNow,
                UserId = (Guid.NewGuid()).ToString(),
            });

            return postDtos;
        }

        private static Posts RandomPost(int quantity) {

        }

        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}

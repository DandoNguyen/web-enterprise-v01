using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Moq;
using Xunit;
using WebEnterprise_mssql.Api.Dtos;
using WebEnterprise_mssql.Api.Repository;
using System.Linq;

namespace WebEnterprise_mssql.Tests
{
    public class PostsControllerTests
    {
        private static Random random = new Random();

        
        [Fact]
        public void GetAllPostsAsync_WithNoParam_ReturnListOfPosts()
        {
            //Arrange
            var listPostDtoMock = GetTestPostDto();

            var repoMock = new Mock<IPostsRepository>();
            repoMock.Setup(repo => repo.GetAllPostsAsync())
                .ReturnsAsync(listPostDtoMock);
            //Act

            //Assert
        }

        private List<PostDto> GetTestPostDto()
        {
            var postDtos = new List<PostDto>();

            postDtos.Add(new PostDto()
            {
                PostId = Guid.NewGuid(),
                title = RandomString(It.IsAny<int>()),
                content = RandomString(It.IsAny<int>()),
                createdDate = DateTimeOffset.UtcNow,
                LastModifiedDate = DateTimeOffset.UtcNow,
                ViewsCount = It.IsAny<int>(),
                UserId = (Guid.NewGuid()).ToString(),
                username = RandomString(It.IsAny<int>()),
            });

            postDtos.Add(new PostDto()
            {
                PostId = Guid.NewGuid(),
                title = RandomString(It.IsAny<int>()),
                content = RandomString(It.IsAny<int>()),
                createdDate = DateTimeOffset.UtcNow,
                LastModifiedDate = DateTimeOffset.UtcNow,
                ViewsCount = It.IsAny<int>(),
                UserId = (Guid.NewGuid()).ToString(),
                username = RandomString(It.IsAny<int>()),
            });

            postDtos.Add(new PostDto()
            {
                PostId = Guid.NewGuid(),
                title = RandomString(It.IsAny<int>()),
                content = RandomString(It.IsAny<int>()),
                createdDate = DateTimeOffset.UtcNow,
                LastModifiedDate = DateTimeOffset.UtcNow,
                ViewsCount = It.IsAny<int>(),
                UserId = (Guid.NewGuid()).ToString(),
                username = RandomString(It.IsAny<int>()),
            });

            return postDtos;
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}

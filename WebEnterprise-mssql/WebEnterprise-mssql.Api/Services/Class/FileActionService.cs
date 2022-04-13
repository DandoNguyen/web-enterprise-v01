// using System.Net;
// using System.IO;
// using System.Threading.Tasks;
// using System;

// namespace WebEnterprise_mssql.Api.Services
// {
//     public class FileActionService : IFileActionService
//     {
//         public Task DownloadFile()
//         {
//             throw new System.NotImplementedException();
//         }

//         public async Task ReadFile(string filePath)
//         {
//             Byte[] b = System.IO.File.ReadAllBytes(@"E:\\Test.jpg");   // You can use your own method over here.         
//             return File(b, "image/jpeg");
//         }
//     }
// }
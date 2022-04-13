using System.IO;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System.Threading.Tasks;

namespace WebEnterprise_mssql.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FileActionController : ControllerBase
    {
        public FileActionController()
        {

        }

        [HttpGet]
        [Route("GetFile")]
        public async Task<IActionResult> GetFile(string filePath)
        {
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            // Byte[] fileByte = System.IO.File.ReadAllBytes(filePath);
            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open)) {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            var contentType = Path.GetExtension(filePath);
            switch (contentType)
            {
                case ".jpg": case ".png": return File(memory, "image/jpeg");
                default: {
                    var newContentType = GetContentType(filePath);
                    return File(memory, newContentType);
                }
            }
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }
    }
}
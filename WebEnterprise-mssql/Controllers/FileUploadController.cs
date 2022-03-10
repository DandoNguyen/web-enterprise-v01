using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.IO;
using WebEnterprise_mssql.Configuration;
using Microsoft.Extensions.Configuration;
using System.Security.Permissions;

namespace WebEnterprise_mssql.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly IConfiguration configuration;
      
        public FileUploadController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> FileUploadAsync(List<IFormFile> files) {
            string path = configuration["FileConfig:filePath"];

            //Check if there is files or not
            if (files.Count().Equals(0))
            {
                return BadRequest(new {
                    errors = "File not Found!!!"
                });
            }

            long size = files.Sum(f => f.Length);
            

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var filePath = Path.Combine(path, formFile.FileName);
                    if (!Directory.Exists(path)) 
                    { 
                        Directory.CreateDirectory(path); 
                    }

                    using (var stream = new FileStream(filePath, FileMode.OpenOrCreate))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            return Ok(new { count = files.Count, size, path});
        }
    }
}
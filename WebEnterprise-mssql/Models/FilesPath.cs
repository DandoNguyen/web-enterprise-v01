using System;

namespace WebEnterprise_mssql.Models
{
    public class FilesPath
    {
        public Guid FilesPathID { get; set; }
        public string filePath { get; set; }
        public Guid PostId { get; set; }
        public virtual Posts Posts { get; set; }
    }
}
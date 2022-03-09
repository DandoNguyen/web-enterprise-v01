using System.Collections.Generic;

namespace WebEnterprise_mssql.Models
{
    public class Submissions
    {
        public string SubmissionId { get; set; }
        public string SubmissionName { get; set; }
        public string DescriptionSubmission { get; set; }
        public string ClosureDate { get; set; }
        public string FinalClosureDate { get; set; }

        public virtual ICollection<Posts> Posts { get; set; }
    }
}
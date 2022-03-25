namespace WebEnterprise_mssql.Dtos
{
    public class IndividualVoteResponse
    {
        public bool UpVote { get; set; }
        public bool DownVote { get; set; }
        public string Error { get; set; }
    }
}
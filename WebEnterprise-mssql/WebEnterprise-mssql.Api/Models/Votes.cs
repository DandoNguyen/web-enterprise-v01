using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;
using System.Collections;

namespace WebEnterprise_mssql.Api.Models
{
    public class Votes
    {
        [KeyAttribute]
        public Guid voteId { get; set; }

        public Guid postId { get; set; }
        public virtual Posts Posts { get; set; }
        public string userUpvote { get; set; }
        public string userDownVote { get; set; }

        // public ICollection<UpVote> UpVote { get; set; }
        // public ICollection<DownVote> DownVote { get; set; }

        // public List<string> upVoteList { get; set; }
        // public List<string> downVoteList { get; set; }
    }
}
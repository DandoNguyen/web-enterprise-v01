import React, { useEffect, useState } from 'react'
import './PostDetail.css'
import { Url } from '../URL'

function PostDetail({ setopendetail, data }) {
  const [isAnonymous] = useState(false)
  const [isChild] = useState(false)
  const [postCmt, setpostCmt] = useState([])
  const [postId, setpostId] = useState('')
  const [voteNumber, setvoteNumber] = useState([])
  const [comment, setcomment] = useState('')
  const [reloadpage, setreloadpage] = useState(false)
  // summit CMT
  const sumitcmnt = () => {
    setpostId(postId)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "postId": data.postId,
      "content": comment,
      "isAnonymous": isAnonymous,
      "isChild": isChild,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(Url + "/api/Comments", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setreloadpage(!reloadpage)
        alert('thanh cong')
      })
      .catch(error => console.log('error', error));
  }

  //cmt
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url + `/api/Comments/AllComments?PostId=${data.postId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setpostCmt(result)
      })
      .catch(error => console.log('error', error));
  }, [reloadpage])
  const Cmts = postCmt.map(data => (
    <div className="Titlcmt" key={data.commentId}>
      <span >{data.username}</span>
      <span >{data.createdDate}</span>
      <br />
      <span >{data.content}</span>
    </div>
  ))

  //vote
  const upvote = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "voteInput": true,
      "postId": data.postId
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(Url + "/api/Votes/voteBtnClick", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setreloadpage(!reloadpage)
      })
      .catch(error => console.log('error', error));
  }
  const downVote = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "voteInput": false,
      "postId": data.postId
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(Url + "/api/Votes/voteBtnClick", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setreloadpage(!reloadpage)
      })
      .catch(error => console.log('error', error));
  }
  //vote
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url + `/api/Votes/GetVoteStatusOfPost?postId=${data.postId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setvoteNumber(result)
      })
      .catch(error => console.log('error', error));
  }, [reloadpage])

  const download = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url + `/api/FileAction/GetFile?filePath=${data.filesPaths[0]}`, requestOptions)
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = data.filesPaths[0];
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert('your file has downloaded!'); // or you know, something with better UX...
    })
    .catch(() => alert('oh no!'));
  }
  return (
    <div className="modalBackground">
      <div className="modalPostContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => { setopendetail(false); }} > X </button>
        </div>
        <header>
          <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
          <div className="header_posts">
            <i className='bx bx-user-circle icon'></i>
            <div className="userposts_name">
              <span className="name_userposts">{data.username}</span>
              <div className='day'>
                <div className='day-sumit' type="date" >{data.createdDate}</div>
              </div>
            </div>
          </div>
        </header>
        <div className="Category">
          <span className="TopicName">{data.listCategoryName}</span>
        </div>
        <div className="TitlePost">
          <p className="TopicName">Title : {data.title}</p>
        </div>
        <div className="Content">
          <span className="TopicName">Content : {data.content}</span>
        </div>
        <div className="Desc">
          <span className="TopicName">Description : {data.desc}</span>
          <div className='showselectModal'>
            <select name="show" id="showid">
              <option value="Default">Choose your type of comments</option>
              <option value="Public">Public</option>
              <option value="Anonymously">Anonymously</option>
            </select>
          </div>
          <div className="iconsPost"  >
            <button className='btn' onClick={upvote} >
              <i className='bx bx-upvote'>
                <span className='like' >{voteNumber.upvoteCount}</span>
              </i>
            </button>
            <button className='btn' onClick={downVote}>
              <i className='bx bx-downvote'>
                <span className='dislike'>{voteNumber.downVoteCount}</span>
              </i>
            </button>
            <button className='btn'>
              <i className='bx bx-comment'>
                <span className='cmt'>12.5k</span>
              </i>
            </button>
            <span>
              <i className='bx bx-show-alt'>
                <span className='view'>{data.viewsCount}</span>
              </i>
            </span>
          </div>
          
            <button className='btn' onClick={download}>Download</button><span>{data.filesPaths[0]}</span>
        
          <div className="modalInput">
            <textarea placeholder='Write your comments here...' className="Commentbox" value={comment} onChange={e => setcomment(e.target.value)}></textarea>
            <button className='btn' onClick={sumitcmnt}>Summit</button>
          </div>
          {Cmts}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
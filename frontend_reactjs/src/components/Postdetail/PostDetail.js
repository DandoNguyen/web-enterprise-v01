import React, { useEffect, useState } from 'react'
import './PostDetail.css'
import { Url } from '../URL'

function PostDetail({ setopendetail, data }) {
  const [isChild] = useState(false)
  const [postCmt, setpostCmt] = useState([])
  const [postId, setpostId] = useState('')
  const [voteNumber, setvoteNumber] = useState([])
  const [comment, setcomment] = useState('')
  const [reloadpage, setreloadpage] = useState(false)
  const [Detail,setDetail]=useState([])
  const [getVoteStatus,setgetVoteStatus]=useState([])
  const [IsAnonymous] = useState([false,true]);
  const [getAnonymous,setgetAnonymous]=useState('')
  // const [getCmtId, setgetCmtId] = useState('')


  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://localhost:5001/api/Posts/PostDetail?postId=${data.postId}`, requestOptions)
      .then(response => response.json())
      .then(result => setDetail(result))
      .catch(error => console.log('error', error));
  }, [])
  // summit CMT
  const sumitcmnt = () => {
    setpostId(postId)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "postId": data.postId,
      "content": comment,
      "isAnonymous": getAnonymous,
      "isChild": isChild,
      // "parentId": getCmtId
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
  
  // const handelReply = (data) =>{
  //   setgetCmtId(data.commentId)
  //   setChild(!isChild)
  // }
  const Cmts = postCmt.map(dataCmt => (
    <div className="Titlcmt" key={dataCmt.commentId}>
      {dataCmt.isAnonymous === false? 
      <span className='usernamecmt'>{dataCmt.username}</span>:
      <span className='usernamecmt'>Anonymous</span>
      }
      <br />
      <span className='contentcmt'>{dataCmt.content}</span>
      {/* <button onClick={() => handelReply(data)}>Reply</button> */}
      <br/>
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
        setvoteNumber(result)
      })
      .catch(error => console.log('error', error));
  }, [reloadpage])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url + `/api/Votes/GetUserVoteStatus?postId=${data.postId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setgetVoteStatus(result)
      })
      .catch(error => console.log('error', error));
  }, [reloadpage])
  
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
              <span className="name_userposts">{Detail.username}</span>
              <div className='day'>
                <div className='day-sumit' type="date" >{Detail.createdDate}</div>
              </div>
            </div>
          </div>
        </header>
        <div className="Category">
          <span className="TopicName">{Detail.listCategoryName}</span>
        </div>
        <div className="TitlePost">
          <p className="TopicName">Title : {Detail.title}</p>
        </div>
        <div className="Content">
          <span className="TopicName">Content : {Detail.content}</span>
        </div>
        <div className="Desc">
          <span className="TopicName">Description : {Detail.desc}</span>
          <div className='showselectModal'>
            {/* <select name="show" id="showid">
              <option value="Default">Choose your type of comments</option>
              <option value="Public">Public</option>
              <option value="Anonymously">Anonymously</option>
            </select> */}
            <select name="posttyle" id="posttyle" value={getAnonymous} onChange={e => setgetAnonymous(e.target.value)}>
                <option value=''>Choose your type of comments</option>
                <option value={IsAnonymous[0]}   >public</option>
                <option  value={IsAnonymous[1]}  >Anonymously</option>
            </select>
          </div>
          <div className="iconsPost"  >
          {getVoteStatus.upVote === true ? 
            <button className='bt btn1' onClick={upvote} >
            <i className='bx bx-upvote bx1'>
              <span className='like' >{voteNumber.upvoteCount}</span>
            </i>
          </button>:
          <button className='bt' onClick={upvote} >
          <i className='bx bx-upvote'>
            <span className='like' >{voteNumber.upvoteCount}</span>
          </i>
          </button>
          }
          {getVoteStatus.downVote === true ?
            <button className='bt btn1' onClick={downVote}>
              <i className='bxd bx bx-downvote bx1'>
                <span className='dislike'>{voteNumber.downVoteCount}</span>
              </i>
            </button>:
            <button className='bt' onClick={downVote}>
            <i className='bxd bx bx-downvote'>
              <span className='dislike'>{voteNumber.downVoteCount}</span>
            </i>
          </button>
          }
            <span>
              <i className='bx bx-show-alt'>
                <span className='view'>{Detail.viewsCount}</span>
              </i>
            </span>
          </div>
          <div className="modalInput">
            <textarea placeholder='Write your comments here...' className="Commentbox" value={comment} onChange={e => setcomment(e.target.value)}></textarea>
            <button className='btn' onClick={sumitcmnt}>Summit</button>
          </div>
          {Cmts}
          {/* { isChild &&
          <div>
          <input></input><button >Summit</button>
          </div>
          } */}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
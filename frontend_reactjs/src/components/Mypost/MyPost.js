import React, { useState, useEffect } from 'react';
import './MyPost.css';
// import ModalPost from './ModalPost';
import ModalReason from './Reason/ModalReason';
import Navbar from '../Navbar';


function MyPost({user}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [allmypost, setallmypost] = useState([])
    const [content,setcontent] = useState('')

    
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://localhost:5001/api/Posts/MyPost", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setallmypost(data)
            })
            .catch(error => console.log('error', error));
    }, [])


    const listmypost = allmypost.map(data => (
        <div className="PostContainer" key={data.postId}>
            <div className="titleCloseBtn">
            </div>
            <header id='header'>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
                <div className="header_posts">
                    <i className='bx bx-user-circle icon'></i>
                    <div className="userposts_name">
                        <span className="name_userposts">{data.username}</span>
                        <div className='day'>
                            <div className='day-sumit'>{data.createdDate}</div>
                        </div>
                    </div>
                </div>
                <div className='Status'>
                    <button className='RJbutton' onClick={() => { setModalOpen(true); }}>Rejected</button>
                    {modalOpen && <ModalReason setOpenModal={setModalOpen} />}
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

                <div className="iconsPost">
                    <button className='btn'>
                        <i className='bx bx-upvote'>
                            <span className='like'>12.5k</span>
                        </i>
                    </button>
                    <button className='btn'>
                        <i className='bx bx-downvote' >
                            <span className='dislike'>12.5k</span>
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
                <div className='showselectModal'>
                    <select name="show" id="showid">
                        <option value="Default">Choose your type of comments</option>
                        <option value="Public">Public</option>
                        <option value="Anonymously">Anonymously</option>
                    </select>
                </div>
            </div>
            <div className="modalInput">
                <textarea className="Commentbox">Write your comments here...</textarea>
                {/* <button className='btn' onClick={sumitcmnt}>Summit</button> */}
            </div>
        </div>
    ))
    // const sumitcmnt = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    //     myHeaders.append("Content-Type", "text/plain");

    //     var raw = JSON.stringify({
    //         "postId": allmypost.postId,
    //         "userId": user.userId,
    //         "content": content,
    //         "isAnonymous": true,
    //         "createdDate": allmypost.createdDate,
    //         "lastModifiedDate": allmypost.lastModifiedDate,
    //         // "previousCommentId": "string",
    //         // "isChild": true,
    //         // "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    //       });

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch("https://localhost:5001/api/Comments", requestOptions)
    //         .then(response => response.json())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // }
    return <div>
        <Navbar />
        <section className="home">
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
            <div className="text">
                <button className='Allbtn'>All</button>
                <button className='Pendingbtn'>Pending</button>
                <button className='Approvedbtn'>Approved</button>
                <button className='Rejectedbtn'>Rejected</button>
                <div className='showselect'>
                    <select name="show" id="showid">
                        <option value="Show1">Show 1</option>
                        <option value="Show2">Show 2</option>
                    </select>
                </div>
            </div>
            <body>
                {listmypost}
            </body>
        </section>
    </div>
}

export default MyPost;

import React from "react";
import "../css/ModalPost.css";
import Navbar from './Navbar';


function ModalPost({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalPostContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModal(false);}} > X </a>
        </div>
        <header>
        <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
        <div className="header_posts">
        <i className='bx bx-user-circle icon'></i>
            <div className="userposts_name">
                <span className="name_userposts">Author Name</span>
                <div className='day'>
                    <div className='day-sumit'>02/03/2022</div>
                    
                </div>
            </div>
            
           
        </div>
        </header>
        <div className="Category">
        <span className="TopicName">Plapla</span>
        </div>
        <div className="TitlePost">
        <p className="TopicName">Title............................................................................................................................................................................................................</p>
        
        </div>
        {/* <div className="ex1">This is title</div> */}
        <div className="Content">
        <span className="TopicName">Content.......................................................................................................................................................................................................................................................................</span>
        </div>
        <div className="Desc">
        <span className="TopicName">Description....................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................</span>
        
        <div className="iconsPost">
            <a href="#">
                <i className='bx bx-upvote'>
                    <span className='like'>12.5k</span>
                </i>
            </a>
            <a href="#">
                <i className='bx bx-downvote' >
                <span className='dislike'>12.5k</span>
                </i>
            </a>
            <a href="#">
                <i className='bx bx-comment'>
                <span className='cmt'>12.5k</span>
                </i>
            </a>
            <a href="#">
                <i className='bx bx-show-alt'>
                <span className='view'>12.5k</span>
                </i>
            </a>
        </div>
        <div className='showselectModal'>
            <select name="show" id="showid">
                <option value="Default">Choose your type of comments</option>
                <option value="Public">Public</option>
                <option value="Anonymously">Anonymously</option>
            </select>
            </div>
        </div>
        {/* <div className="modaltitle">TERMS AND POLICIES</div> */}
        <div className="modalInput">
            <textarea  className="Commentbox">Write your comments here...</textarea>
        </div>

        
        
        
      </div>
    // </div>
  );
}

export default ModalPost;
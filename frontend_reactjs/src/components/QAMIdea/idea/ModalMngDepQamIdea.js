import React from "react";
import "./ModalMngDepQamIdea.css";



function ModalMngDepQamIdea({ setOpenModalMngDepQamIdea }) {
  return (
    <div className="modalBackground">
      <div className="modalPostContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalMngDepQamIdea(false);}} > X </button>
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
        
        
        <div className='showselectModal'>
            <select name="show" id="showid">
                <option value="Default">Choose your type of comments</option>
                <option value="Public">Public</option>
                <option value="Anonymously">Anonymously</option>
            </select>
            </div>
        </div>

        <div className="Modalfooter">
        <button className="SubmitBtn">Approve</button>
          <button className="cancelBtn" onClick={() => {setOpenModalMngDepQamIdea(false);}} id="cancelBtn">Reject</button>
        </div>

        {/* <div className="modaltitle">TERMS AND POLICIES</div> */}
        <div className="modalInput">
            <textarea  className="Commentbox">Write your comments here...</textarea>
        </div>
      </div>
     </div>
  );
}

export default ModalMngDepQamIdea;
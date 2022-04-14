import React,{ useState } from 'react';
import '../css/MyPost.css';
// import ModalPost from './ModalPost';
import ModalReason from './ModalReason';
import Navbar from './Navbar';


function MyPost (){
    const [modalOpen, setModalOpen] = useState(false);
	return <div>
        <Navbar/>
        <section className="home">
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
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
    <div className="PostContainer">
        <div className="titleCloseBtn">
          {/* <a className="xbtn" onClick={() => {setOpenModal(false);}} > X </a> */}
        </div>
        <header id='header'>
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
        
        <div className='Status'>
        <button className='RJbutton' onClick={() => {setModalOpen(true);}}>Rejected</button>
      {modalOpen && <ModalReason setOpenModal={setModalOpen} />}
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



        
        
        
    {/* </div> */}
    </div>

    <div className="PostContainer">
        <div className="titleCloseBtn">
          {/* <a className="xbtn" onClick={() => {setOpenModal(false);}} > X </a> */}
        </div>
        <header id='header'>
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
        
        <div className='Status'>
        <button className='APbutton' onClick={() => {setModalOpen(true);}}>Approved</button>
      {modalOpen && <ModalReason setOpenModal={setModalOpen} />}
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



        
        
        
    {/* </div> */}
    </div>


    <div className="PostContainer">
        <div className="titleCloseBtn">
          {/* <a className="xbtn" onClick={() => {setOpenModal(false);}} > X </a> */}
        </div>
        <header id='header'>
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
        
        <div className='Status'>
        <button className='PDbutton' >Pending</button>
      
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



        
        
        
    {/* </div> */}
    </div>

    
</section>
    </div>
}
{/* <script>
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
</script> */}
export default MyPost;

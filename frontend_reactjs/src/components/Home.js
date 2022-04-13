import React,{ useState } from 'react';
import '../css/Home.css';
// import ModalPost from './ModalPost';
import Navbar from './Navbar';


function Home (){
    const [modalOpen, setModalOpen] = useState(false);
	return <div>
        <Navbar/>
        <section className="home">
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
    <div className="text">
        <button className='Newbtn'>New</button>
        <button className='Mostpplbtn'>Most Popular</button>
        <button className='Mostvbtn'>Most Viewed</button>
        <button className='cmtbtn'>Last Comments</button>
        <div className='showselect'>
            <select name="show" id="showid">
                <option value="Show1">Show 1</option>
                <option value="Show2">Show 2</option>
            </select>
            </div>
    </div>
    {/* copy từ đây */}
    {/* <div className="modalBackground"> */}
      <div className="PostContainer">
        <div className="titleCloseBtn">
          {/* <a className="xbtn" onClick={() => {setOpenModal(false);}} > X </a> */}
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
        
        {/* đây là div chứa files */}
        <div className='files'>

        </div>
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



        
        
        
    {/* </div> */}
    </div>
    {/* <div className="posts">
        <div className="header_posts">
            <div className="userposts_name">
                <span className="name_userposts">Greenwich</span>
                <div className='day'>
                    <div className='day-sumit'>02/03/2022</div>
                    <span className='Mode'>public</span>
                </div>
            </div>
            <a href="#" className="title-posts">List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.</a>
        </div>
        <div className="icons">
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

        
                <i className='viewDetail'>
                <button className='viewDetail'onClick={() => {setModalOpen(true);}}>Submit</button>
                {modalOpen && <ModalPost setOpenModal={setModalOpen} />}
                </i>
            
            
        </div>
    </div> */}
    {/* <div className="posts">
        <div className="header_posts">
            <div className="userposts_name">
                <span className="name_userposts">Greenwich</span>
                <div className='day'>
                    <div className='day-sumit'>02/03/2022</div>
                    <span className='Mode'>public</span>
                </div>
            </div>
            <a href="#" className="title-posts">List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.</a>
        </div>
        <div className="icons">
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
            <span>
                <i class='bx bx-show-alt'>
                <span className='view'>12.5k</span>
                </i>
            </span>
        </div>
    </div>

    <div className="posts">
        <div className="header_posts">
            <div className="userposts_name">
                <span className="name_userposts">Greenwich</span>
                <div className='day'>
                    <div className='day-sumit'>02/03/2022</div>
                    <span className='Mode'>public</span>
                </div>
            </div>
            <a href="#" className="title-posts">List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.</a>
        </div>
        <div className="icons">
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
            <span>
                <i class='bx bx-show-alt'>
                <span className='view'>12.5k</span>
                </i>
            </span>
        </div>
    </div> */}
</section>
    </div>
}

export default Home;

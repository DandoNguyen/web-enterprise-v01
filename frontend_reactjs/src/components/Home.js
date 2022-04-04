import React from 'react';
import '../css/Home.css';
import Navbar from './Navbar';


function Home (){
	return <div>
        <Navbar/>
    <section className="home">
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>

    <div className="text">HOME PAGE</div>
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
        <div className="icons posts-icon">
            <button className='btldc'>
                <i className='bx bx-upvote'>
                    <span className='like'>12.5k</span>
                </i>
            </button>
            <button className='btldc'>
                <i className='bx bx-downvote' >
                <span className='dislike'>12.5k</span>
                </i>
            </button>
            <button className='btldc'>
                <i className='bx bx-comment'>
                <span className='cmt'>12.5k</span>
                </i>
            </button>
            <span>
                <i className='bx bx-show-alt'>
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
        <div className="icons posts-icon">
            <button className='btldc'>
                <i className='bx bx-upvote'>
                    <span className='like'>12.5k</span>
                </i>
            </button>
            <button className='btldc'>
                <i className='bx bx-downvote' >
                <span className='dislike'>12.5k</span>
                </i>
            </button>
            <button className='btldc'>
                <i className='bx bx-comment'>
                <span className='cmt'>12.5k</span>
                </i>
            </button>
            <span>
                <i className='bx bx-show-alt'>
                <span className='view'>12.5k</span>
                </i>
            </span>
        </div>
    </div>
</section>
    </div>
}

export default Home;

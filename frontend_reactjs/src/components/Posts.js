import React from 'react';
import './Post.css';
import './Homepage.css';

const Posts = () => {
  return (
        <section className="home">
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
            <div className="text">HOME PAGE</div>
            <div className="posts">
                <div className="header_posts">
                    <span className="user_image">
                        <img  src="https://therightustorage.blob.core.windows.net/assets/University/B109_greenwich_logo.jpg" alt=""/>
                    </span>
                    <div className="userposts_name">
                        <span className="name_userposts">Greenwich</span>
                        <div className='day'>
                            <div className='day-sumit'>02/03/2022</div>
                            <span className='Mode'>public</span>
                        </div>
                    </div>
                </div>
                <div className="title-posts">List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.</div>
                <div className="icons">
                    <a href="#">
                        <i className='bx bxs-like'></i>
                    </a>
                    <a href="#">
                        <i className='bx bxs-dislike' ></i>
                    </a>
                    <a href="#">
                        <i className='bx bxs-comment' ></i>
                    </a>
                </div>
            </div>
        </section>
  )
}

export default Posts
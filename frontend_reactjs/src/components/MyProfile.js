import React,{ useState } from 'react';
import '../css/MyProfile.css';
// import ModalPost from './ModalPost';
import Navbar from './Navbar';


function MyProfile (){
    const [modalOpen, setModalOpen] = useState(false);
	return <div>
        <Navbar/>
        <section className="homeMyIn4">
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
    {/* <div className="text">
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
    </div> */}
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
        <div className="ContainIcon">
        <i className='bx bx-user-circle icon' style={{fontSize: "200px"}}></i>
        </div>
    {/* copy từ đây */}
    {/* <div className="modalBackground"> */}
      <div className="PostContainerMyIn4">
        {/* <div className="titleCloseBtn">
          
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
        </header> */}
        {/* <div className="Category">
        <span className="TopicName">Plapla</span>
        </div> */}
        <div className="In4">
        <span className="TopicName">Full Name: </span>
        
        </div>
    
        <div className="In4">
        <span className="TopicName">Employee ID: </span>
        </div>
        <div className="In4">
        <span className="TopicName">Date of Birth: </span>
        {/* đây là div chứa files */}
        </div>
        <div className="In4">
        <span className="TopicName">Address: </span>
        
        </div>
    
        <div className="In4">
        <span className="TopicName">Position: </span>
        </div>
        <div className="In4">
        <span className="TopicName">Department: </span>
        {/* đây là div chứa files */}
        </div>
        

        

        
   
    </div>




    
    
</section>
    </div>
}

export default MyProfile;

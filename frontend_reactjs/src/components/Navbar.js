import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';


function Navbar() {
  return (
        <div>
            <nav className="sidebar ">
                <header>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
                    
                    <div className="image-text">
                        <span className="image">
                        <img  className="https://i.pinimg.com/736x/7f/3b/b8/7f3bb8ca1c26444e3f87281bee19b42f.jpg" alt="" />
                        </span>

                        <div className="text logo-text">
                            <span className="name-user">Ho Phuong Nam</span>
                            <span className="profession">GCS18027</span>
                        </div>
                    </div>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <li className="search-box">
                            <i className='bx bx-search icon'></i>
                            <input className="text" placeholder="Search..." />
                        </li>
{/* Đây là role Staff */}
                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link to='/Home'>
                                <i class='bx bx-home icon' ></i>
                                
                                <span  className="text nav-text">Home Page</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/MyProfile'>
                                <i class='bx bx-user-circle icon' ></i>
                                <span className="text nav-text">My Profile</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Notifications</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-upload icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                        

                            <li className="nav-link">
                                <Link to='/MyPost'>
                                <i class='bx bx-id-card icon' ></i>
                                    <span className="text nav-text">My Post</span>
                                </Link>
                            </li>

                            

                            <li className="nav-link">
                                <Link to='/AboutUs'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">About Company</span>
                                </Link>
                            </li>
                            
                            
                          
                           
                        </ul>
                    </div>
{/* Đây là role Admin */}
                    {/* <ul className="menu-links">
                            <li className="nav-link">
                                <Link to='/Home'>
                                <i class='bx bx-home icon' ></i>
                                <span  className="text nav-text">Home Page</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/MyProfile'>
                                <i class='bx bx-user-circle icon' ></i>
                                <span className="text nav-text">My Profile</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/ManageAccount'>
                                <i class='bx bx-cog icon'></i>
                                <span className="text nav-text">Manage System </span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Notifications</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-upload icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/#'>
                                <i class='bx bx-pie-chart-alt-2 icon'></i>
                                <span className="text nav-text">Statistical</span>
                                </Link>
                            </li>
                        

                            <li className="nav-link">
                                <Link to='/MyPost'>
                                <i class='bx bx-id-card icon' ></i>
                                    <span className="text nav-text">My Post</span>
                                </Link>
                            </li>


                            <li className="nav-link">
                                <Link to='/AboutUs'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">About Company</span>
                                </Link>
                            </li>
                        </ul> */}
                    
{/* Đây là role QAC */}
                        {/* <ul className="menu-links">
                            <li className="nav-link">
                                <Link to='/Home'>
                                <i class='bx bx-home icon' ></i>
                                <span  className="text nav-text">Home Page</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/MyProfileStaff'>
                                <i class='bx bx-user-circle icon' ></i>
                                <span className="text nav-text">My Profile</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/ManageDepartmentAccount'>
                                <i class='bx bx-network-chart icon'></i>
                                <span className="text nav-text">Manage Department </span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Notifications</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-upload icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/#'>
                                <i class='bx bx-pie-chart-alt-2 icon'></i>
                                <span className="text nav-text">Statistical</span>
                                </Link>
                            </li>
                        

                            <li className="nav-link">
                                <Link to='/MyPost'>
                                <i class='bx bx-id-card icon' ></i>
                                    <span className="text nav-text">My Post</span>
                                </Link>
                            </li>


                            <li className="nav-link">
                                <Link to='/AboutUs'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">About Company</span>
                                </Link>
                            </li>
                        </ul> */}

{/* Đây là role QAM */}

                        {/* <ul className="menu-links">
                            <li className="nav-link">
                                <Link to='/Home'>
                                <i class='bx bx-home icon' ></i>
                                <span  className="text nav-text">Home Page</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/MyProfile'>
                                <i class='bx bx-user-circle icon' ></i>
                                <span className="text nav-text">My Profile</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/ManageDepartmentQamAccount'>
                                <i class='bx bx-cog icon'></i>
                                <span className="text nav-text">Manage Department </span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/ManageCategory'>
                                <i class='bx bx-category icon'></i>
                                <span className="text nav-text">Manage Category </span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Notifications</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-upload icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/#'>
                                <i class='bx bx-pie-chart-alt-2 icon'></i>
                                <span className="text nav-text">Statistical</span>
                                </Link>
                            </li>
                        

                            <li className="nav-link">
                                <Link to='/MyPost'>
                                <i class='bx bx-id-card icon' ></i>
                                    <span className="text nav-text">My Post</span>
                                </Link>
                            </li>


                            <li className="nav-link">
                                <Link to='/AboutUs'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">About Company</span>
                                </Link>
                            </li>
                        </ul> */}
                        
                    <div className="bottom-content">
                        <li className="">
                            <Link to="/Login">
                                <i className='bx bx-log-out icon' ></i>
                                <span className="text nav-text">Logout</span>
                            </Link>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
     )
}

export default Navbar
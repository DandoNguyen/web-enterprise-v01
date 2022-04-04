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

                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link to='/Home'>
                                <i className='bx bx-home-alt icon' ></i>
                                <span  className="text nav-text">Home Page</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-bar-chart-alt-2 icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Notifications</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-pie-chart-alt icon' ></i>
                                    <span className="text nav-text">All My Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/Management'>
                                    <i className='bx bx-heart icon' ></i>
                                    <span className="text nav-text">Management</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='About'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">About-Company</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    

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
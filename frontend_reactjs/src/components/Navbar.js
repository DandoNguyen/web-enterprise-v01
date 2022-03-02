import React from 'react';
import Homepage from './Homepage';
import './Navbar.css';

const Navbar = () => {
  return (
        <div>
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
            <nav className="sidebar ">
                <header>
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
                                <a href="#">
                                <i className='bx bx-home-alt icon' ></i>
                                <span className="text nav-text">Home Page</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                <i className='bx bx-bar-chart-alt-2 icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Notifications</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className='bx bx-pie-chart-alt icon' ></i>
                                    <span className="text nav-text">All My Idea</span>
                                </a>
                            </li>

                            <li className="nav-link">
                                <a href="#">
                                    <i className='bx bx-heart icon' ></i>
                                    <span className="text nav-text">Likes</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <a href="#">
                                <i className='bx bx-log-out icon' ></i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
  )
}

export default Navbar
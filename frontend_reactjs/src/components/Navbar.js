import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';



function Navbar() {
    const [user, setuser] = useState([]);
    const [userrole, setuserrole] = useState([])
    const token = localStorage.getItem("accessToken");
    const Navigate = useNavigate();
    useEffect(() => {
        loadDataProfile()
    }, [token])
    const loadDataProfile = () => {
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://localhost:5001/api/AuthManagement/GetUser", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status)
                }
            })
            .then(result => {
                setuser(result)
                setuserrole(result.role)
                console.log(result);
                // result.role.map(data => {
                //     arrayauth.push(data)
                // })
                // console.log(arrayauth[0]);
            })
            .catch(error => {
                console.log('error', error)
                logout()
            });
    }


    const logout = () => {
        localStorage.removeItem("accessToken")
        Navigate('/')
        // props.onLogoutSuccess()
    }

    // console.log(user.role);
    let Navbarrole
    if (userrole[1] === 'Admin') {
        Navbarrole = (
            <div className="menu">

                <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input className="text" placeholder="Search..." />
                </li>

                <ul className="menu-links">
                    <li className="nav-link">
                        <Link to='/Home'>
                            <i className='bx bx-home icon' ></i>
                            <span className="text nav-text">Home Page</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/MyProfile'>
                            <i className='bx bx-user-circle icon' ></i>
                            <span className="text nav-text">My Profile</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/ManageAccount'>
                            <i className='bx bx-cog icon'></i>
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
                            <i className='bx bx-pie-chart-alt-2 icon'></i>
                            <span className="text nav-text">Statistical</span>
                        </Link>
                    </li>


                    <li className="nav-link">
                        <Link to='/MyPost'>
                            <i className='bx bx-id-card icon' ></i>
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
        )
    } else if (userrole[0] === 'Staff') {
        Navbarrole = (
            <div className="menu">
                <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input className="text" placeholder="Search..." />
                </li>
                <ul className="menu-links">
                    <li className="nav-link">
                        <Link to='/Home'>
                            <i className='bx bx-home icon' ></i>
                            <span className="text nav-text">Home Page</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to='/MyProfile'>
                            <i className='bx bx-user-circle icon' ></i>
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
                            <i className='bx bx-id-card icon' ></i>
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
        )
    } else if (userrole[0] === 'QAC') {
        Navbarrole = (
            <div className="menu">
                <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input className="text" placeholder="Search..." />
                </li>
                <ul className="menu-links">
                    <li className="nav-link">
                        <Link to='/Home'>
                            <i className='bx bx-home icon' ></i>
                            <span className="text nav-text">Home Page</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to='/MyProfileStaff'>
                            <i className='bx bx-user-circle icon' ></i>
                            <span className="text nav-text">My Profile</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to='/ManageDepartmentAccount'>
                            <i className='bx bx-network-chart icon'></i>
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
                            <i className='bx bx-pie-chart-alt-2 icon'></i>
                            <span className="text nav-text">Statistical</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link to='/MyPost'>
                            <i className='bx bx-id-card icon' ></i>
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
        )
    } else if (userrole[0] === 'QAM') {
        Navbarrole = (
            <div className="menu">
                <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input className="text" placeholder="Search..." />
                </li>
                <ul className="menu-links">
                    <li className="nav-link">
                        <Link to='/Home'>
                            <i className='bx bx-home icon' ></i>
                            <span className="text nav-text">Home Page</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/MyProfile'>
                            <i className='bx bx-user-circle icon' ></i>
                            <span className="text nav-text">My Profile</span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/ManageDepartmentQamAccount'>
                            <i className='bx bx-cog icon'></i>
                            <span className="text nav-text">Manage Department </span>
                        </Link>
                    </li>

                    <li className="nav-link">
                        <Link to='/ManageCategory'>
                            <i className='bx bx-category icon'></i>
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
                            <i className='bx bx-pie-chart-alt-2 icon'></i>
                            <span className="text nav-text">Statistical</span>
                        </Link>
                    </li>


                    <li className="nav-link">
                        <Link to='/MyPost'>
                            <i className='bx bx-id-card icon' ></i>
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
        )
    }

    return (
        <div>
            <nav className="sidebar ">
                <header>
                    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet' />
                    <div className="image-text">
                        <div className="text logo-text" >
                            <span className="name-user">{user.username}</span>
                            <span className="profession">{user.email}</span>

                        </div>
                    </div>
                </header>
                <div className="menu-bar">
                    {Navbarrole}
                    <div className="bottom-content">
                        <li className="">
                            <Link to="/">
                                <i className='bx bx-log-out icon' ></i>
                                <span className="text nav-text" onClick={logout}>Logout</span>
                            </Link>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
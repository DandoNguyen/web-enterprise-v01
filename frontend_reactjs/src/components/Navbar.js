import React,{useEffect,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';



function Navbar(props) {
    const [user,setuser] = useState({})
    const token = localStorage.getItem("accessToken")
    const Navigate = useNavigate()
    useEffect(() => {
        loadDataProfile()
    },[token])
    const loadDataProfile = () => {
        var myHeaders = new Headers();
        
        myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
    
            fetch("https://localhost:5001/api/AuthManagement/GetUser", requestOptions)
            .then(response => {
                if (response.ok){
                    return response.json()
                }else{
                    throw new Error(response.status)
                }
            })
            .then(result => {
                console.log(result)
                setuser(result)
            })
            .catch(error => {
                console.log('error', error)
                logout()
            });
    }

    
    const logout =() =>{
       localStorage.removeItem("accessToken")
       Navigate('/', { replace: true })
        // props.onLogoutSuccess()
    }
    let Navbarrole
    if (user.role === ['Admin'] || user.role === ['qa-manager']){
        Navbarrole= (
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
                                <Link to='/Profile'>
                                <i className='bx bx-home-alt icon' ></i>
                                <span  className="text nav-text">Profile</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-bar-chart-alt-2 icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/Category'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Category</span>
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
                                <Link to='/Topic'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">Topic</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
        )
    } else {
        Navbarrole=(
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
                                <Link to='/Profile'>
                                <i className='bx bx-home-alt icon' ></i>
                                <span  className="text nav-text">Profile</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link to='/UploadIdea'>
                                <i className='bx bx-bar-chart-alt-2 icon' ></i>
                                <span className="text nav-text">Upload Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/Category'>
                                    <i className='bx bx-bell icon'></i>
                                    <span className="text nav-text">Category</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='#'>
                                    <i className='bx bx-pie-chart-alt icon' ></i>
                                    <span className="text nav-text">All My Idea</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link to='/Topic'>
                                    <i className='bx bx-buildings icon' ></i>
                                    <span className="text nav-text">Topic</span>
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
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
                    <div className="image-text">
                        <span className="image">
                        <img  className="https://i.pinimg.com/736x/7f/3b/b8/7f3bb8ca1c26444e3f87281bee19b42f.jpg" alt="" />
                        </span>

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
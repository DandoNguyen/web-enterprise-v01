import React from 'react';
import './Homepage.css';
import Navbar from './Navbar';
import Posts from './Posts';
const Homepage = () => {
  return (
    <div>
        <div>
            <Navbar/>
            <Posts/>
        </div>
    </div>
    
  )
}

export default Homepage
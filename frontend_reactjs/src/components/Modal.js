import React,{ useState } from "react";
import "../css/Modal.css";
import {  useNavigate } from 'react-router-dom';

function Modal({ setOpenModal }) {
  const [Email,setEmail]=useState('');
  const [username,setUsername]=useState('');
  const [passwork,setPasswork]=useState('');
  const registration = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": username,
      "email": Email,
      "password": passwork
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/api/AuthManagement/Register", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.jwttoken.success){
          alert("thanh cong")
        }else{
          alert("errroeeee")
        }
      })
      .catch(error => console.log('error', error));

  }
  
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModal(false);}} > X </button>
        </div>
        <div className="modaltitle">Add User</div>
        <div className="modalinput">
            <span className="inputtitle">Email</span>
            <br/>
            <input className="inputvl" value={Email} onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">User name</span>
            <br/>
            <input className="inputvl" value={username} onChange={e => setUsername(e.target.value)} ></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Password</span>
            <br/>
            <input className="inputvl" value={passwork} onChange={e => setPasswork(e.target.value)} ></input>
        </div>
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModal(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={registration}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal
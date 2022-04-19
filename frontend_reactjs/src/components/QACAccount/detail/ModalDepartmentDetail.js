import React from "react";
import "./ModalDepartmentDetail.css";


function ModalDepartmentDetail({ setOpenModalDepartmentDetail }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalDepartmentDetail(false);}} > X </button>
        </div>
        <div className="modaltitle">Account Detail</div>
        
        <div className="modalinput">
            <span className="inputtitle">Full Name</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Employee ID</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Email</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">User name</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Password</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Role</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Department</span>
            <br/>
            <input readOnly className="inputvl"></input>
        </div>
      </div>
    </div>
  );
}

export default ModalDepartmentDetail
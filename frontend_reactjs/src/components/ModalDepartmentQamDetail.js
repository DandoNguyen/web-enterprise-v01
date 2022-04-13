import React from "react";
import "../css/ModalDepartmentQamDetail.css";

function ModalDepartmentQamDetail({ setOpenModalDepartmentQamDetail }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDepartmentQamDetail(false);}} > X </a>
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

export default ModalDepartmentQamDetail
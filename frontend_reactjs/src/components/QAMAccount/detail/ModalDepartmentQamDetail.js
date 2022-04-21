import React from "react";
import "./ModalDepartmentQamDetail.css";

function ModalDepartmentQamDetail({ setOpenModalDepartmentQamDetail , data }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalDepartmentQamDetail(false);}} > X </button>
        </div>
        <div className="modaltitle">Account Detail</div>
        
        <div className="modalinput">
            <span className="inputtitle">Full Name : {data.fullname}</span>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Employee ID : {data.dob}</span>
            <br/>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Email : {data.email}</span>
            <br/>
        </div>
        <div className="modalinput">
            <span className="inputtitle">User name : {data.userName}</span>
            <br/>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Role : {data.RoleName}</span>
            <br/>
        </div>
      </div>
    </div>
  );
}

export default ModalDepartmentQamDetail
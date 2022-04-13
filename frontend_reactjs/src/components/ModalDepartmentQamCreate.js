import React from "react";
import "../css/ModalDepartmentQamCreate.css";

function ModalDepartmentQamCreate({ setOpenModalDepartmentQamCreate }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDepartmentQamCreate(false);}} > X </a>
        </div>
        <div className="modaltitle">Create Department</div>
        <div className="modalinput">
            <span className="inputtitle">Department Name</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalDepartmentQamCreate(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDepartmentQamCreate
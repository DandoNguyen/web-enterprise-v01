import React from "react";
import "../css/ModalDeadlineDelete.css";

function ModalDeadlineDelete({ setOpenModalDeadlineDelete }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDeadlineDelete(false);}} > X </a>
        </div>
        <div className="modaltitle">DO YOU WANT TO DELETE THIS DEADLINE</div>
        
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalDeadlineDelete(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confrim</button>
        </div>
       
      </div>
    </div>
  );
}

export default ModalDeadlineDelete
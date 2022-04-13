import React from "react";
import "../css/ModalManageDelete.css";

function ModalManageDelete({ setOpenModalDelete }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDelete(false);}} > X </a>
        </div>
        <div className="modaltitle">DO YOU WANT TO DELETE THIS ACCOUNT</div>
        
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalDelete(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confrim</button>
        </div>
       
      </div>
    </div>
  );
}

export default ModalManageDelete
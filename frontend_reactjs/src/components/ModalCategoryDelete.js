import React from "react";
import "../css/ModalCategoryDelete.css";

function ModalCategoryDelete({ setOpenModalCategoryDelete }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalCategoryDelete(false);}} > X </a>
        </div>
        <div className="modaltitle">DO YOU WANT TO DELETE THIS CATEGORY</div>
        
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalCategoryDelete(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confrim</button>
        </div>
       
      </div>
    </div>
  );
}

export default ModalCategoryDelete
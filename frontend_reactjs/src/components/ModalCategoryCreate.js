import React from "react";
import "../css/ModalCategoryCreate.css";

function ModalCategoryCreate({ setOpenModalCategoryCreate }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalCategoryCreate(false);}} > X </a>
        </div>
        <div className="modaltitle">Create New Category</div>
        <div className="modalinput">
            <span className="inputtitle">Category Name</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Description</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalCategoryCreate(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCategoryCreate
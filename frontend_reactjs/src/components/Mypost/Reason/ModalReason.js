import React from "react";
import "./ModalReason.css";

function ModalReason({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModal(false);}} > X </a>
        </div>
        <div className="modaltitle">FEEDBACK</div>
        <div className="modalinput1">
            <textarea readOnly className="inputvl2">This box will contains content feedback reason</textarea>
        </div>
      </div>
     </div>
  );
}

export default ModalReason;
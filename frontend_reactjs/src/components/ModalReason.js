import React from "react";
import "../css/ModalReason.css";

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
        {/* <div className="checkbox">
        <input type="checkbox" id="1" nameClass="1"/>
        <label for=""> I UNDERSTAND AND AGREE WITH TERMS AND POLICIES</label>
        </div>
         */}
          {/* <button className="SubmitBtn1" onClick={() => {setOpenModal(false);}} id="SubmitBtn1">Submit</button> */}
          
          {/* <button className="SubmitBtn">Submit</button> */}
        
      </div>
     </div>
  );
}

export default ModalReason;
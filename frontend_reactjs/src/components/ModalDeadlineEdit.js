import React from "react";
import "../css/ModalDeadlineEdit.css";

function ModalDeadlineEdit({ setopenModalDeadlineEdit}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setopenModalDeadlineEdit(false);}} > X </a>
        </div>
        <div className="modaltitle">Edit Deadline</div>
        
        <div className="modalinput">
            <span className="inputtitle">Deadline Title</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Closure Date</span>
            <br/>
            <input type = "date" className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Final Closure Date</span>
            <br/>
            <input type = "date" className="inputvl"></input>
        </div>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setopenModalDeadlineEdit(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeadlineEdit
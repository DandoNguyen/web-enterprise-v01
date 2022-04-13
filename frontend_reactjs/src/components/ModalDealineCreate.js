import React from "react";
import "../css/ModalDeadlineCreate.css";

function ModalDeadlineCreate({ setOpenModalDeadlineCreate }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDeadlineCreate(false);}} > X </a>
        </div>
        <div className="modaltitle">Add Deadline</div>
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
          <button className="cancelBtn" onClick={() => {setOpenModalDeadlineCreate(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeadlineCreate
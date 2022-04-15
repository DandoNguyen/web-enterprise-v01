import React from "react";
import "./ModalManageEdit.css";

function ModalManageEdit({ setopenModalManageEdit}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setopenModalManageEdit(false);}} > X </a>
        </div>
        <div className="modaltitle">Edit User</div>
        
        <div className="modalinput">
            <span className="inputtitle">Full Name</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Employee ID</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Email</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">User name</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Password</span>
            <br/>
            <input className="inputvl"></input>
        </div>

        <div className='styleofpost'>
            <select name="posttyle" id="posttyle">
                <option value="public">1</option>
                <option value="private">2</option>
            </select>
            </div>

            <div className='styleofcategory'>
            <select name="posttyle" id="posttyle">
                <option value="public">2</option>
                <option value="private">1</option>
            </select>
            </div>

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setopenModalManageEdit(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ModalManageEdit
import React from 'react'

function ModalEditTag(setOpenModalEditTopic) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalEditTopic(false);}} > X </button>
        </div>
        <div className="modaltitle">Add User</div>
        <div className="modalinput">
            <span className="inputtitle">Email</span>
            <br/>
            <input className="inputvl" ></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">User name</span>
            <br/>
            <input className="inputvl" ></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Password</span>
            <br/>
            <input className="inputvl"  ></input>
        </div>
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalEditTopic(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ModalEditTag
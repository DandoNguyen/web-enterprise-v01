import React from "react";
import "../css/ModalDepartmentQamView.css";

function ModalDepartmentQamView({ setOpenModalDepartmentQamView }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDepartmentQamView(false);}} > X </a>
        </div>
        <div className="modaltitle">Department Detail</div>
        
        <table className='tableuser'>
        <tr>
          <th>System Management</th>
          <th>User</th>
        </tr>

        <tr>
        <td>System Management</td>
        <td>Namho</td>
        </tr>
    </table>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalDepartmentQamView(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDepartmentQamView
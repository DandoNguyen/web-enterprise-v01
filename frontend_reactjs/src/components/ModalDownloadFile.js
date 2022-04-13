import React from "react";
import "../css/ModalDownloadFile.css";

function ModalDownloadFile({ setOpenModalDownloadFile}) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalDownloadFile(false);}} > X </a>
        </div>
        <div className="modaltitle">DOWNLOAD FILE</div>
        {/* <div className="modalinput">
            <span className="inputtitle">Category Name</span>
            <br/>
            <input className="inputvl"></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Description</span>
            <br/>
            <input className="inputvl"></input>
        </div> */}
        <table className='tableuser'>
        <tr>
          <th>Idea Title</th>
          <th>Employee ID</th>
          <th>DEP</th>
          <th>Attached Files</th>
          <th></th>
        </tr>

        <tr>
        <td>Title Post 1</td>
        <td>XXX1</td>
        <td>DEP 1</td>
        <td>xyz.pptx</td>
        <td>
            <div>
        <input type="checkbox" id="1" name="1" />
            </div>
        </td>
        </tr>

        <tr>
        <td>Title Post 2</td>
        <td>XXX2</td>
        <td>DEP 1</td>
        <td>abc.docx</td>
        <td>
            <div>
        <input type="checkbox" id="2" name="2" />
            </div>
        </td>
        </tr>
    </table>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalDownloadFile(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Download</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDownloadFile
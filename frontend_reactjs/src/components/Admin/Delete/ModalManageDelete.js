import React from "react";
import "./ModalManageDelete.css";

function ModalManageDelete({ setOpenModalDelete , data}) {
  const deleteact = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://localhost:5001/api/Accounts/removeUser?email=${data.email}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => { setOpenModalDelete(false); }} > X </a>
        </div>
        <div className="modaltitle">DO YOU WANT TO DELETE THIS ACCOUNT</div>

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => { setOpenModalDelete(false); }} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={deleteact}>Confrim</button>
        </div>

      </div>
    </div>
  );
}

export default ModalManageDelete
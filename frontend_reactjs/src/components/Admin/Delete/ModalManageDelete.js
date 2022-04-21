import React,{useState} from "react";
import "./ModalManageDelete.css";
import { Url } from "../../URL";

function ModalManageDelete({ setOpenModalDelete , data}) {
  const [reloadpage,setreloadpage] = useState(false);
  const deleteact = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url+`/api/Accounts/removeUser?email=${data.email}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setreloadpage(!reloadpage)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => { setOpenModalDelete(false); }} > X </button>
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
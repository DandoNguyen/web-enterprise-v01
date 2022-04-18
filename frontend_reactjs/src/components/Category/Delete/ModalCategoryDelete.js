import React, {useState} from "react";
import "./ModalCategoryDelete.css";
import { Url } from "../../URL";

function ModalCategoryDelete({ setOpenModalCategoryDelete , data }) {
  const [reloadpage,setreloadpage]= useState(false);
  const Deletetag = () => {
      var myHeaders = new Headers();
          myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));
          myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              redirect: 'follow'
            };

            fetch(Url+`/api/Category/DeleteCate?cateid=${data.categoryId}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                setOpenModalCategoryDelete(false)
                setreloadpage(!reloadpage)
                alert(result)
              })
              .catch(error => {
                console.log('error', error)
                setOpenModalCategoryDelete(false)
                setreloadpage(!reloadpage)
              });
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalCategoryDelete(false);}} > X </button>
        </div>
        <div className="modaltitle">DO YOU WANT TO DELETE THIS CATEGORY</div>
        
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalCategoryDelete(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={Deletetag}>Confrim</button>
        </div>
       
      </div>
    </div>
  );
}

export default ModalCategoryDelete
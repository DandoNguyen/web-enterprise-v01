import React, {useState} from "react";
import "../css/ModalCategoryDelete.css";

function ModalCategoryDelete({ setOpenModalCategoryDelete , data }) {
  const [reloadpage,setreloadpage]= useState(false);
  const Deletetag = () => {
      var myHeaders = new Headers();
          myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));
          

            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              redirect: 'follow'
            };

            fetch(`https://localhost:5001/api/Category/DeleteCate?cateid=${data.categoryId}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                setreloadpage(!reloadpage)
              })
              .catch(error => {
                console.log('error', error)
                setreloadpage(!reloadpage)
              });
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalCategoryDelete(false);}} > X </a>
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
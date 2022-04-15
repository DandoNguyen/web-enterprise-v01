import React,{useState} from "react";
import "./ModalCategoryCreate.css";

function ModalCategoryCreate({ setOpenModalCategoryCreate }) {
  const[CategoryName,setCategoryName]=useState('');
  const[desc,setdesc]=useState('');
   const [reloadpage,setreloadpage]= useState(false);
  const Summittag = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "categoryName": CategoryName,
          "desc": desc
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://localhost:5001/api/Category/CreateTag", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setOpenModalCategoryCreate(false)
          setreloadpage(!reloadpage)
        })
        .catch(error => {
          console.log('error', error)
          setOpenModalCategoryCreate(false)
          setreloadpage(!reloadpage)
        });
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModalCategoryCreate(false);}} > X </a>
        </div>
        <div className="modaltitle">Create New Category</div>
        <div className="modalinput">
            <span className="inputtitle">Category Name</span>
            <br/>
            <input className="inputvl" value={CategoryName} onChange={e => setCategoryName(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Description</span>
            <br/>
            <textarea className="inputvl" placeholder="Write something..." value={desc} onChange={e => setdesc(e.target.value)}></textarea>
        </div>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalCategoryCreate(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={Summittag}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCategoryCreate
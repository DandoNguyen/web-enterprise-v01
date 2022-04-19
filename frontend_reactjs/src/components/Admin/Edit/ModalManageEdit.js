import React, {useState} from "react";
import "./ModalManageEdit.css";
import { Url } from "../../URL";

function ModalManageEdit({ setopenModalManageEdit , data}) {
  const[email,setemail] = useState('')
  const[userName,setuserName]=useState('')
  // const [age,setage]=useState('')
  const[address,setaddress]=useState('')
  const[firstName,setfirstName]=useState('')
  const [lastName,setlastName]=useState('')
  const [dob,setdob]=useState('')
  const updateAccout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "userId": data.id,
      "userName": userName,
      // "age": age,
      "address": address,
      "firstName": firstName,
      "lastName": lastName,
      "dob": dob
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(Url+"/api/Accounts/updateUser", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => { setopenModalManageEdit(false); }} > X </button>
        </div>
        <div className="modaltitle">Edit User</div>

        <div className="modalinput">
          <span className="inputtitle">Email</span>
          <br />
          <input className="inputvl" value={email} onChange={e=>setemail(e.target.value)}></input>
        </div>
        <div className="modalinput">
          <span className="inputtitle">userName</span>
          <br />
          <input className="inputvl" value={userName} onChange={e=>setuserName(e.target.value)}></input>
        </div>
        {/* <div className="modalinput">
          <span className="inputtitle">age</span>
          <br />
          <input className="inputvl" type="number" value={age} onChange={e=>setage(e.target.value)}></input>
        </div> */}
        <div className="modalinput">
          <span className="inputtitle">address</span>
          <br />
          <input className="inputvl" value={address} onChange={e=> setaddress(e.target.value)}></input>
        </div>
        <div className="modalinput">
          <span className="inputtitle">firstName</span>
          <br />
          <input className="inputvl" value={firstName} onChange={e => setfirstName(e.target.value)}></input>
        </div>
        <div className="modalinput">
          <span className="inputtitle">lastName</span>
          <br />
          <input className="inputvl" value={lastName} onChange={ e => setlastName(e.target.value)}></input>
        </div>
        <div className="modalinput">
          <span className="inputtitle">DOB</span>
          <br />
          <input type = "date" className="inputvl" value={dob} onChange={e => setdob(e.target.value)}></input>
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
          <button className="cancelBtn" onClick={() => { setopenModalManageEdit(false); }} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={updateAccout}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ModalManageEdit
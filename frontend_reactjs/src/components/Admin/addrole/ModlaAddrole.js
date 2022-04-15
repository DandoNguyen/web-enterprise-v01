import React,{useState , useEffect} from 'react'
import "./ModalAddrole.css"

function ModlaAddrole({setOpenModlaAddrole}) {
    const [allRole, setallRole] = useState([]);
    const [roleselect,setroleselect] = useState('')
    const [Emailuer,setEmailuer]= useState('')

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch("https://localhost:5001/api/Roles", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setallRole(data)
          })
          .catch(error => console.log('error', error));
      }, [])
      
      const listRole = allRole.map(data => (
        <option key={data.id} value={data.name}>{data.name}</option>
      ))

    const adduserrole = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch(`https://localhost:5001/api/Roles/AddUserToRole?email=${Emailuer}&roleName=${roleselect}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            alert(result.value)
          })
          .catch(error => console.log('error', error));
      }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => {setOpenModlaAddrole(false);}} > X </a>
        </div>
        <div className="modaltitle">ADD ROLE</div>
        <div className="modalinput">
            <span className="inputtitle">Email</span>
            <br/>
            <input className="inputvl" value={Emailuer} onChange={e => setEmailuer(e.target.value)}></input>
        </div>
        <div className="modalinput">
        <select value={roleselect} onChange={e => setroleselect(e.target.value)}>
          <option value=''></option>
          {listRole}
        </select>
        </div>
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModlaAddrole(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={adduserrole}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ModlaAddrole
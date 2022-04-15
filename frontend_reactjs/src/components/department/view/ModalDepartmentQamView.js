import React, { useState, useEffect } from "react";
import "./ModalDepartmentQamView.css";

function ModalDepartmentQamView({ setOpenDepartmentQamView, data }) {
  const [user, setuser] = useState([])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://localhost:5001/api/Department/GetAllUserFromDepartment?departmentId=${data.departmentId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setuser(data)
      })
      .catch(error => console.log('error', error));
  }, [])

  const listuserdpm = user.map(data => (
    <tr key={data.id}>
      <td>{data.id}</td>
      <td>{data.userName}</td>
      <td>{data.email}</td>
    </tr>
  ))
  return (
    <div className="modalBackground1">
      <div className="modalContainer1">
        <div className="titleCloseBtn">
          <a className="xbtn" onClick={() => { setOpenDepartmentQamView(false); }} > X </a>
        </div>
        <div className="modaltitle">Department Detail</div>

        <table className='tableuser'>
          <thead>
            <tr>
              <th>System Management</th>
              <th>User</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {listuserdpm}
          </tbody>
        </table>
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => { setOpenDepartmentQamView(false); }} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDepartmentQamView
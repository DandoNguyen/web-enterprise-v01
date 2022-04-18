import React, { useState, useEffect } from 'react';
import './ManageDepartmentQamDepartment.css';
import ModalDepartmentQamCreate from './create/ModalDepartmentQamCreate';
import ModalDepartmentQamView from './view/ModalDepartmentQamView';
import ModalAdduser from './adduser/ModalAdduser';
import Navbar from '../Navbar';
import { Url } from '../URL';




function ManageDepartmentQamDepartment() {
  const [ModalDepartmentQamCreateOpen, setModalDepartmentQamCreate] = useState(false);
  const [DepartmentQamViewOpen, setDepartmentQamView] = useState(false);
  const [GetAllDepartment, setGetAllDepartment] = useState([])
  // const [deatailBtn, setdeatailBtn] = useState(false)
  const [ModalAddusers,setModalAdduser]=useState(false)
  const [viewDepartment,setviewDepartment]=useState({})
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url+"/api/Department/GetAllDepartment", requestOptions)
      .then(response => response.json())
      .then(data => {
        setGetAllDepartment(data)
      })
      .catch(error => console.log('error', error));
  }, [])
  const handleviewDetail=(data)=>{
    setDepartmentQamView(true)
    setviewDepartment(data)
  }
  const listDepartment = GetAllDepartment.map(data => (
    <tr key={data.departmentId}>
      <td>{data.departmentName}</td>
      <td>
      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => handleviewDetail(data)}>Detail</button>
      </div>
    </td>
    </tr>
  ))

  
  return <div>
    <Navbar />
    <section className='Managementpage'>
      <div className='buttonMana'>
        <a href='ManageDepartmentQamAccount'><button type='button' className='buttonAccount'>Account</button></a>
        <a href='ManageDepartmentIdea'><button type='button' className='buttonDeadline'>Idea</button></a>
        <a href='ManageDepartmentQamDepartment'><button type='button' className='buttonDeadline'>Department</button></a>
      </div>
      <div className='manage-header'>
        <div className="text">Department Management</div>
      </div>
      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => { setModalDepartmentQamCreate(true); }}>Create Department</button>
        {ModalDepartmentQamCreateOpen && <ModalDepartmentQamCreate setOpenModalDepartmentQamCreate={setModalDepartmentQamCreate} />}
      </div>
      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => { setModalAdduser(true); }}>ADD user Department</button>
        {ModalAddusers && <ModalAdduser setOpenModalAdduser={setModalAdduser} />}
      </div>
      <div className='contentManage'>
        <div className='text'>List Account</div>
      </div>
      <table className='tableuser'>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
            {listDepartment}
            {DepartmentQamViewOpen && <ModalDepartmentQamView setOpenDepartmentQamView={setDepartmentQamView} data={viewDepartment}/>}
        </tbody>
      </table>
    </section>
  </div>
}
export default ManageDepartmentQamDepartment;
import React, { useState, useEffect } from 'react';
import '../css/ManageAccount.css';
import Modal from './Modal';
import ModalManageEdit from './ModalManageEdit';
import ModalManageDetail from './ModalManageDetail';
import ModalManageDelete from './ModalManageDelete';
import Navbar from './Navbar';


function ManageAccount() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ModalManageEditOpen, setModalManageEdit] = useState(false);
  const [ModalManageDetailOpen, setModalManageDetail] = useState(false);
  const [ModalManageDeleteOpen, setModalManageDelete] = useState(false);
  const [userAccounts, setuserAccounts] = useState([]);
  const [reloadpage, setreloadpage] = useState(false);
  const [allRole, setallRole] = useState([])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch("https://localhost:5001/api/Roles/GetAllUsers", requestOptions)
      .then(response => response.json())
      .then(data => {
        setuserAccounts(data)
        // setreloadpage(!reloadpage)
      })
      .catch(error => {
        console.log('error', error)
        // setreloadpage(!reloadpage)
      });
  }, [reloadpage])
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
    <option key={data.id} value={data.id}>{data.name}</option>
  ))
  
  const listAccounts = userAccounts.map(data => (
    <tr key={data.id}>
      <td >{data.email}</td>
      <td >{data.userName}</td>
      <td >{data.id}</td>
      <td></td>
      <td>
        <select>
          {listRole}
        </select>
      </td>
      <td>

        <button className='edit' onClick={() => { setModalManageEdit(true); }}>Edit</button>
        {ModalManageEditOpen && <ModalManageEdit setopenModalManageEdit={setModalManageEdit} />}
      </td>

      <td>
        <button className='Detail' onClick={() => { setModalManageDetail(true); }}>Detail</button>
        {ModalManageDetailOpen && <ModalManageDetail setOpenModalDetail={setModalManageDetail} />}
      </td>

      <td>
        <button className='Delete' onClick={() => { setModalManageDelete(true); }}>Delete</button>
        {ModalManageDeleteOpen && <ModalManageDelete setOpenModalDelete={setModalManageDelete} />}
      </td>

    </tr>
  ))
  
  return <div>
    <Navbar />
    <section className='Managementpage'>

      <div className='buttonMana'>
        <a href='ManageAccount'><button type='button' className='buttonAccount'>Account</button></a>
        <a href='ManageDeadLine'><button type='button' className='buttonDeadline'>DeadLine</button></a>
      </div>

      <div className='manage-header'>
        <div className="text">Management Account</div>
      </div>

      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => { setModalOpen(true); }}>Create User</button>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>

      <div className='contentManage'>
        <div className='text'>List Account</div>
      </div>

      <table className='tableuser'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Employee ID </th>
            <th>Role</th>
            <th>Edit</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {listAccounts}
        </tbody>
      </table>

    </section>
  </div>


}
export default ManageAccount;
import React, { useState, useEffect } from 'react';
import './ManageAccount.css';
import Modal from '../create/Modal';
import ModalManageEdit from '../Edit/ModalManageEdit';
import ModalManageDetail from '../Detail/ModalManageDetail';
import ModalManageDelete from '../Delete/ModalManageDelete';
import Navbar from '../../Navbar';
import ModlaAddrole from '../addrole/ModlaAddrole';


function ManageAccount() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ModalManageEditOpen, setModalManageEdit] = useState(false);
  const [ModalManageDetailOpen, setModalManageDetail] = useState(false);
  const [ModalManageDeleteOpen, setModalManageDelete] = useState(false);
  const [ModlaAddroleOpen, setModlaAddroleOpen] = useState(false);
  const [userAccounts, setuserAccounts] = useState([]);
  const [reloadpage] = useState(false);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch("https://localhost:5001/api/Accounts", requestOptions)
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
  const listAccounts = userAccounts.map(data => (
    <tr key={data.id}>
      <td >{data.email}</td>
      <td >{data.userName}</td>
      <td >{data.id}</td>
      <td>

        <button className='edit' onClick={() => { setModalManageEdit(true); }}>Edit</button>
        {ModalManageEditOpen && <ModalManageEdit setopenModalManageEdit={setModalManageEdit} data={data} />}
      </td>

      <td>
        <button className='Detail' onClick={() => { setModalManageDetail(true); }}>Detail</button>
        {ModalManageDetailOpen && <ModalManageDetail setOpenModalDetail={setModalManageDetail} data={data} />}
      </td>

      <td>
        <button className='Delete' onClick={() => { setModalManageDelete(true); }}>Delete</button>
        {ModalManageDeleteOpen && <ModalManageDelete setOpenModalDelete={setModalManageDelete} data={data} />}
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
      <div className='Btncreate'>
      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => { setModalOpen(true); }}>Create User</button>
        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>
      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => { setModlaAddroleOpen(true); }}>ADD ROLE</button>
        {ModlaAddroleOpen && <ModlaAddrole setOpenModlaAddrole={setModlaAddroleOpen} />}
      </div>
      </div>
      <div className='contentManage'>
        <div className='text'>List Account</div>
      </div>

      <table className='tableuser'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Employee ID </th>
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
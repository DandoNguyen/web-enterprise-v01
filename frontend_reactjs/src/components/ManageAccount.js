import React,{ useState } from 'react';
import '../css/ManageAccount.css';
import Modal from './Modal';
import ModalManageEdit from './ModalManageEdit';
import ModalManageDetail from './ModalManageDetail';
import ModalManageDelete from './ModalManageDelete';
import Navbar from './Navbar';


function ManageAccount () {
  const [modalOpen, setModalOpen] = useState(false);
  const [ModalManageEditOpen, setModalManageEdit] = useState(false);
  const [ModalManageDetailOpen, setModalManageDetail] = useState(false);
  const [ModalManageDeleteOpen, setModalManageDelete] = useState(false);
	return <div>
    <Navbar/>
    <section className='Managementpage'>

    <div className='buttonMana'>
      <a href='ManageAccount'><button type='button' className='buttonAccount'>Account</button></a>
      <a href='ManageDeadLine'><button type='button' className='buttonDeadline'>DeadLine</button></a>
    </div>

    <div className='manage-header'>
      <div className="text">Management Account</div>
    </div>

    <div className='buttonAddUser'>
      <button className='Add-user-bt' onClick={() => {setModalOpen(true);}}>Create User</button>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  
    <div className='contentManage'>
        <div className='text'>List Account</div>
    </div>

      <table className='tableuser'>
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

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>id </td>
        <td>
          <select name="role" id="userrole">
          <option value="Admin">Admin</option>
          <option value="Role1">Role1</option>
          <option value="Role2">Role2</option>
          <option value="Role3">Role3</option>
        </select>
        </td>

        <td>
        <button className='edit' onClick={() => {setModalManageEdit(true);}}>Edit</button>
          {ModalManageEditOpen && <ModalManageEdit setopenModalManageEdit={setModalManageEdit} />}
        </td> 

        <td>
        <button className='Detail' onClick={() => {setModalManageDetail(true);}}>Detail</button>
          {ModalManageDetailOpen && <ModalManageDetail setOpenModalDetail={setModalManageDetail} />}
        </td>

        <td>
        <button className='Delete' onClick={() => {setModalManageDelete(true);}}>Delete</button>
          {ModalManageDeleteOpen && <ModalManageDelete setOpenModalDelete={setModalManageDelete} />}
        </td>
        
      </tr>
    </table>

  </section>
  </div>

  
}
export default ManageAccount;
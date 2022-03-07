import React,{ useState } from 'react';
import '../css/Management.css';
import Modal from './Modal';


function Management () {
  const [modalOpen, setModalOpen] = useState(false);
	return <div>
    <section className='Managementpage'>
    <div className='manage-header'>
      <div className="text">Management</div>
      <button className='Add-user-bt' onClick={() => {setModalOpen(true);}}>Add User</button>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>
      <table className='tableuser'>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
          <th>Edit</th>
          <th></th>
        </tr>
        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>
          <select name="role" id="userrole">
          <option value="Admin">Admin</option>
          <option value="Role1">Role1</option>
          <option value="Role2">Role2</option>
          <option value="Role3">Role3</option>
        </select>
        </td>
        <td>
          <select name="action" id="action">
          <option value="Edit">Null</option>
          <option value="Delete">Delete</option>
          <option value="Update">Update</option>
        </select>
        </td>
        <td><button className='submit-user'>submit</button></td>
      </tr>
    </table>
  </section>
  </div>
}
export default Management;
import React,{ useState } from 'react';
import '../css/ManageDeadLine.css';
import ModalDeadlineCreate from './ModalDealineCreate';
import ModalDeadlineEdit from './ModalDeadlineEdit';
import ModalDeadlineDelete from './ModalDeadlineDelete';
import Navbar from './Navbar';
function ManageDeadLine () {
  const [modalOpenDeadlineCreate, setModalOpenDeadlineCreate] = useState(false);
  const[modalOpenDeadlineEdit, setModalOpenDeadlineEdit] = useState(false);
  const[modalOpenDeadlineDelete, setModalOpenDeadlineDelete] = useState(false);
	return <div>
    <Navbar/>
    <section className='Managementpage'>

    <div className='buttonMana'>
      <a href='Account'><button type='button' className='buttonAccount'>Account</button></a>
      <a href='DeadLine'><button type='button' className='buttonDeadline'>DeadLine</button></a>
    </div>

    <div className='manage-header'>
      <div className="text">Management DeadLine</div>
      </div>

    <div className='buttonAddUser'>
      <button className='Add-user-bt' onClick={() => {setModalOpenDeadlineCreate(true);}}>Create DeadLine</button>
      {modalOpenDeadlineCreate && <ModalDeadlineCreate setOpenModalDeadlineCreate={setModalOpenDeadlineCreate} />}
      </div>
      <div className='contentManage'>
        <div className='text'>List DeadLine</div>
      </div>    

      <table className='tableuser'>
        <tr>
          <th>Idea Title</th>
          <th>Closure Date</th>
          <th>Final Closure Date</th>
          <th>Satatus</th>
          <th>Edit</th>
          <th>Delete</th>

        </tr>

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>
          satatus</td>

        <td>
        <button className='edit' onClick={() => {setModalOpenDeadlineEdit(true);}}>Edit</button>
          {modalOpenDeadlineEdit && <ModalDeadlineEdit setopenModalDeadlineEdit={setModalOpenDeadlineEdit} />}
        </td> 

        <td>
        <button className='Delete' onClick={() => {setModalOpenDeadlineDelete(true);}}>Delete</button>
          {modalOpenDeadlineDelete && <ModalDeadlineDelete setOpenModalDeadlineDelete={setModalOpenDeadlineDelete} />}
        </td>
      </tr>
    </table>

  </section>
  </div>
}
export default ManageDeadLine;
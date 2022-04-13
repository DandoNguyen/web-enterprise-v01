import React,{ useState } from 'react';
import '../css/ManageDepartmentAccount.css';
import ModalDepartmentDetail from './ModalDepartmentDetail';
import Navbar from './Navbar';



function ManagementDepartmentAccount () {
 const [ModalDepartmentDetailOpen, setModalDepartmentDetail] = useState(false);
	return <div>
    <Navbar/>
    <section className='Managementpage'>

    <div className='buttonMana'>
      <a href='ManageDepartmentAccount'><button type='button' className='buttonAccount'>Account</button></a>
      <a href='ManageDepartmentIdea'><button type='button' className='buttonDeadline'>Idea</button></a>
    </div>

    <div className='manage-header'>
      <div className="text">Department Management</div>
      </div>

      <div className='contentManage'>
        <div className='text'>List Account</div>
    </div>



 
      <table className='tableuser'>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
          <th>Deatail</th>
        </tr>

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>Role</td>

        <td>
        <button className='Detail' onClick={() => {setModalDepartmentDetail(true);}}>Detail</button>
          {ModalDepartmentDetailOpen && <ModalDepartmentDetail setOpenModalDepartmentDetail={setModalDepartmentDetail} />}
        </td>
        
      </tr>
    </table>

  </section>
  </div>
}
export default ManagementDepartmentAccount;
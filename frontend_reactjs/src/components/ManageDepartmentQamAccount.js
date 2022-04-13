import React,{ useState } from 'react';
import '../css/ManageDepartmentQamAccount.css';
import ModalDepartmentQamDetail from './ModalDepartmentQamDetail';
import Navbar from './Navbar';




function ManagementDepartmentQamAccount () {
 const [ModalDepartmentQamDetailOpen, setModalDepartmentQamDetail] = useState(false);
	return <div>
    <Navbar/>
    <section className='Managementpage'>

    <div className='buttonMana'>
      <a href='ManageDepartmentQamAccount'><button type='button' className='buttonAccount'>Account</button></a>
      <a href='ManageDepartmentQamIdea'><button type='button' className='buttonDeadline'>Idea</button></a>
      <a href='ManageDepartmentQamDepartment'><button type='button' className='buttonDeadline'>Department</button></a>
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
          <th>Department</th>
          <th>Role</th>
          <th>Deatail</th>
        </tr>

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>Department</td>
        <td>Role</td>

        <td>
        <button className='Detail' onClick={() => {setModalDepartmentQamDetail(true);}}>Detail</button>
          {ModalDepartmentQamDetailOpen && <ModalDepartmentQamDetail setOpenModalDepartmentQamDetail={setModalDepartmentQamDetail} />}
        </td>
        
      </tr>
    </table>

  </section>
  </div>
}
export default ManagementDepartmentQamAccount;
import React,{ useState } from 'react';
import '../css/ManageDepartmentQamDepartment.css';
import ModalDepartmentQamCreate from './ModalDepartmentQamCreate';
import ModalDepartmentQamView from './ModalDepartmentQamView';
import Navbar from './Navbar';




function ManageDepartmentQamDepartment () {
    const [ModalDepartmentQamCreateOpen, setModalDepartmentQamCreate] = useState(false);
    const [ModalDepartmentQamViewOpen, setModalDepartmentQamView] = useState(false);
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

      <div className='buttonAddUser'>
      <button className='Add-user-bt' onClick={() => {setModalDepartmentQamCreate(true);}}>Create User</button>
      {ModalDepartmentQamCreateOpen && <ModalDepartmentQamCreate setOpenModalDepartmentQamCreate={setModalDepartmentQamCreate} />}
    </div>

      <div className='contentManage'>
        <div className='text'>List Account</div>
    </div>



 
      <table className='tableuser'>
        <tr>
          <th>Department Name</th>
          <th>Detail</th>
        </tr>

        <tr>
        <td>1. System Management</td>

        <td>
        <div className='buttonAddUser'>
            <button className='Add-user-bt' onClick={() => {setModalDepartmentQamView(true);}}>Detail</button>
            {ModalDepartmentQamViewOpen && <ModalDepartmentQamView setOpenModalDepartmentQamView={setModalDepartmentQamView} />}
        </div>
        </td>

        
        
      </tr>
    </table>

  </section>
  </div>
}
export default ManageDepartmentQamDepartment;
import React,{ useState } from 'react';
import '../css/ManageDepartmentIdea.css';
import ModalDepartmentIdea from './ModalDeaparmentIdea';
import Navbar from './Navbar';


function ManageDepartmentIdea () {
  const [ModalDepartmentIdeaOpen, setModalDepartmentIdea] = useState(false);
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
        <div className='text'>List Idea</div>
    </div>



 
      <table className='tableuser'>
        <tr>
          <th>Idea Title</th>
          <th>Username</th>
          <th>Category</th>
          <th>Status</th>
          <th>View</th>
        </tr>

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>Role</td>

        <td>
        <button className='View' onClick={() => {setModalDepartmentIdea(true);}}>View</button>
          {ModalDepartmentIdeaOpen && <ModalDepartmentIdea setOpenModalDepartmentIdea={setModalDepartmentIdea} />}
        </td>

      </tr>
    </table>

  </section>
  </div>
}
export default ManageDepartmentIdea;
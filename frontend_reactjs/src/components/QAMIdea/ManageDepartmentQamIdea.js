import React,{ useState } from 'react';
import './ManageDepartmentQamIdea.css';
import ModalMngDepQamIdea from './idea/ModalMngDepQamIdea';
import ModalDownloadFile from './file/ModalDownloadFile';
import Navbar from '../Navbar';



function ManageDepartmentQamIdea () {
    const [ModalMngDepQamIdeaOpen, setModalMngDepQamIdea] = useState(false);
    const [ModalDownloadFileOpen, setModalDownloadFile] = useState(false);
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
        <div className='text'>List Idea</div>
    </div>



 
    <table className='tableuser'>
        <tr>
          <th>Idea Title</th>
          <th>Username</th>
          <th>Category</th>
          <th>DEP</th>
          <th>Status</th>
          <th>View</th>
        </tr>

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>
        <td>DEP 1</td>
        <td>Approved</td>
        <td>
        <button className='Detail' onClick={() => {setModalMngDepQamIdea(true);}}>View</button>
          {ModalMngDepQamIdeaOpen && <ModalMngDepQamIdea setOpenModalMngDepQamIdea={setModalMngDepQamIdea} />}
        </td>
        

      </tr>
    </table>
    <div className='buttonAddUser'>
      <button className='buttonMana' onClick={() => {setModalDownloadFile(true);}}>Download</button>
      {ModalDownloadFileOpen && <ModalDownloadFile setOpenModalDownloadFile={setModalDownloadFile} />}
    </div>
  </section>
  </div>
}
export default ManageDepartmentQamIdea;
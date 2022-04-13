import React,{ useState } from 'react';
import '../css/ManageCategory.css';
import ModalCategoryCreate from './ModalCategoryCreate';
import ModalCategoryDelete from './ModalCategoryDelete';
import Navbar from './Navbar';

function ManageCategory () {
    const [ModalCategoryCreateOpen, setOpenModalCategory] = useState(false);
    const [ModalCategoryDeleteOpen, setModalCategoryDelete] = useState(false);
	return <div>
    <Navbar/>
    <section className='Managementpage'>

    
    <div className='manage-header'>
      <div className="text">Category Management</div>
    </div>

    <div className='buttonAddUser'>
      <button className='buttonMana' onClick={() => {setOpenModalCategory(true);}}>Add Categories</button>
      {ModalCategoryCreateOpen && <ModalCategoryCreate setOpenModalCategoryCreate={setOpenModalCategory} />}
    </div>
  
    <div className='contentManage'>
        <div className='text'>Categories List</div>
    </div>

      <table className='tableuser'>
        <tr>
          <th>Category Name</th>
          <th>Description</th>
          <th>Post</th>
          <th>Delete</th>
        </tr>

        <tr>
        <td>NamHPGCS18027@FPT.EDU.VN</td>
        <td>Namho</td>
        <td>98999999999</td>

        <td>
        <button className='Delete' onClick={() => {setModalCategoryDelete(true);}}>Delete</button>
          {ModalCategoryDeleteOpen && <ModalCategoryDelete setOpenModalCategoryDelete={setModalCategoryDelete} />}
        </td>

      </tr>
    </table>

  </section>
  </div>

  
}
export default ManageCategory;
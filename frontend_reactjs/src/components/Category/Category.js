import React,{useState , useEffect} from 'react'
import Navbar from '../Navbar'
import './Category.css'
import ModalCategoryCreate from './Create/ModalCategoryCreate';
import ModalCategoryDelete from './Delete/ModalCategoryDelete'
import { Url } from '../URL';

function Category() {
    const[alltag,setalltag]=useState([]);
    const [reloadpage,setreloadpage]= useState(false);
    const [ModalCategoryCreateOpen, setOpenModalCategory] = useState(false);
    const [ModalCategoryDeleteOpen, setModalCategoryDelete] = useState(false);
    const [deleteCate,setdelateCate]=useState('')
  
    useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization" , "Bearer "+ sessionStorage.getItem("accessToken"));
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(Url+"/api/Category/AllTag", requestOptions)
        .then(response => response.json())
        .then(data => {
          setalltag(data)
        })
        .catch(error => console.log('error', error));
    }, [reloadpage])
    const handaleDelete = (data) => {
      setModalCategoryDelete(true)
      setdelateCate(data)
    }
    const listCategory = alltag.map( data => (
      <tr key={data.categoryId}>
      <td >{data.categoryName}</td>
      <td >{data.desc}</td>
      <td>
        <button className='submit-user' onClick={() => handaleDelete(data)}>Delete</button>
      </td>
    </tr>
    ))

    const addCate = (categoryName , desc) =>{
      alltag.push({categoryName , desc})
    }
     
  return (
    <div>
    <Navbar/>
    <section className='Managementpage'>

    
    <div className='manage-header'>
      <div className="text">Category Management</div>
    </div>

    <div className='buttonAddUser'>
      <button className='buttonMana' onClick={() => {setOpenModalCategory(true);}}>Add Categories</button>
      {ModalCategoryCreateOpen && <ModalCategoryCreate setOpenModalCategoryCreate={setOpenModalCategory} addCate={addCate} setreloadpage={setreloadpage}/>}
    </div>
  
    <div className='contentManage'>
        <div className='text'>Categories List</div>
    </div>

      <table className='tableuser'>
        <thead>
        <tr>
          <th>Category Name</th>
          <th>Description</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {listCategory}
        {ModalCategoryDeleteOpen && <ModalCategoryDelete setOpenModalCategoryDelete={setModalCategoryDelete} data={deleteCate} setreloadpage={setreloadpage} />}
      </tbody>
    </table>

  </section>
  </div>
  )
}

export default Category
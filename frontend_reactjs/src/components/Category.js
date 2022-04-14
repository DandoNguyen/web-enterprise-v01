import React,{useState , useEffect} from 'react'
import Navbar from './Navbar'
import '../css/Category.css'
import ModalCategoryCreate from './ModalCategoryCreate';
import ModalCategoryDelete from './ModalCategoryDelete'

function Category() {
    const[alltag,setalltag]=useState([]);
    const [reloadpage,setreloadpage]= useState(false);
    const [ModalCategoryCreateOpen, setOpenModalCategory] = useState(false);
    const [ModalCategoryDeleteOpen, setModalCategoryDelete] = useState(false);
  
    useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://localhost:5001/api/Category/AllTag", requestOptions)
        .then(response => response.json())
        .then(data => {
          setalltag(data)
        })
        .catch(error => console.log('error', error));
    }, [reloadpage])

    const listCategory = alltag.map( data => (
      <tr key={data.categoryId}>
        <td >{data.categoryId}</td>
      <td >{data.categoryName}</td>
      <td >{data.desc}</td>
      <td>
        <button className='submit-user' onClick={() => {setModalCategoryDelete(true);}}>Delete</button>
        {ModalCategoryDeleteOpen && <ModalCategoryDelete setOpenModalCategoryDelete={setModalCategoryDelete} data={data} />}
      </td>
    </tr>
    ))
  return (
    <div>
    <Navbar/>
    <section className='Managementpage'>

    
    <div className='manage-header'>
      <div className="text">Category Management</div>
    </div>

    <div className='buttonAddUser'>
      <button className='buttonMana' onClick={() => {setOpenModalCategory(true);}}>Add Categories</button>
      {ModalCategoryCreateOpen && <ModalCategoryCreate setOpenModalCategoryCreate={setOpenModalCategory}  />}
    </div>
  
    <div className='contentManage'>
        <div className='text'>Categories List</div>
    </div>

      <table className='tableuser'>
        <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Description</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {listCategory}
      </tbody>
    </table>

  </section>
  </div>
  )
}

export default Category
import React, { useState, useEffect } from 'react';
import './ManageDepartmentIdea.css';
import ModalDepartmentIdea from './modalidea/ModalDeaparmentIdea';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom'
import { Url } from '../URL';


function ManageDepartmentIdea() {
  const [ModalDepartmentIdeaOpen, setModalDepartmentIdea] = useState(false);
  const [QACIdea, setQACIdea] = useState([])
  const [ viewIdeas , setviewIdea]=useState('')
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    // myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url+"/api/Posts/QACListPost", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQACIdea(data)
      })
      .catch(error => console.log('error', error));
  }, [])
  
  const viewIdea = (data)=>{
    setModalDepartmentIdea(true)
    setviewIdea(data)
  }
  const listQACidea = QACIdea.map(data => (
    <tr key={data.postId}>
      <td>{data.title}</td>
      <td>{data.username}</td>
      <td>{data.categoryId}</td>
      <td>{data.message}</td>
      <td>
        <button className='View' onClick={() => viewIdea(data)}>View</button>
        
      </td>
    </tr>
  ))


  return <div>
    <Navbar />
    <section className='Managementpage'>
      <div className='buttonMana'>
        <Link to='/ManageDepartmentAccount'><button type='button' className='buttonAccount'>Account</button></Link>
        <Link to='ManageDepartmentIdea'><button type='button' className='buttonDeadline'>Idea</button></Link>
      </div>

      <div className='manage-header'>
        <div className="text">Department Management</div>
      </div>

      <div className='contentManage'>
        <div className='text'>List Idea</div>
      </div>
      <table className='tableuser'>
        <thead>
          <tr>
            <th>Idea Title</th>
            <th>Username</th>
            <th>Category</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {listQACidea}
          {ModalDepartmentIdeaOpen && <ModalDepartmentIdea setOpenModalDepartmentIdea={setModalDepartmentIdea} data={viewIdeas} />}
        </tbody>
      </table>

    </section>
  </div>
}
export default ManageDepartmentIdea;
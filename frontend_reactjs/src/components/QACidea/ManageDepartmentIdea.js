import React, { useState, useEffect } from 'react';
import './ManageDepartmentIdea.css';
import ModalDepartmentIdea from './modalidea/ModalDeaparmentIdea';
import Navbar from '../Navbar';


function ManageDepartmentIdea() {
  const [ModalDepartmentIdeaOpen, setModalDepartmentIdea] = useState(false);
  const [QACIdea, setQACIdea] = useState([])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/api/Posts/QACListPost", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQACIdea(data)
      })
      .catch(error => console.log('error', error));
  }, [])

  const listQACidea = QACIdea.map(data => (
    <tr key={data.postId}>
      <td>{data.title}</td>
      <td>{data.username}</td>
      <td>{data.categoryId}</td>
      <td>{data.message}</td>
      <td>
        <button className='View' onClick={() => { setModalDepartmentIdea(true); }}>View</button>
        {ModalDepartmentIdeaOpen && <ModalDepartmentIdea setOpenModalDepartmentIdea={setModalDepartmentIdea} data={data} />}
      </td>
    </tr>
  ))


  return <div>
    <Navbar />
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
        </tbody>
      </table>

    </section>
  </div>
}
export default ManageDepartmentIdea;
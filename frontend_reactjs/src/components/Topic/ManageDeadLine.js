import React, { useState, useEffect } from 'react';
import './ManageDeadLine.css';
import ModalDeadlineCreate from './Create/ModalDealineCreate';
import ModalDeadlineEdit from './Edit/ModalDeadlineEdit';
import ModalDeadlineDelete from './Delete/ModalDeadlineDelete';
import Navbar from '../Navbar';
import { Url } from '../URL';
import { Link } from 'react-router-dom';
function ManageDeadLine() {
  const [modalOpenDeadlineCreate, setModalOpenDeadlineCreate] = useState(false);
  const [modalOpenDeadlineEdit, setModalOpenDeadlineEdit] = useState(false);
  const [modalOpenDeadlineDelete, setModalOpenDeadlineDelete] = useState(false);
  const [Topics, setTopics] = useState([])
  const [reloadpage] = useState(false)
  const [editTopic,seteditTopic]=useState('')
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(Url+"/api/Topics/GetAllTopic", requestOptions)
      .then(response => response.json())
      .then(data => {
        setTopics(data)
      })
      .catch(error => console.log('error', error))
  }, [reloadpage])

  const handaleEdit = (data) =>{
    setModalOpenDeadlineEdit(true)
    seteditTopic(data)
  }
  const listTopics = Topics.map(data => (
    <tr key={data.topicId}>
      <td >{data.topicName}</td>
      <td>{data.topicDesc}</td>
      <td >{data.closureDate}</td>
      <td >{data.finalClosureDate}</td>
      <td>
        <button className='edit' onClick={() => handaleEdit(data)}>Edit</button>
      </td>

      <td>
        <button className='Delete' onClick={() => { setModalOpenDeadlineDelete(true); }}>Delete</button>
        {modalOpenDeadlineDelete && <ModalDeadlineDelete setOpenModalDeadlineDelete={setModalOpenDeadlineDelete} data={data} />}
      </td>
    </tr>
  ))
  return <div>
    <Navbar />
    <section className='Managementpage'>

      <div className='buttonMana'>
        <Link to='/ManageAccount'><button type='button' className='buttonAccount'>Account</button></Link>
        <Link to='/ManageDeadLine'><button type='button' className='buttonDeadline'>DeadLine</button></Link>
        <Link to='/AdminDepartment'><button type='button' className='buttonDeadline'>Department</button></Link>
      </div>

      <div className='manage-header'>
        <div className="text">Management DeadLine</div>
      </div>

      <div className='buttonAddUser'>
        <button className='Add-user-bt' onClick={() => { setModalOpenDeadlineCreate(true); }}>Create DeadLine</button>
        {modalOpenDeadlineCreate && <ModalDeadlineCreate setOpenModalDeadlineCreate={setModalOpenDeadlineCreate} />}
      </div>
      <div className='contentManage'>
        <div className='text'>List DeadLine</div>
      </div>

      <table className='tableuser'>
        <thead>
          <tr>
            <th>Idea Title</th>
            <th>Satatus</th>
            <th>Closure Date</th>
            <th>Final Closure Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {listTopics}
          {modalOpenDeadlineEdit && <ModalDeadlineEdit setopenModalDeadlineEdit={setModalOpenDeadlineEdit} data={editTopic} />}
        </tbody>
      </table>

    </section>
  </div>
}
export default ManageDeadLine;
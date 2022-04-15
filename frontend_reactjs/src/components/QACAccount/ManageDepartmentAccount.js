import React,{ useState ,useEffect } from 'react';
import './ManageDepartmentAccount.css';
import ModalDepartmentDetail from './detail/ModalDepartmentDetail';
import Navbar from '../Navbar';



function ManagementDepartmentAccount () {
 const [ModalDepartmentDetailOpen, setModalDepartmentDetail] = useState(false);
 const [userAccounts, setuserAccounts] = useState([]);
  const [reloadpage] = useState(false);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch("https://localhost:5001/api/Accounts", requestOptions)
      .then(response => response.json())
      .then(data => {
        setuserAccounts(data)
        // setreloadpage(!reloadpage)
      })
      .catch(error => {
        console.log('error', error)
        // setreloadpage(!reloadpage)
      });
  }, [reloadpage])
  const listAccounts = userAccounts.map(data => (
    <tr key={data.id}>
      <td >{data.email}</td>
      <td >{data.userName}</td>
      <td >{data.id}</td>
      <td>
        <button className='Detail' onClick={() => {setModalDepartmentDetail(true);}}>Detail</button>
          {ModalDepartmentDetailOpen && <ModalDepartmentDetail setOpenModalDepartmentDetail={setModalDepartmentDetail} />}
        </td>
    </tr>
  ))


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
        <div className='text'>List Account</div>
    </div>



 
      <table className='tableuser'>
        <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
          <th>Deatail</th>
        </tr>
        </thead>
        <tbody>
          {listAccounts}
        </tbody>
    </table>

  </section>
  </div>
}
export default ManagementDepartmentAccount;
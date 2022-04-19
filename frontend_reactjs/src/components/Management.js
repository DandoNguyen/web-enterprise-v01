// import React,{ useEffect,  useState } from 'react';
// import '../css/Management.css';
// import Modal from './Admin/create/Modal';
// import Navbar from './Navbar';
// import ModalEditUser from './ModalEditUser'


// function Management () {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [ModalEditUserOpen, setModalEditUserOpen] = useState(false);
//   const [userAccounts,setuserAccounts] = useState([]);
//   const [reloadpage,setreloadpage]= useState(false)
  
//   useEffect(() => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
    
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow'
//     };
    

//     fetch("https://localhost:5001/api/Roles/GetAllUsers", requestOptions)
//       .then(response => response.json())
//       .then(data =>{
//         setuserAccounts(data)
//         setreloadpage(!reloadpage)
//       })
//       .catch(error => {console.log('error', error)
//           setreloadpage(!reloadpage)
//         });
//   }, [reloadpage])

    
//     const listAccounts = userAccounts.map( data => (
//       <tr key={data.id}>
//       <td >{data.email}</td>
//       <td >{data.userName}</td>
//       <td >{data.id}</td>
//       <td>
//         <button className='submit-user' onClick={() => {setModalEditUserOpen(true);}}>Edit</button>
//         {ModalEditUserOpen && <ModalEditUser setOpenModalEditUser={setModalEditUserOpen} />}
//       </td>
//       <td>
//         <button className='submit-user'>Delete</button>
//       </td>
//     </tr>
//     ))
  

// 	return <div>
//     <Navbar/>
//     <section className='Managementpage'>
//     <div className='manage-header'>
//       <div className="text">Management</div>
//       <button className='Add-user-bt' onClick={() => {setModalOpen(true);}}>Add User</button>
//       {modalOpen && <Modal setOpenModal={setModalOpen} />}
//       </div>
//       <table className='tableuser'>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Username</th>
//             <th>Id User</th>
//             <th>Edit User</th>
//             <th>Delete User</th>
//           </tr>
//         </thead>
//         <tbody>
//           {listAccounts}
//         </tbody>
//     </table>
//   </section>
//   </div>
// }
// export default Management;
import React,{ useState , useEffect } from 'react';
import './ManageDepartmentQamIdea.css';
import ModalMngDepQamIdea from './idea/ModalMngDepQamIdea';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { Url } from '../URL';



function ManageDepartmentQamIdea () {
    const [ModalMngDepQamIdeaOpen, setModalMngDepQamIdea] = useState(false);
    const [postHome, setpostHome] = useState([]);
    const [ viewIdeas , setviewIdea]=useState({})
    useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };

      fetch(Url+"/api/Posts/PostFeedSortByCreatedDate", requestOptions)
          .then(response => {
              if (response.ok) {
                  return response.json()
              } else {
                  throw new Error(response.status)
              }
          })
          .then(data => {
            setpostHome(data)
          })
          .catch(error => console.log('error', error));
  }, [])

  const viewIdea = (data)=>{
    setModalMngDepQamIdea(true)
    setviewIdea(data)
  }
  const listQACidea = postHome.map(data => (
    <tr key={data.postId}>
      <td>{data.title}</td>
      <td>{data.username}</td>
      <td>{data.title}</td>
      <td>{data.Department}</td>
      <td>
        <button className='View' onClick={() => viewIdea(data)}>View</button>
        
      </td>
    </tr>
  ))
	return <div>
    <Navbar/>
    <section className='Managementpage'>

    <div className='buttonMana'>
    <Link to='/ManageDepartmentQamAccount'><button type='button' className='buttonAccount'>Account</button></Link>
        <Link to='/ManageDepartmentQamIdea'><button type='button' className='buttonDeadline'>Idea</button></Link>
        <Link to='/ManageDepartmentQamDepartment'><button type='button' className='buttonDeadline'>Department</button></Link>
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
          <th>Title</th>
          <th>Message</th>
          <th>View</th>
        </tr>
        </thead>
        <tbody>
        {listQACidea}
        {ModalMngDepQamIdeaOpen && <ModalMngDepQamIdea setOpenModalMngDepQamIdea={setModalMngDepQamIdea} data={viewIdeas}/>}
        </tbody>
    </table>
  </section>
  </div>
}
export default ManageDepartmentQamIdea;
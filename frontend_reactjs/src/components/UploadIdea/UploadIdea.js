import React, { useState, useEffect } from 'react';
import './UploadIdea.css';
import Navbar from '../Navbar';
import ModalPolicy from './Policy/ModalPolicy';


function UploadIdea() {
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [Desc, setDesc] = useState('');
  const [IsAnonymous, setIsAnonymous] = useState(false);
  const [IsAssigned] = useState(false);
  const [files, setfiles] = useState('');
  const [Topics, setTopics] = useState([]);
  const [alltag, setalltag] = useState([]);
  const [cateselect, setcateselect] = useState('')
  const [topicselect, settopicselect] = useState('')
  const [modalOpen, setModalOpen] = useState(false);

  const sumbmitidea = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("desc", Desc);
    formdata.append("isAnonymous", IsAnonymous);
    formdata.append("isAssigned", IsAssigned);
    formdata.append("listCategoryId", cateselect);
    formdata.append("topicId", topicselect);
    formdata.append("files", files, files.name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/api/Posts/CreatePost", requestOptions)
      .then(response => {
        response.json()})
      .then(result => {console.log(result)
      alert('Summit success')})
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/api/Topics/GetAllTopic", requestOptions)
      .then(response => response.json())
      .then(data => {
        setTopics(data)
        // settopicId(data)
      })
      .catch(error => console.log('error', error))
  }, [])

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

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
  }, [])


  const listTopics = Topics.map(data => (
    <option key={data.topicId} value={data.topicId}>{data.topicName}</option>
  ))

  const listCategory = alltag.map(data => (
    <option key={data.categoryId} value={data.categoryId}>{data.categoryName}</option>
  ))
  return (
    <div>
    <Navbar/>
    <section className='UploadIdeapage'>
        <div className="text">UPLOAD IDEA</div>
        <div className='IdeaFrom'>
            
            {/* <div className='InputIdea'>Upload your Idea</div> */}
            <div className='Ideainput'>
            
                <span className="inputtitle">Title</span>
                <input className='IdeaTile1' value={title} onChange={e => settitle(e.target.value)}></input>
                <span className="inputtitle">Content</span>
                <input className='IdeaTile2' value={content} onChange={e => setcontent(e.target.value)}></input>
            </div>
            <div className='Ideainput'>
                <span className="inputtitle">Description</span>
                <textarea className='IdeaDct' placeholder="Write something..." value={Desc} onChange={e => setDesc(e.target.value)}></textarea>
            </div>
            <div className='styleofpost'>
            <select name="posttyle" id="posttyle">
                <option value="public">public</option>
                <option  value="private" onChange={() => setIsAnonymous(true)}>private</option>
            </select>
            </div>
            <div className='styleofcategory'>
            <select name="category" id="category" value={topicselect} onChange={e => settopicselect(e.target.value)}>
             <option value=''></option>
            {listTopics}
            </select>
            </div>
            <div className='styleofcategory'>
            <select name="category" id="category" value={cateselect} onChange={e => setcateselect(e.target.value)}> 
            <option value=''></option>
               {listCategory}
            </select>
            </div>
            <div className='InputTitle'>
                <span className="inputtitle">Input File: </span>
                <input type="file" id="myfile" name="myfile" onChange={e => setfiles(e.target.files[0])}></input>
            </div>
            <button className='SubmitIdea1' onClick={sumbmitidea}>Submit</button>
      {modalOpen && <ModalPolicy setOpenModal={setModalOpen} />}
            {/* <button className='SubmitIdea'>Submit</button> */}
            <button className='CancelButton'>Cancel</button>
        </div>
    </section>
</div>
  )
}

export default UploadIdea
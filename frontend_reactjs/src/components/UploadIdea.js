import React,{ useState } from 'react';
import '../css/UploadIdea.css';
import Navbar from './Navbar';
import ModalPolicy from './ModalPolicy';


function UploadIdea() {
    const [modalOpen, setModalOpen] = useState(false);
  return (
<div>
    <Navbar/>
    <section className='UploadIdeapage'>
        <div className="text">UPLOAD IDEA</div>
        <div className='IdeaFrom'>
            
            {/* <div className='InputIdea'>Upload your Idea</div> */}
            <div className='Ideainput'>
            
                <span className="inputtitle">Title</span>
                <input className='IdeaTile1'></input>
                <span className="inputtitle">Content</span>
                <input className='IdeaTile2'></input>
            </div>
            <div className='Ideainput'>
                <span className="inputtitle">Description</span>
                <textarea className='IdeaDct' placeholder="Write something..."></textarea>
            </div>
            <div className='styleofpost'>
            <select name="posttyle" id="posttyle">
                <option value="public">public</option>
                <option value="private">private</option>
            </select>
            </div>
            <div className='styleofcategory'>
            <select name="category" id="category">
                <option value="Category1">Category1</option>
                <option value="Category2">Category2</option>
            </select>
            </div>
            <div className='styleofcategory'>
            <select name="category" id="category">
                <option value="Category1">Topic1</option>
                <option value="Category2">Topic2</option>
            </select>
            </div>
            <div className='InputTitle'>
                <span className="inputtitle">Input File: </span>
                <input type="file" id="myfile" name="myfile" ></input>
            </div>
            <button className='SubmitIdea1' onClick={() => {setModalOpen(true);}}>Submit</button>
      {modalOpen && <ModalPolicy setOpenModal={setModalOpen} />}
            {/* <button className='SubmitIdea'>Submit</button> */}
            <button className='CancelButton'>Cancel</button>
        </div>
    </section>
</div>
  )
}

export default UploadIdea
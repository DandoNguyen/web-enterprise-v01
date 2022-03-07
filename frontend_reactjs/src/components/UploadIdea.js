import React from 'react';
import '../css/UploadIdea.css';


function UploadIdea() {
  return (
<div>
    <section className='UploadIdeapage'>
        <div className="text">Upload Idea</div>
        <div className='IdeaFrom'>
            <div className='InputIdea'>Upload your Idea</div>
            <div className='Ideainput'>
                <span className="inputtitle">Title: </span>
                <input className='IdeaTile'></input>
            </div>
            <div className='Ideainput'>
                <span className="inputtitle">Description: </span>
                <textarea className='IdeaDct' placeholder="Write something..."></textarea>
            </div>
            <div className='styleofpost'>
            <select name="posttyle" id="posttyle">
                <option value="public">public</option>
                <option value="private">private</option>
            </select>
            </div>
            <div>
                <span className="inputtitle">Input File: </span>
                <button>Select a File</button>
            </div>
            <button className='SubmitIdea'>Submit</button>
        </div>
    </section>
</div>
  )
}

export default UploadIdea
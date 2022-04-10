import React,{ useState } from 'react';
import '../css/UploadIdea.css';
import Navbar from './Navbar';


function UploadIdea() {
    const[title,settitle]= useState('')
    const[content,setcontent]= useState('')
    const[Desc,setDesc]= useState('')
    const[IsAnonymous,setIsAnonymous]=useState(false)
    const[IsApproved,setIsApproved]=useState(false)
    const[IsAssigned,setAssigned]=useState(false)
    const[Categories,setCategoties]=useState( )
    const[files,setfiles]=useState( )
    const[filesPicked,setfilePicked]=useState(false)
    const sumbmitidea = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));

            var raw = JSON.stringify({
                "title": title,
                "content": content,
                "Desc": Desc,
                "IsAnonymous":IsAnonymous,
                "IsApproved":IsApproved,
                "IsAssigned":IsAssigned,
                "Categories":Categories,
                "files":files
              });;

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://localhost:5001/api/Posts", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                localStorage.setItem("accessToken", result.token)
                alert("thanh cong")
              })
            .catch(error => console.log('error', error));
    }
  return (
<div>
    <Navbar/>
    <section className='UploadIdeapage'>
        <div className="text">Upload Idea</div>
        <div className='IdeaFrom'>
            <div className='InputIdea'>Upload your Idea</div>
            <div className='Ideainput'>
                <span className="inputtitle">Title: </span>
                <input className='IdeaTile' value={title} onChange={e => settitle(e.target.value)}></input>
            </div>
            <div className='Ideainput'>
                <span className="inputtitle">Content: </span>
                <input className='IdeaTile' value={content} onChange={e => setcontent(e.target.value)}></input>
            </div>
            <div className='Ideainput'>
                <span className="inputtitle">Description: </span>
                <textarea className='IdeaDct' placeholder="Write something..." value={Desc} onChange={e => setDesc(e.target.value)}></textarea>
            </div>
            <div className='styleofpost'>
            <select name="posttyle" id="posttyle">
                <option value="public">public</option>
                <option value="private">private</option>
            </select>
            </div>
            <div>
                <span className="inputtitle">Input File: </span>
                <input type="file" id="myfile" name="myfile"></input>
            </div>
            <button className="CancelIdea">Cancel</button>
            <button className='SubmitIdea' onClick={sumbmitidea}>Submit</button>
        </div>
    </section>
</div>
  )
}

export default UploadIdea
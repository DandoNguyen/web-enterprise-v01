import React,{useState} from "react";
import "./ModalDeadlineCreate.css";
import {Url} from '../../URL'

function ModalDeadlineCreate({ setOpenModalDeadlineCreate }) {
  const [reloadpage,setreloadpage]= useState(false);
  const[topicName,settopicName]= useState('');
  const[closureDate,setclosureDate]= useState('');
  const[finalClosureDate,setfinalClosureDate]= useState('');
  const[topicDesc,settopicDesc]=useState('')

  const Summittopic = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "topicName": topicName,
          "topicDesc": topicDesc,
          "closureDate": closureDate,
          "finalClosureDate": finalClosureDate
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(Url+"/api/Topics/CreateTopic", requestOptions)
          .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.status)
                
            }
        })
          .then(result =>{
            setOpenModalDeadlineCreate(false) 
            console.log(result);
            setreloadpage(!reloadpage)
          })
          .catch(error => {console.log('error', error)
          alert('Full information needed')
          
          
        });
        }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setOpenModalDeadlineCreate(false);}} > X </button>
        </div>
        <div className="modaltitle">Add Deadline</div>
        <div className="modalinput">
            <span className="inputtitle">Deadline Title</span>
            <br/>
            <input className="inputvl" value={topicName} onChange={e => settopicName(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">topic Desc</span>
            <br/>
            <input className="inputvl" value={topicDesc} onChange={e => settopicDesc(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Closure Date</span>
            <br/>
            <input type = "date" className="inputvl" value={closureDate} onChange={e => setclosureDate(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Final Closure Date</span>
            <br/>
            <input type = "date" className="inputvl" value={finalClosureDate} onChange={e => setfinalClosureDate(e.target.value)}></input>
        </div>

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModalDeadlineCreate(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={Summittopic} >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeadlineCreate
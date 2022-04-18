import React,{useState, useEffect} from "react";
import "./ModalDeadlineEdit.css";
import {Url} from '../../URL'

function ModalDeadlineEdit({ setopenModalDeadlineEdit , data}) {
  const[topicName,settopicName]= useState('');
  const[closreDate,setclosreDate]= useState('');
  const[finalClosureDate,setfinalClosureDate]= useState('');
  const [reloadpage,setreloadpage]= useState(false)
  
  useEffect(() => {
    settopicName(data.topicName);
    const day = new Date(data.closreDate)
    const closreDate = `${day.getFullYear()}-${('0' + (day.getMonth()+1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}T${('0' + day.getHours()).slice(-2)}:${('0' + day.getMinutes()).slice(-2)}` 
    setclosreDate(closreDate);
    const day2 = new Date(data.finalClosureDate)
    const finalClosureDate = `${day2.getFullYear()}-${('0' + (day2.getMonth()+1)).slice(-2)}-${('0' + day2.getDate()).slice(-2)}T${('0' + day2.getHours()).slice(-2)}:${('0' + day2.getMinutes()).slice(-2)}`
    setfinalClosureDate(finalClosureDate)
  }, [])
  /// update topic
  const Updatetopic = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "topicId": data.topicId,
      "topicName": topicName,
      "closureDate": closreDate,
      "finalClosureDate": finalClosureDate
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(Url+"/api/Topics/UpdateTopic", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setopenModalDeadlineEdit(false)
        setreloadpage(!reloadpage)
      })
      .catch(error => {
        console.log('error', error)
        setopenModalDeadlineEdit(false)
        setreloadpage(!reloadpage)
        alert('Full information needed')
      });
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className="xbtn" onClick={() => {setopenModalDeadlineEdit(false);}} > X </button>
        </div>
        <div className="modaltitle">Edit Deadline</div>
        
        <div className="modalinput">
            <span className="inputtitle">Deadline Title</span>
            <br/>
            <input className="inputvl" value={topicName} onChange={e => settopicName(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Closure Date</span>
            <br/>
            <input type = "date" className="inputvl" value={closreDate} onChange={e => setclosreDate(e.target.value)} ></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">Final Closure Date</span>
            <br/>
            <input type = "date" className="inputvl" value={finalClosureDate} onChange={e => setfinalClosureDate(e.target.value)}></input>
        </div>
        

        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setopenModalDeadlineEdit(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={Updatetopic}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeadlineEdit
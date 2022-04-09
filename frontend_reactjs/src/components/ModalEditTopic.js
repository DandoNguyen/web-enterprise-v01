import React,{useState} from 'react'

function ModalEditTopic({ setOpenModaltopic }) {
    const[topicName,settopicName]= useState('');
    const[closureDate,setclosureDate]= useState('');
    const[finalClosureDate,setfinalClosureDate]= useState('');
    const[topicId,settopicId]=useState('')

    const Updatetopic = () => {
        var myHeaders = new Headers();

        var raw = JSON.stringify({
            "topicId": topicId,
            "topicName": topicName,
            "closureDate": closureDate,
            "finalClosureDate": finalClosureDate
          });

            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://localhost:5001/api/Topics/UpdateTopic", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn" >
          <button className="xbtn" onClick={() => {setOpenModaltopic(false);}} > X </button>
        </div>
        <div className="modaltitle">Modal Edit Topic</div>
        <div className="modalinput">
            <span className="inputtitle">topic Name</span>
            <br/>
            <input className="inputvl" value={topicName} onChange={e => settopicName(e.target.value)}></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">closure Date</span>
            <br/>
            <input className="inputvl" type="datetime-local" value={closureDate} onChange={e => setclosureDate(e.target.value)} ></input>
        </div>
        <div className="modalinput">
            <span className="inputtitle">final Closure Date</span>
            <br/>
            <input className="inputvl" type="datetime-local" value={finalClosureDate} onChange={e => setfinalClosureDate(e.target.value)} ></input>
        </div>
        <div className="Modalfooter">
          <button className="cancelBtn" onClick={() => {setOpenModaltopic(false);}} id="cancelBtn">Cancel</button>
          <button className="SubmitBtn" onClick={Updatetopic}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ModalEditTopic
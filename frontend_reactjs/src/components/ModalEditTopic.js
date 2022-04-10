import React,{useState , useEffect} from 'react'

function ModalEditTopic({ setOpenModaltopic , data }) {
    const[topicName,settopicName]= useState('');
    const[closureDate,setclosureDate]= useState('');
    const[finalClosureDate,setfinalClosureDate]= useState('');
    
    useEffect(() => {
      settopicName(data.topicName);
      const day = new Date(data.closureDate)
      const closedate = `${day.getFullYear()}-${('0' + (day.getMonth()+1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}T${('0' + day.getHours()).slice(-2)}:${('0' + day.getMinutes()).slice(-2)}` 
      setclosureDate(closedate);
      const day2 = new Date(data.finalClosureDate)
      const finalClosureDate = `${day2.getFullYear()}-${('0' + (day2.getMonth()+1)).slice(-2)}-${('0' + day2.getDate()).slice(-2)}T${('0' + day2.getHours()).slice(-2)}:${('0' + day2.getMinutes()).slice(-2)}`
      setfinalClosureDate(finalClosureDate)
    }, [])
    console.log(closureDate)
    // const[topicId,settopicId]=useState('')
    const Updatetopic = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization" , "Bearer "+ localStorage.getItem("accessToken"));
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "topicId": data.topicId,
        "topicName": topicName,
        "closreDate": closureDate,
        "finalClosureDate": finalClosureDate
      });
      
      var requestOptions = {
        method: 'PUT',
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
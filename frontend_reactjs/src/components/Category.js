import React,{useState} from 'react'
import Navbar from './Navbar'
import '../css/Category.css'

function Category() {
    const[CategoryName,setCategoryName]=useState('')
    const Summittag = () => {
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CategoryName": CategoryName
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://localhost:5001/api/Category/CreateTag", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  return (
    <div>
        <Navbar/>
        <section className="Category">
            <div className='text'>Category</div>
            <div>
                <span>Category</span>
                <input value={CategoryName} onChange={e => setCategoryName(e.target.value)}></input>
                <button onClick={Summittag}>Summit</button>
            </div>
        </section>
        {/* <section className='tableCategory' >
        <table >
        <thead>
          <tr>
            <th>Topic</th>
            <th>Closure Date</th>
            <th>Final Closure Date</th>
            <th>Edit Topic</th>
            <th>Delete Topic</th>
          </tr>
        </thead>
        <tbody>
          {listCategory}
        </tbody>
    </table>
        </section> */}
    </div>
  )
}

export default Category
import React from 'react';




export default class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "user" : {}
        }
    }
    loadDataProfile = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization" , "Bearer" + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            
        fetch("https://localhost:5001/api/AuthManagement/login", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    logout =() =>{
        localStorage.removeItem("accessToken")
        alert("logout success")
    }
    render() {
        return<div>
            <div>Name : {this.state.name}</div>
            <div>Email : {this.state.email}</div>
            <button type="button" onClick={this.logout}>Logout</button>
        </div>
    }
}
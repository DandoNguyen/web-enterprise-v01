import React from 'react';
import '../css/Login.css';



export default class Login extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state={
    //         "email" : "",
    //         "password" : ""
    //     }
    // }
    
    
    // setparam = (event) => {
    //     this.setState({[event.target.name] : event.target.value})
    // }

    // login = () => {
    //         var myHeaders = new Headers();
    //         myHeaders.append("Authorization", "Basic TmFtQGdtYWlsLmNvbTpOQG0xMjM=");
    //         myHeaders.append("Content-Type", "application/json");

    //         var raw = JSON.stringify({
    //             "email": this.state.email,
    //             "password": this.state.password
    //             });


    //         var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //         };

    //     fetch("https://localhost:5001/api/AuthManagement/Login", requestOptions)
    //     .then(response => {
    //         console.log(response)
    //         if (response.ok) {
    //             return response.text()
    //         }
    //         throw Error(response.status)
    //     })
    //     .then(result =>{ 
    //         console.log(result)
    //         localStorage.setItem("accessToken", result.Token)
    //         console.log(result.Token)
    //         alert("Thanh cong")

    //     })
    //     .catch(error => { 
    //         console.log('error', error)
    //         alert("Email,password are wrong")
    // });;
    // }
    render(){
        return  <div>
        <link rel="stylesheet" href="css/style.css" />
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
        <title>Sign in</title>
        <div className="main">
          <p className="sign" align="center">Sign in</p>
          <form className="form1">
            <input className="un " type="text" align="center" placeholder="Username" />
            <input className="pass" type="password" align="center" placeholder="Password" />
            <a className="submit" align="center">Sign in</a>
            <p className="forgot" align="center"><a href="#">Forgot Password?</a></p><a href="#">
            </a></form></div><a href="#">
        </a></div>
    }
}

import React from 'react';
import '../css/Login.css';



export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "email" : "",
            "password" : "",
            isLogin: localStorage.getItem("accessToken") != null
        }
    }
    

    setparam = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    login = () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic TmFtQGdtYWlsLmNvbTpOQG0xMjM=");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
                });


            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

        fetch("https://localhost:5001/api/AuthManagement/Login", requestOptions)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json()
            }
            throw Error(response.status)
        })
        .then(result =>{ 
            console.log(result)
            localStorage.setItem("accessToken", result.accessToken)
            alert("Thanh cong")
            this.setState({ isLogin : true })
            this.props.history.push("/Home");
        })
        .catch(error => { 
            console.log('error', error)
            alert("Email,password are wrong")
    });;
    }
    render(){
        return <form className='loginpage'>
            <div className="login-form">
            <div className="title">Welcome</div>
            <div className="loginname"> 
                <label className="username" >Email</label>
                <input className="name" type="text" name="email" onChange={this.setparam}/>
            </div>
            <div className="loginpass"> 
                <label className="userpassword" >Password</label>
                <input className="pass" type="text" name="password" onChange={this.setparam}/>
            </div>
            <div className="btlogin">
                <button className="loginBT" type='button' onClick={this.login}>Login</button>
                <a href="/Home" className="fgpassword" >for get Password ?</a>
            </div>
            </div>
        </form>
    }
}

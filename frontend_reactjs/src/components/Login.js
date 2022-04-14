import React, { useState, useEffect } from 'react';
import '../css/Login.css';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const Navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("accessToken") != null) {
            Navigate('/Home')
        } else {
            console.log('khong');
        }
    }, [])


    const login = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://localhost:5001/api/AuthManagement/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("accessToken", result.token)
            Navigate('/Home')
        })
        .catch(error => {
            console.log('error', error)
            alert("Email,password are wrong")
            
        })
    }
    // const onLogoutSucces = () => {

    // }
    return (
        <div>
            <div>
                {/* <link rel="stylesheet" href="css/style.css" />
                <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" /> */}
                <title>Sign in</title>
                <div className="main">
                    <p className="sign" align="center">Sign in</p>
                    <form className="form1">
                        <input className="un " type="text" align="center" placeholder="Username" value={email} onChange={e => setemail(e.target.value)} />
                        <input className="pass" type="password" align="center" placeholder="Your Password" value={password} onChange={e => setpassword(e.target.value)} />
                        <button className="submit" align="center" onClick={login}>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
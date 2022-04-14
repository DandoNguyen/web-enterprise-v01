// import React from 'react';
// import '../css/Login.css';
// import Home from './Home';
// // import { useCookies } from 'react-cookie';



// export default class Login extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             "email": "",
//             "password": "",
//             isLogin: localStorage.getItem("accessToken") != null
//         }
//     }


//     // setparam = (event) => {
//     //     this.setState({ [event.target.name]: event.target.value })
//     // }

//     login = () => {
//         var myHeaders = new Headers();
//         // myHeaders.append("Authorization", "Basic TmFtQGdtYWlsLmNvbTpOQG0xMjM=");
//         myHeaders.append("Content-Type", "application/json");
//         var raw = JSON.stringify({
//             "email": this.state.email,
//             "password": this.state.password
//         });


//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         fetch("https://localhost:5001/api/AuthManagement/Login", requestOptions)
//             .then(response => {
//                 console.log(response)
//                 if (response.ok) {
//                     return response.json()
//                 }
//                 throw Error(response.status)
//             })
//             .then(result => {
//                 console.log(result)
//                 localStorage.setItem("accessToken", result.token)
//                 this.setState({ isLogin: true })
//             })
//             .catch(error => {
//                 console.log('error', error)
//                 alert("Email,password are wrong")
//             })
//     }
//     onLogoutSucces = () => {
//         this.setState({ isLogin: false })
//     }
//     render() {
//         return <div>
//             {this.state.isLogin ? <Home key={this.state.isLogin} onLogoutSucces={this.onLogoutSucces} /> :
//                 <div>
//                     <link rel="stylesheet" href="css/style.css" />
//                     <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
//                     <meta name="viewport" content="width=device-width, initial-scale=1" />
//                     <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
//                     <title>Sign in</title>
//                     <div className="main">
//                         <p className="sign" align="center">Sign in</p>
//                         <form className="form1">
//                             <input className="un " type="text" align="center"  placeholder="Username" name="email" onChange={this.setparam} />
//                             <input className="pass" type="password" align="center"  placeholder="Your Password" name="password" onChange={this.setparam} />
//                             <button className="submit" align="center" onClick={this.login}>Sign in</button>
//                         </form>
//                     </div>
//                 </div>
//             }
//         </div>
//     }
// }

import React from 'react'

export default class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            "Email" : "",

        }
    }
    loadDataProfile = () => {
        
    }
    logout = () => {
        localStorage.removeItem("")
        alert("Logout success")
    }
    render(){
        return <div>
            <div>Name: {this.state.nam}</div>
            <button type="button" onClick={this.logout}>Logout</button>
        </div>
    }
}
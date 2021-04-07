import React, { Component } from 'react';
import '../CSS/Login.css';
import logo from "../assets/logo.png";
import profile from "../assets/blank-profile-picture.png";

export class Login extends Component { 
    constructor(props){
        super(props);
        this.state = {
            isLogin:true
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        console.log("in");
    }

    render(){
        return(
           <div id="all">
                <img src={logo} alt="logo" height="100" width="200" id="logo"/>
                
                <div id="center-div">
                    <form
                        action="/"
                        method="get"
                        autoComplete="off"
                        onSubmit={this.onSubmit}
                    >
                        
                        <input
                            type="text"
                            placeholder={"Enter your username..."}
                            name="username"
                        />

                        <br/>

                        
                        <input
                            type="text"
                            placeholder={"Enter your password..."}
                            name="password"
                        />

                        <br/>
                        
                        <button type="submit">Search</button>
                    
                    </form>
                </div>
                

            </div>
        );
    }
       
}

import React, { Component } from 'react';
import '../CSS/Login.css';
import logo from "../assets/black-logo.png";
import profile from "../assets/blank-profile-picture.png";
import Button from 'react-bootstrap/Button';

import Rating from 'react-star-review';
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-el-GR'; // you can import any other locale
 
// <ReactSummernote
// value="Default value"
// options={{
//   lang: 'ru-RU',
//   height: 350,
//   dialogsInBody: true,
//   toolbar: [
//     ['style', ['style']],
//     ['font', ['bold', 'underline', 'clear']],
//     ['fontname', ['fontname']],
//     ['para', ['ul', 'ol', 'paragraph']],
//     ['table', ['table']],
//     ['insert', ['link', 'picture', 'video']],
//     ['view', ['fullscreen', 'codeview']]
//   ]
// }}
// />
export class Login extends Component { 
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSign = this.onChangeSign.bind(this);
    }

    onChangeSign(){
        this.setState({isLogin:!this.state.isLogin});
    }
    
    onSubmit() {
        console.log("in");
    }

    render(){
        const text = this.state.isLogin?"Sign In":"Sign Up";
        const oppositeText = !this.state.isLogin?"Sign In":"Sign Up";

        return(
            <div id="center-div">
                <img src={logo} alt="logo"  width="45%" id="logo"/>
                
    <Rating rating={7.7} count={10}/>
                    <form
                        action="/"
                        method="get"
                        autoComplete="off"
                        onSubmit={this.onSubmit}
                    >
                        <h2>You want to {text}</h2>
                        <br/>
                        <Button variant="primary" onClick={this.onChangeSign}>{oppositeText}</Button>{' '}
                        
                        <br/><br/>
                          


                        <div id="sign_in_div" style={{display: this.state.isLogin ? 'block' : 'none' }}>
                            <h4>Username:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your username..."}
                                name="username"
                            />

                            <br/><br/>

                            <h4>Password:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your password..."}
                                name="password"
                            />

                        </div>
                        

                        <div id="sign_up_div" style={{display: !this.state.isLogin ? 'block' : 'none' }}>
                            <h4>Name:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your name..."}
                                name="name"
                            />

                            <br/><br/>

                            <h4>Username:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your username..."}
                                name="username"
                            />

                            <br/><br/>

                            <h4>Password:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your password..."}
                                name="password"
                            />

                          
                        </div>

                        <br/><br/>
                        <Button type="submit" variant="success">Continue</Button>{' '}

                    </form>
            </div>
        );
    }
       
}

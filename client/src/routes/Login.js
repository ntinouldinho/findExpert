import React, { Component } from 'react';
import '../CSS/Login.css';
import logo from "../assets/black-logo.png";
import Button from 'react-bootstrap/Button';


export class Login extends Component { 
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            name:"",
            username:"",
            password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeSign = this.onChangeSign.bind(this);

        this.onTodoChange = this.onTodoChange.bind(this);
    }


    onTodoChange(e) {
        const name = e.target.name;
        if(name=='name'){
            this.setState({ name: e.target.value });
        }else if(name=="password"){
            this.setState({ password: e.target.value });
        }else if(name=="username"){
            this.setState({ username: e.target.value });
        }
        
        console.log(this.state);
    }
    
    

    componentDidMount() {
        this.callApi()
          .then(res => console.log(res))
          .catch(err => console.log(err));
    }
    
    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    onChangeSign(){
        this.setState({isLogin:!this.state.isLogin});
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
              name: this.state.name, 
              username: this.state.username,
              password: this.state.password
            }),
        });
        
        //const body = await response.text();
    
      };

    render(){
        const text = this.state.isLogin?"Sign In":"Sign Up";
        const oppositeText = !this.state.isLogin?"Sign In":"Sign Up";

        return(
            <div id="center-div">
                <img src={logo} alt="logo"  width="45%" id="logo"/>
                
                    <form
                        action="/"
                        method="get"
                        autoComplete="off"
                        onSubmit={this.handleSubmit}
                    >
                        <h2>You want to {text}</h2>
                        <br/>
                        <Button variant="primary" onClick={this.onChangeSign}>{oppositeText}</Button>{' '}
                        
                        <br/><br/>
                          

                        

                        <div id="sign_up_div">

                            <div  style={{display: !this.state.isLogin ? 'block' : 'none' }}>
                                <h4>Name:</h4>
                                <input
                                    type="text"
                                    placeholder={"Enter your name..."}
                                    name="name"
                                    onChange={e => this.onTodoChange(e)}
                                />

                            </div>
                            
                            <br/>

                            <h4>Username:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your username..."}
                                name="username"
                                onChange={e => this.onTodoChange(e)}
                            />

                            <br/><br/>

                            <h4>Password:</h4>
                            <input
                                type="text"
                                placeholder={"Enter your password..."}
                                name="password"
                                onChange={e => this.onTodoChange(e)}
                            />

                          
                        </div>

                        <br/><br/>
                        <Button type="submit" variant="success">Continue</Button>{' '}

                    </form>
            </div>
        );
    }
       
}

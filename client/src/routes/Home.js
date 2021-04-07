import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeCategory } from "../components/HomeCategory";
import  SearchBar  from "../components/SearchBar.js";
import '../CSS/Home.css';
import logo from "../assets/logo.png";

const Login = () => {

    const history = useHistory();
    const toLogin = (e) => {
        history.push(`/login`);
        e.preventDefault();
    };

    return (
        <input type="button" onClick={toLogin} id="login" value="Login/Register"/>
    );
};



export class Home extends Component { 
    constructor(props){
        super(props);
        this.state = {
            src: ['Mechanic','Doctor','Chef'],
            search: ""
        };
    }

    render(){
        return(
            <div >
                <img src={logo} alt="logo" height="100" width="200"/>
                <Login />
                <SearchBar 
                    value={this.state.search}
                    handleChange={(e)=> this.setState({search:e.target.value})} 
                    placeholder="Search for category" />

                <div className="HomeCategories">{this.state.src.map((item,i) =>  <HomeCategory key={i} name = {item}/>)}</div>
                
            </div>
        );
         
    }
       
    
}

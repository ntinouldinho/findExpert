import React, { Component } from 'react';
import { HomeCategory } from "../components/HomeCategory";
import  SearchBar  from "../components/SearchBar.js";
import '../CSS/Home.css';
import logo from "../assets/logo.png";

export class Home extends Component { 
    constructor(props){
        super(props);
        this.state = {
            src: ['Mechanic','Mechanic','Mechanic'],
            search: ""
        };
    }
    
    render(){
        return(
            <div >
                <img src={logo} alt="logo" height="100" width="200"/>
                <SearchBar 
                    value={this.state.search}
                    handleChange={(e)=> this.setState({search:e.target.value})} 
                    placeholder="Search for category" />

                <div className="HomeCategories">{this.state.src.map((item,i) =>  <HomeCategory key={i} name = {item}/>)}</div>
                
            </div>
        );
         
    }
       
    
}

import React, { Component } from 'react';
import '../CSS/Results.css';
import logo from "../assets/logo.png";

const ProfessionalBlock = ({person}) => {

    return (
        <div className="ProfessionalBlock">
            <img alt="profile pic" className="ProfilePic" src={'https://www.ecpi.edu/sites/default/files/CIV%20Sept%2026.png'}  />
            <h1>Όνομα: {person.name}</h1>           
            <h1>Ειδικότητα: {person.job}</h1>
              
        </div>
    );
};


// <h1>{this.props.match.params.search}</h1>
export class Results extends Component { 
    constructor(props){
        super(props);
        this.state = {
            professionals:[{job:"doctor",name:"kostas"},{job:"paparas",name:"mitsos"}]
        }
    }

    render(){
        return(
           <div>
                <img src={logo} alt="logo" height="100" width="200" id="logo"/>
                <div>{this.state.professionals.map((item,i) =>  <ProfessionalBlock key={i} person = {item}/>)}</div>
            </div>
        );
    }
       
}

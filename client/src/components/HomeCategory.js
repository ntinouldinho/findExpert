import React, { Component } from 'react';  
import '../CSS/Home.css';

import mechanic from '../assets/car_mechanic.jpg';
import doctor from '../assets/doctor.jpg';
import chef from '../assets/chef.jpg';

export class HomeCategory extends Component { 

    renderSwitch(param) {
        switch(param) {
          case 'Mechanic':
            return mechanic;
          case 'Doctor':
            return doctor;
            case 'Chef':
              return chef;
          default:
            return mechanic;
        }
      }
      

    render(){
        return(
            <div className = "HomeCategory" style = {{backgroundImage: 'url(' +  this.renderSwitch(this.props.name) + ')'}}>
                <h3 id="catName" >{this.props.name}</h3> 
            </div>
        );
    }
    
}




import React, { Component } from 'react';  
import '../CSS/Home.css';

import mechanic from '../assets/mechanic.jpg';

export class HomeCategory extends Component { 

    renderSwitch(param) {
        switch(param) {
          case 'Mechanic':
            return mechanic;
          default:
            return mechanic;
        }
      }
      

    render(){
        return(
            <div className = "HomeCategory" style = {{backgroundImage: 'url(' +  this.renderSwitch(this.props.name) + ')'}}>
                {this.props.name}
            </div>
        );
    }
    
}




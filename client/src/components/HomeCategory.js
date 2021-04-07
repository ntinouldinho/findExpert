import React, { Component } from 'react';  
import '../CSS/Home.css';

export class HomeCategory extends React.Component { 
    
    render(){
        return(
            <div className = "HomeCategory" style = {{backgroundImage: 'url(' + this.props.image + ')'}}>
                {this.props.name}
            
            </div>
        );
    }
    
}




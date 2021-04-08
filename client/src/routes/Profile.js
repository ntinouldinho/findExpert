import React, { Component } from 'react';

export class Profile extends Component { 
    constructor(props){
        super(props);
        this.state = {
            name: "Onoma",
            profession: "Epaggelma",
            photo: "Fwtografia",
            reviews: [" ", " "],
            services: [" ", " "],
            cv: "Choose me"
        };
    }

    render(){
        return(
            <div className = "Profile" >
                <header>
                    <h3>{this.state.name}</h3>
                    <h3>{this.state.profession}</h3>
                    <img src={this.state.photo} alt="Profile Picture" height="100" width="200" id="profpic"/>
                    <h3>{this.state.reviews}</h3>
                    <h3>{this.state.services}</h3>
                    <h3>{this.state.cv}</h3>
                </header>
            </div>
        );
    }
    
}
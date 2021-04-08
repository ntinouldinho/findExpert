import React, { Component } from 'react';
import '../CSS/Profile.css';
import logo from "../assets/logo.png";

export class Profile extends Component { 
    constructor(props){
        super(props);
        this.state = {
            name: "Onoma",
            profession: "Epaggelma",
            photo: "Fwtografia",
            reviews: ["4", " 5"],
            services: ["$$ ", " $$"],
            cv: "My CV",
            about: "About me",
            stars: "5 STARS",
            contact: "message",
            appointment: "appointment"
        };
    }

    render(){
        return(
                <div>
                    <div className="header">
                        <div className="picture">
                            {/* <img src={this.state.photo} alt="Profile Picture" height="100" width="200" id="profpic"/> */}
                            <img src={logo} alt="Profile Picture" height="100" width="200" id="profpic"/>
                        </div>
                        <div className="info">
                            {this.state.name}<br></br>
                            {this.state.profession}<br></br>
                            {this.state.stars}<br></br>
                        </div>
                        <div className="aboutme">
                            {this.state.about}
                        </div>
                    </div>

                    <div className="header">
                        <div className="services">
                            {this.state.services}<br></br>
                        </div>
                        <div className="appointment">
                            {this.state.appointment}<br></br>
                        </div>
                        <div className="contact">
                            {this.state.contact}<br></br>
                        </div>
                    </div>
                        
                    <div className="cv"> 
                        {this.state.cv}
                    </div>

                    <div className="reviews"> 
                        {this.state.reviews}
                    </div>

            </div>
        );
    }
}
                     
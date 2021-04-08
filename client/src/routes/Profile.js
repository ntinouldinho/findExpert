import React, { Component } from 'react';
import '../CSS/Profile.css';
import logo from "../assets/logo.png";
import ProfessionalBlock from '../components/ProfessionalBlock.js';
import StarRatingComponent from 'react-star-rating-component';

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
            appointment: "appointment"
        };
    }

    render(){
        return(
            <div> 
                <div className="header">
                    <div className = "grid-container" style={{margin: "15%" }}>
                        <div className="picture">
                            <img src={"https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/car_mechanic.jpg?alt=media&token=23cb2e86-4440-404d-9fdc-53e99eb2a2dc"} alt="Profile Picture" height="100" width="200" id="profpic"/>
                            {/* <img src={logo} alt="Profile Picture" height="100" width="200" id="profpic"/> */}
                        </div>

                        <div className="info">
                            {this.state.name}<br></br>
                            {this.state.profession}<br></br>
                            {this.state.stars}<br></br>
                        </div>

                        <div className="aboutme">
                            {this.state.about}
                        </div>

                        <div className="services">
                                {this.state.services}<br></br>
                        </div>

                        <div className="appointment">
                                {this.state.appointment}<br></br>
                        </div>

                        <div className="cv">
                                {this.state.cv}<br></br>
                        </div>

                        <div className="reviews">
                                {this.state.reviews}<br></br>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}
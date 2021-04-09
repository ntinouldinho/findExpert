import React, { Component } from 'react';
import '../CSS/Profile.css';
import Rating from 'react-star-review';
import { Header } from "../components/Header";

export class Profile extends Component { 
    constructor(props){
        super(props);
        this.state = {
            name: "Giannis Giannou",
            profession: "Ydraylikos",
            photo: "Fwtografia",
            reviews: ["4", " 5"],
            services: ["Service 1", "Service 2"],
            cv: ["Prwptyxiako", "Ph.D."],
            about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            stars: "4.2",
            appointment: ["Rantevou 1 stis 20/4", "Rantevou 2 stis 30/6"]
        };
    }

    render(){
        return(
            <div style ={{backgroundColor: "black"}}> 
                <Header/>
                <div className="core">
                    <div className = "grid-container" style={{margin: "15%" }}>
                        <div className="picture">
                            <img src={"https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/car_mechanic.jpg?alt=media&token=23cb2e86-4440-404d-9fdc-53e99eb2a2dc"} alt="Profile Picture" height="100" width="200" id="profpic"/>
                            {/* <img src={logo} alt="Profile Picture" height="100" width="200" id="profpic"/> */}
                        </div>

                        <div className="info">
                            Name: {this.state.name}<br/>
                            Profession: {this.state.profession}<br/>
                            <div style={{display: "inline-flex"}}>Rating:   <span id="rating"><Rating rating={this.state.stars} count={5} /></span></div><br/>
                        </div>

                        <div className="aboutme">
                            {this.state.about}
                        </div>

                        <div className="services">
                            {this.state.services.map((item, i) => (
                               <div><h1>{item}</h1><br/></div>
                            ))}
                            
                        </div>

                        <div className="appointment">
                            {this.state.appointment.map((item, i) => (
                               <div><h1>{item}</h1><br/></div>
                            ))}
                        </div>

                        <div className="cv">
                            {this.state.cv.map((item, i) => (
                               <div><h1>{item}</h1><br/></div>
                            ))}
                        </div>

                        <div className="reviews">
                            {this.state.reviews.map((item, i) => (
                               <div><h1>{item}</h1><br/></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}
import React, { useState,useRef } from 'react';
import '../CSS/Profile.css';
import Rating from 'react-star-review';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Button from 'react-bootstrap/Button';
import ReactModal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ShowMore from 'react-show-more-button';

class ExampleApp extends React.Component {

    constructor () {
      super();
      this.state = {
        showModal: false,
        time:['7:00-8:00','8:00-9:00','10:00-11:00'],
        selected: -1
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.changeSeleceted = this.changeSeleceted.bind(this);
      this.clickDay = this.clickDay.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }

    clickDay(value, event){
        console.log(event.target.ariaLabel);
        this.setState({ selected: -1 }); //reset all green hours
    }

    clickHour(event){

        event.target.style.backgroundColor = "lightgreen";
    }

    changeSeleceted(i){
        this.setState({ selected: i });
    }

 
    render () {
        
      return (
        <div>
          <Button onClick={this.handleOpenModal} variant="success">Book Appointment</Button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="onRequestClose Example"
             onRequestClose={this.handleCloseModal}
             className="Modal"
          > 
            <div id="modal-content">
        
                <Calendar onClickDay={this.clickDay} id="calendar" />
                <div id="results"> 
                    <h1>Available hours: </h1>
                    <ul>
                        {this.state.time.map((item, i) => (
                            <li onClick={() => this.changeSeleceted(i)} 
                                key={i}
                                style={{backgroundColor: i==this.state.selected?"lightgreen":""}}
                            >
                            {item}
                            </li>

                        ))}
                    </ul>
                </div>
                <div id="modal-choices">
                    <Button id="book-appointment" variant="success">Book</Button>
                </div>
            </div>
          </ReactModal>
        </div>
      );
    }
  }
  
const Info = (props) => {
  
    return (
        <div className="info">
            Name: {props.name}<br/>
            Profession: {props.profession}<br/>
            <div style={{display: "inline-flex"}}>Rating:   <span id="rating"><Rating rating={props.stars} count={5} /></span></div><br/>
            
            <ExampleApp />
        </div>
       
    );

}

const AboutMe = (props) => {


    return (
        <div className="box">
            <h2> About me</h2>
            <ShowMore maxHeight={200}>
                {props.about}
                </ShowMore>
        </div>
        
       
    );

}

const Appointment = (props) => {
  
    return (
        <div className="appointment box">
            <h2> Appointment</h2>
            <ul>
                {props.appointment.map((item, i) => (
                    <h3>{item}</h3>
                ))}
            </ul>
            
        </div>
       
    );

}

const CV = (props) => {
  
    return (
        <div className="cv box">
            <h2> CV </h2>
            {props.cv.map((item, i) => (
                <h1 key={i}>{item}</h1>
            ))}
        </div>
       
    );

}


const Reviews = (props) => {
  
    return (
        <div className="reviews box">
            <h2> Reviews </h2>
            {props.reviews.map((item, i) => (
                 <h1 key={i}>{item}</h1>
            ))}
        </div>
       
    );

}




const Services = (props) => {
  
    return (
        <div className="services box">
            <h2> Services </h2>
             {props.services.map((item, i) => (
            <h1 key={i}>{item}</h1>
        ))}
        </div>
       
    );

}

export class Profile extends React.Component { 

    // const userVideo = useRef();
    

    constructor(props){
        super(props);
        this.state = {
            name: "Giannis Giannou",
            profession: "Ydraylikos",
            photo: "Fwtografia",
            reviews: ["4", " 5"],
            services: ["Service 1", "Service 2"],
            cv: ["Prwptyxiako", "Ph.D."],
            about: "I am passionate about my work. Because I love what I do, I have a steady source of motivation that drives me to do my best. In my last job, this passion led me to challenge myself daily and learn new skills that helped me to do better work. For example, I taught myself how to use Photoshop to improve the quality of our photos and graphics. I soon became the go-to person for any design needs.",
            stars: "4.2",
            appointment: ["Rantevou 1 stis 20/4", "Rantevou 2 stis 30/6"],
            url:"https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/car_mechanic.jpg?alt=media&token=23cb2e86-4440-404d-9fdc-53e99eb2a2dc"
        };
    }

    componentDidMount() {
        console.log("loaded");
    }

    render(){
        return(
            <div style ={{backgroundColor: "lightgrey"}}> 
                <Header/>
                <div className="core">
                    <div className = "grid-container" style={{margin: "15%" }}>
                        <div className="picture">
                            <img src={this.state.url} alt="Profile Picture" height="100" width="200" id="profpic"/>
                        </div>
                       
                        <Info name={this.state.name} profession={this.state.profession} stars={this.state.stars} />

                        <AboutMe about={this.state.about} />

                        <Services services={this.state.services} /> 

                        <CV cv={this.state.cv} />

                        <Reviews reviews={this.state.reviews} />
                        
                    </div>
                </div>
                <Footer />
            </div>   
        )
    }
}
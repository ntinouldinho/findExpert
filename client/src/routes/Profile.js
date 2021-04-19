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
import ShowMoreText from 'react-show-more-text';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 

class ExampleApp extends React.Component {

    constructor () {
      super();
      this.state = {
        showModal: false,
        time:['7:00-8:00','8:00-9:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00'],
        selected: -1,
        html: <p>ffff<em>ff</em></p>
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
        <div className="Profile">
          <Button onClick={this.handleOpenModal} variant="success">Book Appointment</Button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="onRequestClose Example"
             onRequestClose={this.handleCloseModal}
             className="Modal"
             ariaHideApp={false}
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

                    <Button id="cancel-modal" onClick={this.handleCloseModal} variant="danger">Cancel</Button>
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
            {props.name}<br/>
            {props.profession}<br/>
            <div style={{display: "inline-flex"}}>Rating:   <span id="rating"><Rating rating={props.stars} count={5} /></span></div><br/>
            
            <ExampleApp />
        </div>
       
    );

}

const AboutMe = (props) => {


    return (
        <div className="aboutme">
            <h2 id="aboutmetitle"> About me</h2>
            <ShowMoreText  
                lines={3}
                more='Show more'
                less='Show less'>
                { ReactHtmlParser(props.about) }
            </ShowMoreText>
        </div>
        
       
    );

}


const CV = (props) => {
  
    return (
        <div className="cv box">
            <h2> CV </h2>
            <ul>
            {props.cv.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
            </ul>
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
            name: "",
            profession: "",
            reviews: ["4", " 5"],
            services: [],
            cv: [],
            about: "",
            stars: "4.2",
            url:""
        };
    }

    async componentDidMount() {
        try {
          const response = await fetch(`/api/expert/get`);
          const json = await response.json();
          this.setState({ 
                name:json.name+" "+json.surname,
                profession:json.profession,
                about: json.about,
                url:json.photo,
                services:json.services,
                cv:json.cv
            });
        } catch (error) {
        }
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
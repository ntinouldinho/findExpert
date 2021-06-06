import React from 'react';
import '../CSS/Profile.css';
import Rating from 'react-star-review';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Button from 'react-bootstrap/Button';
import ReactModal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ShowMoreText from 'react-show-more-text';
import ReactHtmlParser from 'react-html-parser';
import  { Redirect } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2'

class ExampleApp extends React.Component {

    constructor () {
        super();

        var times = [];
        // for(var i=this.props.start;i<this.props.end;i++){
        //     times.push(i+":00-"+i+":30")
        //     times.push(i+":30-"+(i+1)+":00")
        // }

        this.state = {
            showModal: false,
            time:['7:00-8:00','8:00-9:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00'],
            // selected: this.props.hoursOff,
            // start: this.props.start,
            // end: this.props.end,
            service:0
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.changeSeleceted = this.changeSeleceted.bind(this);
        this.clickDay = this.clickDay.bind(this);
        this.bookAppointment= this.bookAppointment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            const linkParams = window.location.pathname.split("/");
            const expert = linkParams[linkParams.length-1];

            const data = await fetch(`/api/user/get?user=${expert}`);
            const json = await data.json();
        
            let newTimes =[];
        
            for(var i=json.start;i<json.end;i++){
                // var first = i<9?"0"+i:i;
                // var second = i+1<9?"0"+(i+1):i+1;
        
                newTimes.push(i+":00-"+i+":30")
                newTimes.push(i+":30-"+(i+1)+":00")
            }
        
            this.setState({
                start: json.start,
                end: json.end,
                hoursOff : json.hoursOff,
                time:newTimes,
                day:"Jun 13 2021"
            });
    
        } catch (error) {}
      }

    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleChange(event) {
        this.setState({ service: event.target.selectedIndex });
    }
    

    async bookAppointment (){

        var flag=0;

        await fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            flag=1;
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          alert("You must be signed in to book an appointment")
        });

        if(flag){
            const response = await fetch(`/api/decode`);
            const json = await response.json();
            const user = json.user;
            
            console.log(json);
            const time = this.state.time[this.state.selected];
            const service = this.state.service;

            const linkParams = window.location.pathname.split("/");
            const expert = linkParams[linkParams.length-1];

            console.log(this.props.services[this.state.service]);
            fetch('/api/appointment/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    customer: user, 
                    expert:expert,
                    time:time,
                    service:service
                  }),
              })
              .then(res => {
                  if (res.status === 200) {
                    Swal.fire({  
                        title: 'Success!',  
                        text: 'Your appointment has been created',
                        icon: 'success'
                      }); 
                    // window.location.href = "/"
                  } else {
                    const error = new Error(res.error);
                    throw error;
                  }
                })
                .catch(err => {
                  console.error(err);
                  alert('Error logging in please try again');
                });
      
            


        }
        
  
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }

    clickDay(value, event){
        const day = value.toString().substring(4,15);

        console.log(day);
        console.log(this.state.hoursOff[day])
        let newTimes =[];
        for(var i=this.state.start;i<this.state.end;i++){
            const first = i+":00-"+i+":30";
            const second = i+":30-"+(i+1)+":00";

            if(this.state.hoursOff[day]){
                const re = !this.state.hoursOff[day].includes(first)?newTimes.push(first):""
                
                const r = !this.state.hoursOff[day].includes(second)?newTimes.push(second):""
            }else{
                newTimes.push(first);
                newTimes.push(second)
            }
        }
        this.setState({ selected: -1, time:newTimes}); //reset all green hours
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
                                style={{backgroundColor: i===this.state.selected?"lightgreen":""}}
                            >
                            {item}
                            </li>

                        ))}
                    </ul>
                </div>

                <div id="modal-services">          
                    <label htmlFor="services">Choose a service:</label>
                    <select id="services" onChange={this.handleChange}>
                    {this.props.services.map((x, i) => {
                        return(
                            <option>{x.title + ", Price:"+x.price+"€"}</option>
                        )
                    })}
                    </select>
                </div>


                <div id="modal-choices">
                    <Button id="book-appointment" onClick={this.bookAppointment} variant="success">Book</Button>

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
            
            <ExampleApp services={props.services} start={props.start} end={props.end} hoursOff={props.hoursOff} />
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
                <li key={i}>{item.cv}</li>
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
                <div style={{border:'1px black solid',marginBottom:'10px',textAlign:'left',borderRadius:'10px'}} key={i}>
                    <Rating rating={item.grade} count={5} />
                    <span>{item.name} {item.date}</span> 
                    <br/>{item.comment}
                </div>
            ))}

            
        </div>
       
    );

}




const Services = (props) => {
  
    return (
        <div className="services box">
            <h2> Services </h2>
            <ul>
            {props.services.map((x, i) => {
                return(
                    <li>{x.title + ", Τιμή:"+x.price+"€"}</li>
                )
            })}
            
            </ul>
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
            reviews: [{name:"kostas",grade:4, comment:"I was very satisfied with Kostas he did an excellent job.",date:"21/04/2021"}, {name:"mitsos",grade:4.5, comment:"Kostas delivers as promised and does his best help you",date:"21/04/2021"}],
            services: [],
            cv: [],
            about: "",
            stars: "3.2",
            url:"",
            start:0,
            end:0,
            hoursOff:[]
        };
    }

    async componentDidMount() {
        try {
            const linkParams = window.location.href.split("/");
            const expert = linkParams[linkParams.length-1];
            const response = await fetch(`/api/user/get?user=${expert}`);
            const json = await response.json();
            this.setState({ 
                    name:json.name,
                    profession:json.profession,
                    about: json.about,
                    url:json.photo,
                    services:json.services,
                    cv:json.cv,
                    stars:json.rating,
                    start:json.start,
                    end:json.end,
                    hoursOff:json.hoursOff
                });
        } catch (error) {
        }
    }


    render(){
        return(
            <div style ={{backgroundColor: "lightgrey"}}> 
                <Header/>
                <div className="core">
                    <div className = "grid-container">
                        <div className="picture">
                            <img src={this.state.url} alt="Profile" height="100" width="200" id="profpic"/>
                        </div>
                       
                        <Info name={this.state.name} profession={this.state.profession} stars={this.state.stars} services={this.state.services} start={this.state.start} end={this.state.end} hoursOff={this.state.hoursOff}/>

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
import React, { Component } from "react";
import "../CSS/Profile.css";
import "../CSS/EditProfile.css";
import Rating from "react-star-review";
import { Header } from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import ReactModal from 'react-modal';
import Calendar from 'react-calendar';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import ListAdder from "../components/ListAdder";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2'
// import console from "node:console";

class ExampleApp extends React.Component {

  constructor () {
    super();
    var times = [];
    for(var i=9;i<19;i++){
      var first = i<9?"0"+i:i;
      var second = i+1<9?"0"+(i+1):i+1;

      times.push(first+":00-"+first+":30")
      times.push(first+":30-"+second+":00")
    }
    this.state = {
      showModal: false,
      time:times,
      selected: {"start":["ff"]},
      service:0,
      day:"start",
      html: <p>ffff<em>ff</em></p>,
      show:'none'
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.changeSeleceted = this.changeSeleceted.bind(this);
    this.clickDay = this.clickDay.bind(this);
    this.updateCalendar= this.updateCalendar.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.selectColor = this.selectColor.bind(this);
    this.dayOff = this.dayOff.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }

  dayOff(){
    let array = this.state.selected;
    
    array[this.state.day] = [...this.state.time];

    console.log(array)
    this.setState({selected : array})
  }
  
  handleChange(event) {
      this.setState({ service: event.target.selectedIndex });
  }

  selectColor(i) {
    let array = this.state.selected[this.state.day];

    return array.includes(this.state.time[i])?"red":""
  }
  

  async updateCalendar (){

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
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  clickDay(value, event){
    this.setState({show:""})
    let date = value.toString().substring(4,15);
    this.setState({ day: date }); //reset all green hours

    let selected = this.state.selected;

    if(!selected[date]){
      selected[date] = []
      this.setState({selected : selected })
    }
  }

  clickHour(event){

      event.target.style.backgroundColor = "lightgreen";
  }

  changeSeleceted(i){

    let array  = this.state.selected;
    const time = this.state.time;

    const index = array[this.state.day].indexOf(time[i]);

    if(index === -1){
      array[this.state.day].push(time[i])
    }else{
      array[this.state.day].splice(index,1)
    }
    
    this.setState({ selected: array });
  }


  render () {
      
    return (
      <div className="Profile">
        <div id="modal-content">
          <Calendar onClickDay={this.clickDay} id="calendar" />
          <div id="results" style={{ display: this.state.show }}>
            <h1>Available hours: </h1>
            <div className="hourDetails">
              <span>
                <input
                  id="start"
                  type="number"
                  defaultValue="9"
                  min="0"
                  max="23"
                  onChange = {(e)=>{this.setState({ start:e.target.value})}}
                />
                <br></br>
                <label htmlFor="start">Start</label>
              </span>
              <span>
                <input
                  id="end"
                  type="number"
                  defaultValue="19"
                  min="1"
                  max="24"
                  onChange = {(e)=>{this.setState({ end:e.target.value})}}
                />
                <br></br>
                <label htmlFor="end">Until</label>
              </span>
            </div>
              <Button onClick={this.dayOff} variant="success" id="dayoff">
                Day Off
              </Button>
            <ul>
              {this.state.time.map((item, i) => (
                <li
                  onClick={() => this.changeSeleceted(i)}
                  key={i}
                  style={{
                    backgroundColor: this.selectColor(i),
                    borderColor: this.selectColor(i),
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="modal-choices">
            <Button
              id="book-appointment"
              onClick={this.updateCalendar}
              variant="success"
            >
              Update
            </Button>

            <Button
              id="cancel-modal"
              onClick={this.handleCloseModal}
              variant="danger"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export class EditProfile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        id: "",
        name: "",
        profession: "",
        photo: "",
        services: {}, //nonCustom
        cv: {},
        about:"",
        stars: "4.2", //nonCustom
        appointment: "appointment", //nonCustom
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(
              ""
            )
          )
        ),
      };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/decode`);
      const jsan = await response.json();
      const user = jsan.user;
      const data = await fetch(`/api/user/get?user=${user}`);
        const json = await data.json();
        console.log(jsan.user);
        this.setState({
          id:jsan.user,
          name: json.name + " " + json.surname,
          profession: json.profession,
          about: json.about,
          photo: json.photo,
          services: json.services,
          cv: json.cv,
          editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(
                json.about
              )
            )
          )
      });
    } catch (error) {}
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
    });
  }


  async handleUpdate (e){     //prepei na ta apothikeyei prwta kapou
    e.preventDefault();
    let array  = this.state.name.split(' ');
    const name = array[0];
    const surname = array[1];

    const response = await fetch(`/api/decode`);
      const jsan = await response.json();
      const user = jsan.user;

    await this.setState({ 
      name: name, 
      surname: surname,
      about: draftToHtml( convertToRaw(this.state.editorState.getCurrentContent())),
      expert: user
    })

    var data =Object.assign({}, this.state);

    delete data.editorState;

    await fetch("/api/expert/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          // window.location.reload()
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };


  render() {
    const editorState = this.state.editorState;
    return (
      <div>
        <Header />

        <div className="core">
          <div className="grid-container-edit">
            <img
              className="picture"
              src={
                "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/plumber.jpg?alt=media&token=9f739649-cad2-4582-b045-9de224f7bb0b"
              }
              alt="Profile"
              height="100"
              width="200"
              id="profpic"
            />

            {/* <input className="AddPicture" type="file" name="asda"></input> */}

            <div className="AddName">
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                defaultValue={this.state.name}
                disabled
              ></input>
            </div>

            <div className="AddProfession">
              <label htmlFor="profession">Profession: </label>
              <input
                id="profession"
                type="text"
                placeholder="Profession"
                defaultValue={this.state.profession}
                disabled
              ></input>
            </div>

            <Rating
              className="RatingOnEdit"
              rating={this.state.stars}
              count={5}
            />

            <div className="EditAboutMe">
              <h1>About Me</h1>
              <Editor
                editorState={editorState}
                
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>

            <div className="AddServices">
              <h1>Services</h1>
              <ListAdder type="services" value={this.state.services} />
            </div>

            <div className="AddCV">
              <h1>My CV</h1>
              <ListAdder type="cv" value={this.state.cv} />
            </div>
              
            <div className="Calendar">
              <ExampleApp />
            </div>
           
          </div>
          <Button id="updatebtn" onClick={this.handleUpdate} variant="success">
            Update Profile
          </Button>
        </div>
      </div>
    );
  }
}
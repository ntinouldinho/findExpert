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
// import console from "node:console";

export class EditProfile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        id: "",
        name: "",
        profession: "",
        photo: "",
        services: ["$$ ", " $$"], //nonCustom
        cv: "",
        about:"",
        stars: "4.2", //nonCustom
        appointment: "appointment", //nonCustom
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(
              "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero. </p>"
            )
          )
        ),
      };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.updateState = this.updateState.bind(this)
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
      });
    } catch (error) {}
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
    });
  }


    updateState(input, type){
      // switch(type){
      //   case "name":
      //     this.setState({name: input.value})
      // //   case "profession":
      //     this.setState({profession: input.value})
      //   default:
      //     console.log("nothing changed")
      //   // case "aboutme":
      //   //   this.setState({aboutme: input.value})
      // }
    };


  handleUpdate = async (e) => {     //prepei na ta apothikeyei prwta kapou
    e.preventDefault();
    let array  = this.state.name.split(' ');
    const name = array[0];
    const surname = array[1];
    fetch("/api/expert/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: json.name + " " + json.surname,
        profession: this.state.profession,
        about: this.state.about,
        photo: this.state.photo,
        services: this.state.services,
        cv: this.state.cv,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push(
            "/profile/" + this.state.name + "/" + this.state.id
          );
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

            <input className="AddPicture" type="file" name="asda"></input>

            <div className="AddName">
              <label for="name">Name: </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                defaultValue={this.state.name}
                // onKeyUp={this.updateState(this, "name")}
              ></input>
            </div>

            <div className="AddProfession">
              <label for="profession">Profession: </label>
              <input
                id="profession"
                type="text"
                placeholder="Profession"
                defaultValue={this.state.profession}
                // onKeyUp={this.updateState(this, "profession")}
              ></input>
            </div>

            <Rating
              className="RatingOnEdit"
              rating={this.state.stars}
              count={5}
            />

            <div className="EditAboutMe">
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                // onKeyUp={updateState(this, "aboutme")}
              />
              <textarea
                disabled
                value={draftToHtml(
                  convertToRaw(editorState.getCurrentContent())
                )}
              />
            </div>

            <div className="AddServices">
              <h1>Services</h1>
              <ListAdder  /> 
              {/* fields={this.state.services} */}
            </div>

            <div className="AddCV">
              <h1>My CV</h1>
              <ListAdder />
            </div>

            {/* <div className="reviews">
              {this.state.reviews}
              <br></br>
            </div> */}
          </div>
          <Button id="updatebtn" onClick={this.handleUpdate} variant="success">
            Update Profile
          </Button>
        </div>
      </div>
    );
  }
}




// class schedulaer extends React.Component {

//   constructor () {
//     super();
//     this.state = {
//       showModal: false,
//       time:['7:00-8:00','8:00-9:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00'],
//       selected: -1,
//       service:0,
//       html: <p>ffff<em>ff</em></p>
//     };
    
//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//     this.changeSeleceted = this.changeSeleceted.bind(this);
//     this.clickDay = this.clickDay.bind(this);
//     this.bookAppointment= this.bookAppointment.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
  
//   handleOpenModal () {
//     this.setState({ showModal: true });
//   }
  
//   handleChange(event) {
//       this.setState({ service: event.target.selectedIndex });
//   }
  

//   async bookAppointment (){

//       var flag=0;

//       await fetch('/checkToken')
//       .then(res => {
//         if (res.status === 200) {
//           flag=1;
//         } else {
//           const error = new Error(res.error);
//           throw error;
//         }
//       })
//       .catch(err => {
//         alert("You must be signed in to edit your profile")
//       });

//       if(flag){
//           const response = await fetch(`/api/decode`);
//           const json = await response.json();
//           const user = json.user;
          
//           console.log(json);
//           const time = this.state.time[this.state.selected];

//           const expert = this.state.id;

//           fetch('/api/expert/edit', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ 

//                   // time:
//                   // date:
//                 }),
//             })

//       }
      

//   }
  
//   handleCloseModal () {
//     this.setState({ showModal: false });
//   }

//   clickDay(value, event){
//       console.log(value.toString().substring(4,15));
//       this.setState({ selected: -1 }); //reset all green hours
//   }

//   clickHour(event){

//       event.target.style.backgroundColor = "lightgreen";
//   }

//   changeSeleceted(i){
//       this.setState({ selected: i });
//   }


//   render () {
      
//     return (
//       <div className="Profile">
//         <Button onClick={this.handleOpenModal} variant="success">Book Appointment</Button>
//         <ReactModal 
//            isOpen={this.state.showModal}
//            contentLabel="onRequestClose Example"
//            onRequestClose={this.handleCloseModal}
//            className="Modal"
//            ariaHideApp={false}
//         > 
//           <div id="modal-content">
      
//               <Calendar onClickDay={this.clickDay} id="calendar" />
//               <div id="results"> 
//                   <h1>Available hours: </h1>
//                   <ul>
//                       {this.state.time.map((item, i) => (
//                           <li onClick={() => this.changeSeleceted(i)} 
//                               key={i}
//                               style={{backgroundColor: i===this.state.selected?"lightgreen":""}}
//                           >
//                           {item}
//                           </li>

//                       ))}
//                   </ul>
//               </div>

//               <div id="modal-services">          
//                   <label htmlFor="services">Choose a service:</label>
//                   <select id="services" onChange={this.handleChange}>
//                       {this.props.services.map((item, i) => (
//                           <option value={item} key={i}>{item}</option>
//                       ))}
//                   </select>
//               </div>


//               <div id="modal-choices">
//                   <Button id="book-appointment" onClick={this.bookAppointment} variant="success">Book</Button>

//                   <Button id="cancel-modal" onClick={this.handleCloseModal} variant="danger">Cancel</Button>
//               </div>
//           </div>
//         </ReactModal>
//       </div>
//     );
//   }
// }

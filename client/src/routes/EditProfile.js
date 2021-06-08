import React, { Component } from "react";
import "../CSS/Profile.css";
import "../CSS/EditProfile.css";
import Rating from "react-star-review";
import { Header } from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import { ListAdder } from "../components/ListAdder";
import { ListAdderCV } from "../components/ListAdderCV";
import draftToHtml from "draftjs-to-html";
import ReactModal from "react-modal";
import Calendar from "react-calendar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
// import console from "node:console";

class ExampleApp extends React.Component {
  constructor() {
    super();
    var times = [];
    for (var i = 9; i < 19; i++) {
      // var first = i<9?"0"+i:i;
      // var second = i+1<9?"0"+(i+1):i+1;

      times.push(i + ":00-" + i + ":30");
      times.push(i + ":30-" + (i + 1) + ":00");
    }
    this.state = {
      showModal: false,
      time: times,
      selected: { start: ["ff"] },
      service: 0,
      day: "start",
      html: (
        <p>
          ffff<em>ff</em>
        </p>
      ),
      show: "none",
      showAfter: "none",
      start: 8,
      end: 14,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.changeSeleceted = this.changeSeleceted.bind(this);
    this.clickDay = this.clickDay.bind(this);
    this.updateCalendar = this.updateCalendar.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.selectColor = this.selectColor.bind(this);
    this.dayOff = this.dayOff.bind(this);
    this.updateHours = this.updateHours.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/decode`);
      const jsan = await response.json();
      const user = jsan.user;
      const data = await fetch(`/api/user/get?user=${user}`);
      const json = await data.json();
      // console.log(jsan.user);

      let newTimes = [];

      for (var i = json.start; i < json.end; i++) {
        // var first = i<9?"0"+i:i;
        // var second = i+1<9?"0"+(i+1):i+1;

        newTimes.push(i + ":00-" + i + ":30");
        newTimes.push(i + ":30-" + (i + 1) + ":00");
      }

      this.setState({
        start: json.start,
        end: json.end,
        selected: json.hoursOff,
        time: newTimes,
        day: "Jun 13 2021",
      });
    } catch (error) {}
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  updateHours(e, type) {
    type == "start"
      ? this.setState({ start: parseInt(e.target.value) })
      : this.setState({ end: parseInt(e.target.value) });

    let newTimes = [];
    for (var i = this.state.start; i < this.state.end; i++) {
      // var first = i<=9?"0"+i:i;
      // var second = i+1<=9?"0"+(i+1):i+1;

      newTimes.push(i + ":00-" + i + ":30");
      newTimes.push(i + ":30-" + (i + 1) + ":00");
    }

    this.setState({ time: newTimes });
  }

  dayOff() {
    let array = this.state.selected;

    array[this.state.day] = [...this.state.time];

    // console.log(array)
    this.setState({ selected: array });
  }

  handleChange(event) {
    this.setState({ service: event.target.selectedIndex });
  }

  selectColor(hour) {
    let array = this.state.selected[this.state.day];
    // console.log(array,"11111111111111111111111111111");
    // console.log(array)
    // console.log(hour + " but "+array.includes(hour))

    // for (var i = 0; i < array.length; i++) {
    //   // if(array[i]==hour) console.log('is in')
    // }

    return array.includes(hour) ? "red" : "";
  }

  async updateCalendar() {
    const response = await fetch(`/api/decode`);
    const json = await response.json();
    const user = json.user;

    let array = Object.assign({}, this.state.selected);
    delete array.start;

    await fetch("/api/expert/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: this.state.start,
        end: this.state.end,
        hoursOff: array,
        expert: user,
      }),
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
        alert("Error updating");
      });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  clickDay(value, event) {
    let date = value.toString().substring(4, 15);
    this.setState({ show: "", day: date }); //reset all green hours

    let selected = this.state.selected;

    if (!selected[date]) {
      selected[date] = [];
      this.setState({ selected: selected });
    }
  }

  clickHour(event) {
    event.target.style.backgroundColor = "lightgreen";
  }

  changeSeleceted(i) {
    let array = this.state.selected;
    const time = this.state.time;

    const index = array[this.state.day].indexOf(time[i]);

    if (index === -1) {
      array[this.state.day].push(time[i]);
    } else {
      array[this.state.day].splice(index, 1);
    }

    this.setState({ selected: array,showAfter:"" });
  }

  render() {
    // console.log("in")

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
                  value={this.state.start}
                  min="0"
                  max="23"
                  onInput={(e) => {
                    this.updateHours(e, "start");
                  }}
                />
                <br></br>
                <label htmlFor="start">Start</label>
              </span>
              <span>
                <input
                  id="end"
                  type="number"
                  value={this.state.end}
                  min="1"
                  max="24"
                  onInput={(e) => {
                    this.updateHours(e, "end");
                  }}
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
                    backgroundColor: this.selectColor(this.state.time[i]),
                    borderColor: this.selectColor(this.state.time[i]),
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="modal-choices" style={{ display: this.state.showAfter }}>
            <Button
              id="book-appointment"
              onClick={this.updateCalendar}
              variant="success"
            >
              Update
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
      about: "",
      stars: "4", //nonCustom
      appointment: "appointment", //nonCustom
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(""))
      ),
      start: 0,
      end: 0,
      hoursOff: {},
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.propUpdater = this.propUpdater.bind(this);
    this.propUpdaterCV = this.propUpdaterCV.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/decode`);
      const jsan = await response.json();
      const user = jsan.user;
      const data = await fetch(`/api/user/get?user=${user}`);
      const json = await data.json();
      // console.log(jsan.user);
      this.setState({
        id: jsan.user,
        name: json.name,
        profession: json.profession,
        about: json.about,
        photo: json.photo,
        services: json.services,
        cv: json.cv,
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(json.about))
        ),
        start: json.start,
        end: json.end,
        hoursOff: json.hoursOff,
        stars:json.stars
      });

      this.forceUpdate();
    } catch (error) {}
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
    });
  }

  propUpdater(value) {
    this.setState({ services: value });
  }

  propUpdaterCV(value) {
    this.setState({ cv: value });
  }

  async handleUpdate(e) {
    //prepei na ta apothikeyei prwta kapou
    e.preventDefault();

    const response = await fetch(`/api/decode`);
    const jsan = await response.json();
    const user = jsan.user;

    await this.setState({
      about: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      ),
      expert: user,
    });

    var data = Object.assign({}, this.state);

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
        alert("Error updating");
      });
  }

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
                this.state.photo
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
              <ListAdder
                type="services"
                data={this.state.services}
                updater={this.propUpdater}
              />
            </div>

            <div className="AddCV">
              <h1>My CV</h1>
              <ListAdderCV
                type="cv"
                datacv={this.state.cv}
                updater={this.propUpdaterCV}
                // updater={this.propUpdater}
              />
            </div>

            <div className="Calendar">
              <ExampleApp start={this.state.start} />
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

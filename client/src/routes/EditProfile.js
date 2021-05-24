import React, { Component } from "react";
import "../CSS/Profile.css";
import "../CSS/EditProfile.css";
import Rating from "react-star-review";
import { Header } from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
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
        id: "HVp43gujF3Ssoor8t4hGN5jA1w33",
        name: "Kostas Iliopoulos",
        profession: "Plumber",
        photo: "Fwtografia",
        reviews: ["4", " 5"], //nonCustom
        services: ["$$ ", " $$"], //nonCustom
        cv: "My CV",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero. ",
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

  handleUpdate = async (e) => {     //prepei na ta apothikeyei prwta kapou
    e.preventDefault();
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
              ></input>
            </div>

            <div className="AddProfession">
              <label for="profession">Profession: </label>
              <input
                id="profession"
                type="text"
                placeholder="Profession"
                defaultValue={this.state.profession}
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
              <ListAdder />
            </div>

            <div className="AddCV">
              <h1>My CV</h1>
              <ListAdder />
            </div>

            <div className="reviews">
              {this.state.reviews}
              <br></br>
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

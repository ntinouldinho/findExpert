import React, { Component } from "react";
import "../CSS/Profile.css";
import "../CSS/EditProfile.css";
import Rating from "react-star-review";
import { Header } from "../components/Header";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Kostas Iliopoulos",
      profession: "Plumber",
      photo: "Fwtografia",
      reviews: ["4", " 5"],
      services: ["$$ ", " $$"],
      cv: "My CV",
      about: "About me",
      stars: "4.2",
      appointment: "appointment",
      editorState: EditorState.createEmpty(),
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }
  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState,
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
                "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/plumber.jpg?alt=media&token=9f739649-cad2-4582-b045-9de224f7bb0b"
              }
              alt="Profile"
              height="100"
              width="200"
              id="profpic"
            />

            
            <input className="AddPicture" type="file" name="asda"></input>

            <input className="AddName" type="text" placeholder="Full Name" defaultValue={this.state.name}></input>
              
            <input className="AddProfession" type="text" placeholder="Profession" defaultValue={this.state.profession}></input>

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

            <div className="services">
              <input
                placeholder="What are your services"
                defaultValue={this.state.services}
              />
              <br></br>
            </div>

            {/* <div className="reviews">
              {this.state.reviews}
              <br></br>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

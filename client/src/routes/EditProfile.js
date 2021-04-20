import React, { Component } from "react";
import "../CSS/Profile.css";
import "../CSS/EditProfile.css";
import Rating from "react-star-review";
import { Header } from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import ListAdder from "../components/ListAdder";

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
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero. ",
      stars: "4.2",
      appointment: "appointment",
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero. </p>')
        )
      ),
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

            <div className="AddName">
            <label for="name">Name: </label>
            <input id="name"  type="text" placeholder="Full Name" defaultValue={this.state.name}></input>
            </div>

            <div className="AddProfession">
            <label for="profession">Profession: </label>
            <input id="profession"  type="text" placeholder="Profession" defaultValue={this.state.profession}></input>
            </div>

            <Rating className="RatingOnEdit" rating={this.state.stars} count={5} />
            
            

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
                <ListAdder />
            </div>

            <div className="reviews">
              {this.state.reviews}
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

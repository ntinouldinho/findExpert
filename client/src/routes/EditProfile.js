import React, { Component } from 'react';
import '../CSS/Profile.css';
import '../CSS/EditProfile.css';
import Rating from 'react-star-review';
import { Header } from "../components/Header";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export class EditProfile extends Component { 
    constructor(props){
        super(props);
        this.state = {
            name: "Onoma",
            profession: "Epaggelma",
            photo: "Fwtografia",
            reviews: ["4", " 5"],
            services: ["$$ ", " $$"],
            cv: "My CV",
            about: "About me",
            stars: "4.2",
            appointment: "appointment",
            editorState: EditorState.createEmpty(),
        };
        this.onEditorStateChange=this.onEditorStateChange.bind(this);
    }
    onEditorStateChange(editorState) {
        this.setState({
          editorState:editorState
        });
      };

    render(){
        const editorState  = this.state.editorState;
        return(
            <div> 
                <Header/>
                
                <div className="core">
                    <div className = "grid-container" style={{margin: "15%" }}>
                        <div className="picture">
                            <img src={"https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/car_mechanic.jpg?alt=media&token=23cb2e86-4440-404d-9fdc-53e99eb2a2dc"} alt="Profile Picture" height="100" width="200" id="profpic"/>
                            {/* <img src={logo} alt="Profile Picture" height="100" width="200" id="profpic"/> */}
                        </div>

                        <div className="info">
                            {this.state.name}<br></br>
                            {this.state.profession}<br></br>
                            <Rating rating={this.state.stars} count={5}/><br></br>
                        </div>

                        <div className="aboutme">
                            <input defaultValue={this.state.about}/>
                        </div>

                        <div className="services">
                            <input placeholder="What are your services" defaultValue={this.state.services}/><br></br>
                        </div>

                        <div className="cv editor">
                                <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                />
                                <textarea
                                disabled
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                />
                        </div>

                        <div className="reviews">
                                {this.state.reviews}<br></br>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}
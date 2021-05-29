import React, { Component } from "react";
import "../CSS/Results.css";
import logo from "../assets/logo.png";
// import profile from "../assets/blank-profile-picture.png";
import { Autocomplete } from "../components/Autocomplete";
import Login from "../routes/Home.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            src: [
                "Legal ",
                "Medical",
                "Financial",
                "Technician",
                "Teacher ",
                "Informatics",
                "Artist",
                "Chef",
                "Household",
                "Other",
            ],
            search: props.search,
            loggedIn: props.loggedIn?props.loggedIn:false
        };
    }


  componentDidMount() {

    if(localStorage.getItem("token")){
      fetch('/checkToken')
          .then(res => {
            if (res.status === 200) {
              this.setState({ loggedIn: true });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
      });
  }
  }

  render() {

    var show=this.state.loggedIn?"inline":"none";
    var showImage = !this.state.loggedIn?"inline":"none";

    return (
      <div className="header">
        <a href="/">
          <img src={logo} alt="logo" height="150" width="378" id="logo" />
        </a>

        <Autocomplete options={this.state.src} search={this.state.search} />

        <span>
          <Login loggedIn={this.state.loggedIn} />
        </span>
      </div>
    );
  }
}

export default Header;

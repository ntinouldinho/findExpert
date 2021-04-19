import React, { Component } from "react";
import "../CSS/Results.css";
import logo from "../assets/logo.png";
// import profile from "../assets/blank-profile-picture.png";
import { Autocomplete } from "../components/Autocomplete";
import Login from "../routes/Home.js";

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
    };
  }
  render() {
    return (
      <div className="header">
        <a href="/">
          <img src={logo} alt="logo" height="150" width="378" id="logo" />
        </a>

        <Autocomplete options={this.state.src} search={this.state.search} />
        <Login />
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";
import "../CSS/Results.css";
import logo from "../assets/logo.png";
import profile from "../assets/blank-profile-picture.png";
import { Autocomplete } from "../components/Autocomplete";

export class Header extends Component {
  constructor(props) {
    super(props);
      this.state = {
        src: [ "Doctor","Mechanic", "Chef", "Chef", "Doctor", "Mechanic"],
        search: props.search,
      };
  }
  render() {
    return (
      <div className="header">
        <a href="/">
          <img src={logo} alt="logo" height="100" width="200" id="logo" />
        </a>

        <Autocomplete options={this.state.src} search={this.state.search}/>

        <img src={profile} alt="profile" height="50" width="50" id="profile" />
      </div>
    );
  }
}

export default Header;
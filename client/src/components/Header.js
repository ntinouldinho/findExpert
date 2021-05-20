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
      loggenIn:false
    };
  }


  componentDidMount() {
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

  render() {

    var show=this.state.loggedIn?"inline":"none";

    return (
      <div className="header">
        <a href="/">
          <img src={logo} alt="logo" height="150" width="378" id="logo" />
        </a>

        <Autocomplete options={this.state.src} search={this.state.search} />
        <button type="button" onClick={this.logout} style={{display:show}}>Logout</button>
        <Login />
      </div>
    );
  }
}

export default Header;

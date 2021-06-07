import React, { Component } from "react";
import "../CSS/Results.css";
import logo from "../assets/logo.png";
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
      loggedIn: props.loggedIn ? props.loggedIn : false,
    };
  }

  async componentDidMount() {
    await fetch("/checkToken")
      .then((res) => {
        if (res.status === 200) {
          this.setState({ loggedIn: true });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
      });

    const response = await fetch(`/api/decode`);
    const json = await response.json();
    this.setState({ role: json.role });
  }

  render() {
    var show = this.state.loggedIn ? "inline" : "none";
    var showImage = !this.state.loggedIn ? "inline" : "none";

    return (
      <div className="header">
        <a href="/">
          <img src={logo} alt="logo" height="150" width="378" id="logo" />
        </a>

        <Autocomplete options={this.state.src} search={this.state.search} />

        <span>
          <Login loggedIn={this.state.loggedIn} role={this.state.role} />
        </span>
      </div>
    );
  }
}

export default Header;

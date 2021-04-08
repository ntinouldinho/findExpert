import React, { Component } from "react";
import "../CSS/Results.css";
import logo from "../assets/logo.png";
import profile from "../assets/blank-profile-picture.png";
import SearchBar from "../components/SearchBar";
import ProfessionalBlock from '../components/ProfessionalBlock.js';

// <h1>{this.props.match.params.search}</h1>
export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionals: [
        { job: "doctor", name: "kostas" },
        { job: "paparas", name: "mitsos" },
      ],
      search: props.match.params.search,
    };
  }

  render() {
    return (
      <div>
        <div className="header">
          <a href="/">
            <img src={logo} alt="logo" height="100" width="200" id="logo" />
          </a>

          <SearchBar
            value={this.state.search}
            handleChange={(e) => this.setState({ search: e.target.value })}
            placeholder="Search for category"
          />

          <img
            src={profile}
            alt="profile"
            height="50"
            width="50"
            id="profile"
          />
        </div>

        <div className="Professionals">
          {this.state.professionals.map((item, i) => (
            <ProfessionalBlock key={i} person={item} />
          ))}
        </div>
      </div>
    );
  }
}

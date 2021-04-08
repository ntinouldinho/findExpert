import React, { Component } from "react";
import "../CSS/Results.css";
import logo from "../assets/logo.png";
import profile from "../assets/blank-profile-picture.png";
import SearchBar from "../components/SearchBar.js";

const ProfessionalBlock = ({ person }) => {
  return (
    <div className="ProfessionalBlock">
      <a href={"/profile/"+person.name+"/56"}>
        <img
          alt="profile pic"
          className="ProfilePic"
          src={"https://www.ecpi.edu/sites/default/files/CIV%20Sept%2026.png"}
        />
        <h1>Όνομα: {person.name}</h1>
        <h1>Ειδικότητα: {person.job}</h1>
      </a>
    </div>
  );
};

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

import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import HomeCategory from "../components/HomeCategory.js";
import { Autocomplete } from "../components/Autocomplete";
import { Footer } from "../components/Footer";

import "../CSS/Home.css";
import logo from "../assets/logo.png";

const Login = () => {
  const history = useHistory();
  const toLogin = (e) => {
    history.push(`/login`);
    e.preventDefault();
  };

  return (
    <input type="button" onClick={toLogin} id="login" value="Login/Register" />
  );
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: [
        "Legal ",
        "Financial",
        "Medical",
        "Technician",
        "Chef",
        "Teacher ",
        "Informatics",
        "Artist",
        "Household",
        "Other",
      ],
      search: "",
    };
  }

  render() {
    return (
      <div className="HomeContainer">
        <div className="logoSearch">
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="150"
            width="378"
          />
          <Login />
          <Autocomplete options={this.state.src} />
        </div>
        <div className="HomeCategories">
          {this.state.src.map((item, i) => (
            <HomeCategory key={i} name={item} classtype={i} />
          ))}
        </div>
        <section className="Steps Step3"></section>
        <section className="Steps Step4"></section>
        <section className="Steps Step5"></section>
        <Footer />
      </div>
    );
  }
}

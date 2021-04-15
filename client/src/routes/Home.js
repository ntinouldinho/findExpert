import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import HomeCategory from "../components/HomeCategory.js";
import { Autocomplete } from "../components/Autocomplete";
import { Footer } from "../components/Footer";
import Header from "../components/Header.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../CSS/Home.css";
import logo from "../assets/logo.png";

const Login = () => {
  const history = useHistory();
  const toLogin = (e) => {
    history.push(`/login`);
    e.preventDefault();
  };

  return (
    <button
      type="button"
      onClick={toLogin}
      id="login"
      //   value={<FontAwesomeIcon icon={faUser} />}
    >
      <FontAwesomeIcon icon={faUser} />
    </button>
  );
};

export default Login;



export class Home extends Component {
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
      search: "",
    };
    this.scrollFunction=this.scrollFunction.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction);
  }

  scrollFunction() {
    console.log("scrolling");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementsByClassName("header")[0].style.top = "0";
    } else {
      document.getElementsByClassName("header")[0].style.top = "-150px";
    }
  }
  render() {
    return (
      <div className="HomeContainer">
        <Header search={this.state.search} />
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
        <section className="Steps Step3">
            <h1>Book your appointment: </h1>
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="400"
            width="600"
          />
        </section>
        <section className="Steps Step4">
          <h1>Log in to your video call through our site: </h1>
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="400"
            width="600"
          />
        </section>
        <section className="Steps Step5">
            <h1>Payment is charged automatically on your card: </h1>
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="400"
            width="600"
          />
        </section>
        <Footer />
      </div>
    );
  }
}

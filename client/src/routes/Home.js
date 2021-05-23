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
import { alert } from "globalthis/implementation";

const Login = (props) => {
  const history = useHistory();

  const toLogin = (e) => {
    e.preventDefault();
    history.push(`/login`);
    
  };

    
    const logout = () => {
        try {
            fetch(`/logout`);
            
            props.login(false);
            props.loggedIn = false;
        } catch (error) { }
    };
    
var show = props.loggedIn ? "inline" : "none";
var showImage = !props.loggedIn ? "inline" : "none";


  return (
    <>
      <button
        type="button"
        onClick={toLogin}
        id="login"
        style={{ display: showImage }}
      >
        <FontAwesomeIcon icon={faUser} />
        <br></br>
        <h6>Log In</h6>
      </button>
      <button
        type="button"
        id="login"
        onClick={logout}
        style={{ display: show }}
      >
        <FontAwesomeIcon icon={faUser} />
        <br></br>
        <h6>Log Out</h6>
      </button>
    </>
  );
};

export default Login;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat1: ["Teacher", "Chef", "Artist"],
      cat2: ["Technician", "Household", "Informatics", "Other"],
      cat3: ["Financial", "Legal", "Medical"],
      src: [
        "Teacher",
        "Chef",
        "Technician",
        "Financial",
        "Legal",
        "Artist",
        "Household",
        "Informatics",
        "Other",
        "Medical",
      ],
      search: "",
      loggedIn: false,
    };
    this.scrollFunction = this.scrollFunction.bind(this);
    // this.logout = this.logout.bind(this);
  }


  componentDidMount() {
    window.addEventListener("scroll", this.scrollFunction);

    fetch("/checkToken")
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
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
  }

  scrollFunction() {
    console.log("scrolling");
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      document.getElementsByClassName("header")[0].style.top = "0";
    } else {
      document.getElementsByClassName("header")[0].style.top = "-150px";
    }
  }

  changeLogin(login){
    this.setState({loggedIn:login})
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

          <span>
            <Login loggedIn={this.state.loggedIn} login={this.changeLogin}/>
          </span>

          <p id="moto1">
            Looking for an <span style={{ color: "orangered" }}> expert</span>?
            Book your session now!
          </p>
          <p id="moto2">
            Look through our many
            <span style={{ color: "orangered" }}> experts</span>, and
            <span style={{ color: "orangered" }}> find </span> the one that fits
            you better.
          </p>
          <Autocomplete options={this.state.src} />
          <div id="homecategoriesScrollPoint"></div>

          <p id="moto3">
            or browse our&nbsp;
            <a href="#homecategoriesScrollPoint" style={{ color: "orangered" }}>
              categories
            </a>
            .
          </p>
        </div>
        <div className="HomeCategories">
          <div className="rightCat">
            <p> Learning </p>
            {this.state.cat1.map((item, i) => (
              <HomeCategory key={i} name={item} classtype={i} />
            ))}
          </div>
          <div className="centerCat">
            <p> Both </p>
            {this.state.cat2.map((item, i) => (
              <HomeCategory key={i} name={item} classtype={i + 1} />
            ))}
          </div>
          <div className="leftCat">
            <p> Assistance </p>
            {this.state.cat3.map((item, i) => (
              <HomeCategory key={i} name={item} classtype={i + 1} />
            ))}
          </div>
          {/* {this.state.src.map((item, i) => (
            <HomeCategory key={i} name={item} classtype={i} />
          ))}  */}
        </div>
        <div
          className="grid-container-righttext"
          style={{ backgroundColor: "rgb(255, 207, 148)" }}
        >
          <h1 className="stepTitle"> Book your appointment: </h1>
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="400"
            width="600"
          />
          <p className="desc">
            When you have found your desired expert, you will have the
            opportunity to book an online appointment in a few simple steps.Move
            to their profile, and click on the button "Book Appointment".Then
            select the day and the hour you desire.Confirm your choice by
            clicking the green button "Book".Congratulations!You have booked
            your first online meeting.
          </p>
        </div>
        <div
          className="grid-container-lefttext"
          style={{ backgroundColor: "rgb(216, 141, 114)" }}
        >
          <h1 className="stepTitle">
            Log in to your video call through our site:
          </h1>
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="400"
            width="600"
          />
          <p className="desc">
            When your appointment is booked, you will recieve an e - mail that
            contains a link.When you click that, you will be redirected to a
            room, where your videocall will take place.Feel free to use the chat
            too!
          </p>
        </div>
        <div
          className="grid-container-righttext"
          style={{ backgroundColor: "rgb(255, 207, 148)" }}
        >
          <h1 className="stepTitle">
            Payment is charged automatically on your card:
          </h1>
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="400"
            width="600"
          />
          <p className="desc">
            You will be asked to enter your credit card information during sign
            up, so don 't worry about paying all the time, as everything is done
            automatically!
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

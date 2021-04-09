import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { HomeCategory } from "../components/HomeCategory";
import { Autocomplete } from "../components/Autocomplete";

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
      src: [ "Doctor","Mechanic", "Chef", "Chef", "Doctor", "Mechanic"],
      search: ""
    };
  }

  render() {
    return (
      <div>
        <div className="logoSearch">
          <img
            className="Logo"
            src={logo}
            alt="logo"
            height="200"
            width="400"
          />
          <Login />
          <Autocomplete
            options={this.state.src}
          />
        </div>
        <div className="HomeCategories">
          {this.state.src.map((item, i) => (
            <HomeCategory key={i} name={item} />
          ))}
        </div>
      </div>
    );
  }
}

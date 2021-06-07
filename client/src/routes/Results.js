import React, { Component } from "react";
import "../CSS/Results.css";
import ProfessionalBlock from "../components/ProfessionalBlock.js";
import Header from "../components/Header.js";
import { Footer } from "../components/Footer";

var Professessions = [
  "Artist",
  "Chef",
  "Financial",
  "Household",
  "Informatics",
  "Legal",
  "Medical",
  "Teacher",
  "Technician",
  "Other",
];
export class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      professionals: [{ test: "ok" }],
      search: props.match.params.search,
    };
  }

  componentWillMount() {
    const link = window.location.href.split("/");
    const search = link[link.length - 1];

    fetch("/api/search?search=" + search)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ professionals: res });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const empty = this.state.professionals.length != 0 ? "none" : "";
    console.log(empty);
    return (
      <div className="resultsDiv">
        <Header search={this.state.search} />

        <div className="flexboxresults">
          <div className="ProfList">
            <ul>
              <h2>Other Categories</h2>
              {Professessions.map((item) => (
                <li>
                  <a href={"/search/" + item}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="Professionals">
            {this.state.professionals.map((item, i) => (
              <ProfessionalBlock key={i} person={item} />
            ))}
            <h1 style={{ display: empty }}>No Experts in this category yet!</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

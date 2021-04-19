import React, { Component } from "react";
import "../CSS/Results.css";
import ProfessionalBlock from "../components/ProfessionalBlock.js";
import Header from "../components/Header.js";
import { Footer } from "../components/Footer";

// <h1>{this.props.match.params.search}</h1>

var Professessions = ["Plumber", "Electrician", "Mechanic", "Glazier", "Engineer", "Technologist"];
export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionals: [
        { job: "Plumber", name: "Kostas Iliopoulos"},
        { job: "Electrician", name: "Ioannis Argyropoulos"},
        { job: "Mechanic", name: "Panagiotis Kareas"},
        { job: "Glazier", name: "Iasonas Mpraxamis"}
      ],
      search: props.match.params.search,
    };
  }

  render() {
    return (
      <div>
        <Header search={this.state.search} />

        <div className="flexboxresults">
          <div class="ProfList">
            <ul>
              <h2>Subcategories</h2>
              {Professessions.map((item) => (
                <li>
                  <a href="">{item}</a>{" "}
                </li>
              ))}
            </ul>
          </div>

          <div className="Professionals">
            {this.state.professionals.map((item, i) => (
              <ProfessionalBlock key={i} person={item} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

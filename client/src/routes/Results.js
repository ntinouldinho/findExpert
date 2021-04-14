import React, { Component } from "react";
import "../CSS/Results.css";
import ProfessionalBlock from "../components/ProfessionalBlock.js";
import Header from "../components/Header.js";
import { Footer } from "../components/Footer";

// <h1>{this.props.match.params.search}</h1>

var Professessions = ["VET", "DOC", "PHYSICIAN", "CHEROPRACTOR", "OTOL"];
export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionals: [
        { job: "Doctor", name: "Kostas", surname: "Iliadis" },
        { job: "Mechanic", name: "Jimis", surname: "Iliadis" },
        { job: "Doctor", name: "Kostas", surname: "Iliadis" },
        { job: "Mechanic", name: "Jimis", surname: "Iliadis" },
        { job: "Doctor", name: "Kostas", surname: "Iliadis" },
        { job: "Mechanic", name: "Jimis", surname: "Iliadis" },
        { job: "Doctor", name: "Kostas", surname: "Iliadis" },
        { job: "Mechanic", name: "Jimis", surname: "Iliadis" },
      ],
      search: props.match.params.search,
    };
  }

  render() {
    return (
      <div>
        <Header search={this.state.search} />

        <div className="grid-container-prof">
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

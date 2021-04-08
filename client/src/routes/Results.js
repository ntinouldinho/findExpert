import React, { Component } from "react";
import "../CSS/Results.css";
import ProfessionalBlock from '../components/ProfessionalBlock.js';
import Header from '../components/Header.js';

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
        <Header search={this.state.search}/>

        <div className="Professionals">
          {this.state.professionals.map((item, i) => (
            <ProfessionalBlock key={i} person={item} />
          ))}
        </div>
      </div>
    );
  }
}

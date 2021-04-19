import React, { Component } from "react";
import "../CSS/Results.css";
import ProfessionalBlock from "../components/ProfessionalBlock.js";
import Header from "../components/Header.js";
import { Footer } from "../components/Footer";

// <h1>{this.props.match.params.search}</h1>

var Professessions = [
  "Plumber",
  "Electrician",
  "Mechanic",
  "Glazier",
  "Engineer",
  "Technologist",
];
export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionals: [
        {
          job: "Plumber",
          name: "Kostas Iliopoulos",
          info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero.",
          rating: "3.2",
          id: "666",
          url:
            "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/plumber.jpg?alt=media&token=9f739649-cad2-4582-b045-9de224f7bb0b",
        },
        {
          job: "Electrician",
          name: "Ioannis Argyropoulos",
          info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero.",
          rating: "1.5",
          id: "123",
          url:
            "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/electrician1.jpg?alt=media&token=9fef9a8e-c73a-488a-8772-7f888b2906bb",
        },
        {
          job: "Mechanic",
          name: "Katia Karea",
          info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero.",
          rating: "4.2",
          id: "420",
          url:
            "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/Constructor.jpg?alt=media&token=2be478bf-e12b-4a7c-a9c3-c9d43fd16e20",
        },
        {
          job: "Glazier",
          name: "Iasonas Mpraxamis",
          info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero.",
          rating: "2.3",
          id: "023",
          url:
            "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/glazizer.jpg?alt=media&token=a8cfb339-480a-48e4-9000-551fe5206576",
        },
        {
          job: "Electrician",
          name: "Vasilis Voulas",
          info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis tincidunt elit. Morbi eget elit id lorem feugiat pharetra. Cras nec tortor ac ante volutpat hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pretium ante. Morbi elit felis, sollicitudin iaculis malesuada id, tincidunt in turpis. Phasellus aliquet dapibus enim eget bibendum. Pellentesque molestie nulla purus, tincidunt lacinia orci aliquet at. Mauris sit amet rhoncus felis, quis aliquam eros. Vivamus lacinia dignissim malesuada. Vestibulum efficitur, orci in fringilla rhoncus, tortor ante luctus turpis, id fermentum libero dui ac libero.",
          rating: "5",
          id: "555",
          url:
            "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/electrician2.jpg?alt=media&token=4488e618-0cb1-416c-a6dc-ed6a0ba19dd7",
        },
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

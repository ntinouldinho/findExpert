import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "../CSS/CreditCard.css";

export default class CreditCard extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="PaymentForm">
        <form id="test">
          <input
            type="tel"
            name="number"
            placeholder="1234 1234 5555 4321"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

          <input
            type="text"
            name="name"
            placeholder="Giorgos Papanikou"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

          <input
            type="tel"
            name="expiry"
            placeholder="12 04"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

          <input
            type="tel"
            name="cvc"
            placeholder="123"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </form>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
      </div>
    );
  }
}

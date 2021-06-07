import React, { Component } from "react";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import console from "node:console";

export class ListAdderCV extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      type: "",
      datacv: [{}],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ datacv: nextProps.datacv });
  }

  handleInputChange = (e, index) => {
    const list = [...this.state.datacv];
    list[index].cv = e;
    this.setState({ datacv: list });
    this.props.updater(list);
  };

  handleAddClick = () => {
    this.setState({ datacv: [...this.state.datacv, { cv: " " }] });
  };

  handleRemoveClick = (index) => {
    const list = [...this.state.datacv];
    list.splice(index, 1);
    this.setState({ datacv: list });
    this.props.updater(list);
  };

  render() {
    const type = this.state.type == "cv" ? "none" : "";
    return (
      <table className="ListAdder">
        <thead>
          <tr>
            <th>CV</th>
            <th>
              <button onClick={this.handleAddClick}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.datacv.map((x, i) => {
            console.log(i);
            return (
              <tr>
                <td style={{ display: type }}>
                  <input
                    type="text"
                    value={x.cv}
                    placeholder="Enter CV element"
                    onChange={(e) => this.handleInputChange(e.target.value, i)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => this.handleRemoveClick(i)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ListAdderCV;

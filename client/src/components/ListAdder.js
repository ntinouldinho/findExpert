import React, { Component } from "react";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import console from "node:console";

export class ListAdder extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      type: "",
      data: [{}],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  handleInputChange = (e, index, tp) => {
    const list = [...this.state.data];
    if (tp == "title") {
      list[index].title = e;
    } else {
      list[index].price = e;
    }
    this.setState({ data: list });
    this.props.updater(list);
  };

  handleAddClick = () => {
    this.setState({ data: [...this.state.data, { title: "", price: "" }] });
  };

  handleRemoveClick = (index) => {
    const list = [...this.state.data];
    list.splice(index, 1);
    this.setState({ data: list });
  };

  render() {
    const type = this.state.type == "cv" ? "none" : "";
    return (
      <table className="ListAdder">
        <thead>
          <tr>
            <th>Service</th>
            <th style={{ display: type }}>Price</th>
            <th>
              <button onClick={this.handleAddClick}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((x, i) => {
            return (
              <tr>
                <td style={{ display: type }}>
                  <input
                    type="text"
                    value={x.title}
                    placeholder="Enter service title"
                    onChange={(e) =>
                      this.handleInputChange(e.target.value, i, "title")
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={x.price}
                    placeholder="Enter service price"
                    onChange={(e) =>
                      this.handleInputChange(e.target.value, i, "price")
                    }
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

export default ListAdder;

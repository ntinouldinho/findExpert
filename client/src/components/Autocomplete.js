import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar.js";
import "../CSS/Autocomplete.css";

export class Autocomplete extends Component {
  static propTypes = {
      options: PropTypes.instanceOf(Array).isRequired,
      search: PropTypes.instanceOf(String)
  };
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    search: this.props.search,
  };

  onChange = (e) => {
    console.log("onChanges");
    const { options } = this.props;
    const search = e.currentTarget.value;
      if (search === "") {
          this.setState({
              search: ""
          });
          return;
      }
    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      search: e.currentTarget.value,
    });
    
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      search: e.currentTarget.innerText,
    });
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        search: filteredOptions[activeOption],
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, search },
    } = this;
    let optionList;
    if (showOptions && search) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <a href={"/search/" + optionName}>
                  <li className={className} key={optionName} onClick={onClick}>
                    {optionName}
                  </li>
                </a>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <SearchBar
            value={this.state.search}
            // handleChange={(e) => this.setState({ search: e.target.value })}
            placeholder="Search for a Professional..."
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;

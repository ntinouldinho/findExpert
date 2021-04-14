import React from 'react';  
import { useHistory } from 'react-router-dom';
import '../CSS/Autocomplete.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchBar = (props) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`/search/${props.value}`);
        e.preventDefault();
    };

    return (
      <form className="searchForm" action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        {/* <label htmlFor="search">{props.placeholder}</label> */}
        <input
          type="search"
          placeholder={props.placeholder}
          name="search"
          onChange={props.onChange}
          value={props.value}
          onKeyDown={props.onKeyDown}
          required
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    );
};

export default SearchBar;

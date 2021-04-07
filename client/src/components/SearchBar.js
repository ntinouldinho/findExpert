import React from 'react';  
import { useHistory } from 'react-router-dom';
import '../CSS/Home.css';


const SearchBar = (props) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`/search/${props.value}`);
        e.preventDefault();
    };

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <label htmlFor="search">
                   {props.placeholder}
            </label>
            <input
                type="search"
                placeholder={props.placeholder}
                name="search"
                onChange={props.handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;




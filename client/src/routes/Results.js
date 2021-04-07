import React, { Component } from 'react';
import '../CSS/Home.css';

const Results = (props) => {

        return(
            <h1>{props.match.params.search}</h1>
        );
         

       
    
}

export default Results;
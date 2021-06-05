import React from "react";
import "../CSS/Results.css";
import Rating from "react-star-review";

const ProfessionalBlock = ({ person }) => {
  return (
    <div className="ProfessionalBlock">
      <a href={"/profile/" + person.name +"/" + person.id}>
        <div className="leftside" style={{ float: "left" }}>
          <img
            alt="Expert Profile"
            className="ProfilePic"
            src={person.url}
            height="80"
            width="120"
          />
          <span class="caption">
            {person.name}
            <br></br>
            {person.job}
            <Rating rating={person.rating} count={5} />
          </span>
              </div>
              <h2>Info</h2>
        <div className="info" dangerouslySetInnerHTML={{__html: person.info}}>
        </div>
      </a>
    </div>
  );
};

export default ProfessionalBlock;

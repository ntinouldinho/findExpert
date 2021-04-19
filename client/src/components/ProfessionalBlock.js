import React from "react";
import "../CSS/Results.css";
import Rating from "react-star-review";

const ProfessionalBlock = ({ person }) => {
  return (
    <div className="ProfessionalBlock">
      <a href={"/profile/" + person.name + "/56"}>
        <div className="leftside" style={{ float: "left" }}>
          <img
            alt="profile pic"
            className="ProfilePic"
            src={"https://www.ecpi.edu/sites/default/files/CIV%20Sept%2026.png"}
          />
          <span class="caption">
            {person.name}
            <br></br>
            {person.job}
            <Rating rating={"4"} count={5} />
          </span>
        </div>
        <div className="info">
          I have been working as plumber 18 years.
          I am an electrician and I love my work. 
        </div>
      </a>
    </div>
  );
};

export default ProfessionalBlock;

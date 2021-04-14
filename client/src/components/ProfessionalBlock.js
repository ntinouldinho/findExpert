import React from "react";
import "../CSS/Results.css";

const ProfessionalBlock = ({ person }) => {
  return (
    <div className="ProfessionalBlock">
      <a href={"/profile/"+person.name+"/56"}>
        <img
          alt="profile pic"
          className="ProfilePic"
          src={"https://www.ecpi.edu/sites/default/files/CIV%20Sept%2026.png"}
        />
        <h1>Όνομα: {person.name}</h1>
        <h1>Ειδικότητα: {person.job}</h1>
      </a>
    </div>
  );
};


export default ProfessionalBlock;


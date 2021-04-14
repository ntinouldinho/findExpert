import React from "react";
import "../CSS/Home.css";

import mechanic from "../assets/car_mechanic.jpg";
import doctor from "../assets/doctor.jpg";
import chef from "../assets/chef.jpg";

const HomeCategory = (props) => {
  const renderSwitch = (param) => {
    switch (param) {
      case "Mechanic":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/car_mechanic.jpg?alt=media&token=23cb2e86-4440-404d-9fdc-53e99eb2a2dc";
      case "Doctor":
        return doctor;
      case "Chef":
        return chef;
      default:
        return mechanic;
    }
  };

  
  const classType = (classtype) => {
    console.log(classtype);
    return classtype % 2 === 0 ? "Even" : "Odd";
  };

  console.log(props);
  return (
    <div
      className={"HomeCategory " + classType(props.classtype)}
      style={{ backgroundImage: "url(" + renderSwitch(props.name) + ")" }}
    >
      <a href={"/search/" + props.name}>
        <div id="catName">{props.name}</div>
      </a>
    </div>
  );
};

export default HomeCategory;

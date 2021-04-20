import React from "react";
import "../CSS/Home.css";

const HomeCategory = (props) => {
  const renderSwitch = (param) => {
    switch (param) {
      case "Technician":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryTechnician.jpg?alt=media&token=4457af17-572f-4e6e-be47-2592fbf0f8f0";
      case "Medical":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryDoctor.jpg?alt=media&token=02f74dee-e82c-4ebb-a15a-415495a12c54";
      case "Chef":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryChef.jpg?alt=media&token=b8116202-09e2-4463-b6f0-66845ebdd51e";
      case "Artist":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryArtist.jpeg?alt=media&token=421a04f0-9435-4e0d-9709-e79964adc7d9";
      case "Financial":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryFinancial.jpg?alt=media&token=43efc2b1-2e97-46cf-9240-40f08ba20646";
      case "Household":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryHousehold.jpg?alt=media&token=259e49bd-d137-4710-8f37-d43e24e7f393";
      case "Informatics":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryInformatics.jpg?alt=media&token=88a2f9f7-cf9d-40bb-ae53-7157e637c2b0";
      case "Legal":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryLegal.jpeg?alt=media&token=611312aa-6265-4a3f-afe8-c354a58ba12b";
      case "Teacher":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryTeacher.jpg?alt=media&token=c0a0d216-0e8e-4390-99b5-3b1b73da9256";
      default:
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryOther.jpg?alt=media&token=2e7a1b48-3273-439e-87b4-33648199330c";
    }
  };

  const classType = (classtype) => {
    console.log(classtype);
    return classtype % 2 === 0 ? "Even" : "Odd";
  };

  console.log(props);
  return (
    <div className={"HomeCategory " + classType(props.classtype)}>
      <a href={"/search/" + props.name}>
        <div
          className="homeoverlay"
          style={{ backgroundImage: "url(" + renderSwitch(props.name) + ")" }}
        ></div>
        <div id="catName">{props.name}</div>
      </a>
    </div>
  );
};

export default HomeCategory;

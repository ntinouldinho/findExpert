import React from "react";
import "../CSS/Home.css";

const HomeCategory = (props) => {
  const renderSwitch = (param) => {
    switch (param) {
      case "Technician":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryTechnician.jpg?alt=media&token=3bc1738b-8de1-4b2f-95d9-ce5783d71823";
      case "Medical":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryDoctor.jpg?alt=media&token=2b27dba1-5b47-4bdc-a849-9da0b381c4cf";
      case "Chef":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryChef.jpg?alt=media&token=c16eb003-3ee9-4c49-970a-aa7d86be0178";
      case "Artist":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryArtist.jpeg?alt=media&token=ad61a7e4-3c8f-4ccb-ac81-6f072a39aa58";
      case "Financial":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryFinancial.jpg?alt=media&token=5e3d3401-7a3a-42a1-89eb-970416799ec3";
      case "Household":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryHousehold.jpg?alt=media&token=82b09bf6-2239-4a05-bcc0-3f403db64c34";
      case "Informatics":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryInformatics.jpg?alt=media&token=0e817add-1107-402d-9921-1886d6b9083e";
      case "Legal":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryLegal.jpeg?alt=media&token=cfc07eb0-f19c-43e1-b251-24f4270f180b";
      case "Teacher":
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryTeacher.jpg?alt=media&token=a5936d5c-1537-4688-ba27-3898af9d76d0";
      default:
        return "https://firebasestorage.googleapis.com/v0/b/professionall.appspot.com/o/CategoryOther.jpg?alt=media&token=a57a2fd3-7176-477b-94e2-3315e0f24dee";
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

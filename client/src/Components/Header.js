import React from "react";
import NavBar from "./NavBar";
import "../Styles/Header.css";

const Header = () => {
  const beetImageUrl =
    "https://cdn.pixabay.com/photo/2020/05/01/18/40/beet-5118595_960_720.png";
  return (
    <div className="headerContainer">
      <div className="titleContainer">
        <h1>
          My Heart <img src={beetImageUrl} style={{ maxWidth: "60px" }} />
        </h1>
        <h5>for community gardens in the city of Berlin</h5>
      </div>
    </div>
  );
};

export default Header;

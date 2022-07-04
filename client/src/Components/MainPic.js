import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainPic.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../Contexts/AuthContext";

const MainPic = () => {
  const redirectTo = useNavigate();
  const handleStartBrowsing = () => redirectTo("/browse");
  const handleLogIn = () => redirectTo("/login");
  const handleViewProfile = () => redirectTo("/profile");
  const { loginStatus } = useContext(AuthContext);

  function showLoginOrViewProfile() {
    switch (loginStatus) {
      case false:
        return (
          <Button variant="outline-light" onClick={handleLogIn}>
            Log in
          </Button>
        );
        break;
      case true:
        return (
          <Button variant="outline-light" onClick={handleViewProfile}>
            View Profile
          </Button>
        );
        break;
      default:
        return null;
    }
  }
  return (
    <div className="homeContainer">
      <p style={{ color: "white" }}>
        The alloted gardens movement, in Germany and in Berlin specifically,
        contributes to a history as colorful and varied as a flower bed. During
        the Industrial Era and as a result of the spreading urbanisation, these
        gardens served as a refuge from the crowded city streets and housing.
        Today, we have the luxury of accessing these green oases for a moment of
        peace, community-building, and social gatherings. In this spirit, this
        platform, &#x7B;My Heart Beets&#x7d;, is here to connect a garden with a
        helper, or a helper with a garden.
      </p>
      <Button variant="outline-light" onClick={handleStartBrowsing}>
        Start browsing
      </Button>
      <br />
      {showLoginOrViewProfile()}
    </div>
  );
};

export default MainPic;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainPic.css";
import { Button } from "react-bootstrap";

const MainPic = () => {
  const redirectTo = useNavigate();
  const handleStartBrowsing = () => redirectTo("/browse");
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
    </div>
  );
};

export default MainPic;

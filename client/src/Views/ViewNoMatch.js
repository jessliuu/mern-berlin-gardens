import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

function NoMatch() {
  return (
    <div>
      <Header />

      <h2 style={{ paddingTop: "100px" }}>Oops, page not found!</h2>

      <Link className="btn btn-outline-dark btn-lg" role="button" to="/">
        Homepage
      </Link>
    </div>
  );
}

export default NoMatch;

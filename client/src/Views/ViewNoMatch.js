import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <h2>Oops, page not found!</h2>

      <Link className="btn btn-outline-light btn-lg" role="button" to="/browse">
        BROWSE AGAIN
      </Link>
    </div>
  );
}

export default NoMatch;

import React from "react";
import "../Styles/Modal.css";
import { Link } from "react-router-dom";

const AlertSignIn = (props) => {
  const message = props.message;
  const setShowAlertSignIn = props.setShowAlertSignIn;

  return (
    <div onClick={() => setShowAlertSignIn(false)} className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setShowAlertSignIn(false)}>X</button>
        </div>
        <h4>{message}</h4>
        <Link to="/login" className="p-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default AlertSignIn;

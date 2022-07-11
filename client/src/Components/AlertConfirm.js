import React from "react";
import "../Styles/Modal.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const AlertConfirm = (props) => {
  const message = props.message;
  const setShowAlertConfirm = props.setShowAlertConfirm;
  const handleDelete = props.handleDelete;
  const id = props.id;
  const button1 = props.button1;
  const button2 = props.button2;

  return (
    <div onClick={() => setShowAlertConfirm(false)} className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <Button onClick={() => setShowAlertConfirm(false)}>X</Button>
        </div>
        <h4>{message}</h4>
        <div>
          <Button onClick={() => handleDelete(id)}>{button1}</Button>
          <Button onClick={() => setShowAlertConfirm(false)}>{button2}</Button>
        </div>
      </div>
    </div>
  );
};

export default AlertConfirm;

import React, { useContext } from "react";
import "../Styles/Modal.css";
import { Button } from "@mui/material";
import { AuthContext } from "../Contexts/AuthContext";
import { serverURL } from "../config";

const AlertUnvolunteer = (props) => {
  const setShowAlertDeleteGarden = props.setShowAlertDeleteGarden;
  const deleteFrontendV = props.deleteFrontendV;
  const message = props.message;
  const button1 = props.button1;
  const button2 = props.button2;
  const id = props.id;

  const { getToken } = useContext(AuthContext);

  const deleteVolunteeredGarden = async (gardenid) => {
    console.log("gardenid", gardenid);
    const token = getToken();
    let urlencoded = new URLSearchParams({ _id: gardenid });
    var requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await fetch(
        `${serverURL}/api/user/unvolunteerforgarden`,
        requestOptions
      );
      console.log("alert volunteer", response);
      const result = await response.json();

      deleteFrontendV(gardenid);

      setShowAlertDeleteGarden(false);
      console.log("unvolunteering garden!", result);
    } catch (err) {
      console.log("Error with un-volunteering for this garden", err);
    }
  };

  return (
    <div
      onClick={() => setShowAlertDeleteGarden(false)}
      className="modalBackground"
    >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <Button onClick={() => setShowAlertDeleteGarden(false)}>X</Button>
        </div>
        <h4>{message}</h4>
        <div>
          <Button onClick={() => deleteVolunteeredGarden(id)}>{button1}</Button>
          <Button onClick={() => setShowAlertDeleteGarden(false)}>
            {button2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertUnvolunteer;

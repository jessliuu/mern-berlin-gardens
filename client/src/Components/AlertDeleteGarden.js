import React, { useContext } from "react";
import "../Styles/Modal.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../Contexts/AuthContext";

const AlertDeleteGarden = (props) => {
  const setShowAlertDeleteGarden = props.setShowAlertDeleteGarden;
  const deleteFrontend = props.deleteFrontend;
  const message = props.message;
  const button1 = props.button1;
  const button2 = props.button2;
  const id = props.id;

  const { getToken } = useContext(AuthContext);

  const deletePostedGarden = async (gardenid) => {
    const token = getToken();
    const myHeader = new Headers({
      Authorization: `Bearer ${token}`,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeader,
      body: new URLSearchParams({ gardenid: gardenid }),
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/deletegarden",
        requestOptions
      );
      const result = await response.json();

      if (response.status === 200) {
        deleteFrontend(gardenid);
      }
      console.log("deletedgarden", result);
      //  getMyGardens();
      setShowAlertDeleteGarden(false);
    } catch (err) {
      console.log("error deleting this garden", err);
    }
  };

  return (
    <div
      // onClick={() => setShowAlertDeleteGarden(false)}
      className="modalBackground"
    >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <Button onClick={() => setShowAlertDeleteGarden(false)}>X</Button>
        </div>
        <h4>{message}</h4>
        <div>
          <Button onClick={() => deletePostedGarden(id)}>{button1}</Button>
          <Button onClick={() => setShowAlertDeleteGarden(false)}>
            {button2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDeleteGarden;

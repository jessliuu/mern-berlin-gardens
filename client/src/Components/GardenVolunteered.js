import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import AlertDeleteGarden from "./AlertDeleteGarden";

const GardenVolunteered = (props) => {
  const { farmName, image, _id } = props.info;
  const deleteFrontend = props.deleteFrontend;
  const [showAlertDeleteGarden, setShowAlertDeleteGarden] = useState(false);

  return (
    <div className="garden-pv">
      <div className="garden-pv-left">
        <p>{farmName}</p>
        <img src={image} style={{ maxWidth: "60vw" }} />
      </div>
      <div className="garden-pv-right">
        <Link to={`/browse/${_id}`}>
          <IconButton aria-label="view details">
            <InfoIcon />
          </IconButton>
        </Link>
        <IconButton
          aria-label="view details"
          onClick={() => setShowAlertDeleteGarden(true)}
        >
          <DeleteForeverIcon />
        </IconButton>

        {showAlertDeleteGarden && (
          <AlertDeleteGarden
            setShowAlertDeleteGarden={setShowAlertDeleteGarden}
            id={_id}
            message="Are you sure you no longer want to volunteer for this garden?"
            button1="Yes, I am sure"
            button2="No, I changed my mind"
            // setPostingResult={setPostingResult}
            deleteFrontend={deleteFrontend}
          />
        )}
      </div>
    </div>
  );
};

export default GardenVolunteered;

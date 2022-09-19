import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { AuthContext } from "../Contexts/AuthContext";
import AlertDeleteGarden from "./AlertDeleteGarden";
import Volunteers from "./Volunteers";

const GardenPosted = (props) => {
  const { farmName, image, _id, volunteers } = props.info;
  const deleteFrontend = props.deleteFrontend;
  const [showAlertDeleteGarden, setShowAlertDeleteGarden] = useState(false);

  return (
    // <div>
    <div className="garden-pv">
      <div className="garden-pv-left">
        <p>{farmName}</p>
        <Volunteers volunteers={volunteers} />

        <img src={image} style={{ maxWidth: "60vw" }} />
      </div>
      <div className="garden-pv-right">
        <Link to={`/browse/${_id}`}>
          <IconButton aria-label="view details">
            <InfoIcon />
          </IconButton>
        </Link>
        <IconButton
          aria-label="delete garden"
          onClick={() => setShowAlertDeleteGarden(true)}
        >
          <DeleteForeverIcon />
        </IconButton>

        {showAlertDeleteGarden && (
          <AlertDeleteGarden
            setShowAlertDeleteGarden={setShowAlertDeleteGarden}
            id={_id}
            message="Are you sure you want to delete this garden?"
            button1="Yes, delete this garden"
            button2="No, keep this garden"
            // setPostingResult={setPostingResult}
            deleteFrontend={deleteFrontend}
          />
        )}
      </div>
    </div>
    //   {postingResult && <p>{postingResult}</p>}
    // </div>
  );
};

export default GardenPosted;

import React, { useContext, useState } from "react";
import AlertConfirm from "./AlertConfirm";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { AuthContext } from "../Contexts/AuthContext";
import AlertDeleteGarden from "./AlertDeleteGarden";

const GardenPosted = (props) => {
  const { farmName, image } = props.info;
  const id = props.info._id;
  console.log("garden singular", id);
  //   const deletePostedGarden = props.deletePostedGarden;
  const [showAlertDeleteGarden, setShowAlertDeleteGarden] = useState(false);
  //   const closeAlert = () => {
  //     setShowAlertConfirm(false);
  //   };
  console.log("show alert confirm", showAlertDeleteGarden);

  //   const deletePostedGarden = async (gardenid) => {
  //     const token = getToken();
  //     const myHeader = new Headers({
  //       Authorization: `Bearer ${token}`,
  //     });

  //     var requestOptions = {
  //       method: "DELETE",
  //       headers: myHeader,
  //       body: new URLSearchParams({ gardenid: gardenid }),
  //     };
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5001/api/user/deletegarden",
  //         requestOptions
  //       );
  //       const result = await response.json();
  //       console.log("deletedgarden", result);
  //       //  getMyGardens();
  //       setShowAlertDeleteGarden(false);
  //     } catch (err) {
  //       console.log("error deleting this garden", err);
  //     }
  //   };

  return (
    <div className="garden-pv">
      <div className="garden-pv-left">
        <p>{farmName}</p>
        <img src={image} style={{ maxWidth: "60vw" }} />
      </div>
      <div className="garden-pv-right">
        <Link to={`/browse/${id}`}>
          <IconButton aria-label="view details">
            <InfoIcon />
          </IconButton>
        </Link>
        <IconButton
          aria-label="delete garden"
          onClick={() => setShowAlertDeleteGarden(true)}

          //   onClick={() => setShowAlertConfirm(true)}
        >
          <DeleteForeverIcon />
        </IconButton>

        {/* {showAlertDeleteGarden && (
          <AlertConfirm
            setShowAlertConfirm={setShowAlertDeleteGarden}
            handleDelete={deletePostedGarden}
            id={_id}
            message="Are you sure you want to delete this garden?"
            button1="Yes, delete this garden"
            button2="No, keep this garden"
          />
        )} */}
        {showAlertDeleteGarden && (
          <AlertDeleteGarden
            setShowAlertDeleteGarden={setShowAlertDeleteGarden}
            // deletePostedGarden={deletePostedGarden(id)}
            id={id}
            message="Are you sure you want to delete this garden?"
            button1="Yes, delete this garden"
            button2="No, keep this garden"
          />
        )}
        {/* <p
                    style={{ color: "red", textDecoration: "underline" }}
                    onClick={() => deletePostedGarden(g._id)}
                  >
                    Delete
                  </p> */}
      </div>
    </div>
  );
};

export default GardenPosted;

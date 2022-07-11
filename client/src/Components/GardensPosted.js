import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import AlertConfirm from "./AlertConfirm";

const GardensPosted = () => {
  const [myGardens, setMyGardens] = useState([]);
  const { getToken, loginStatus } = useContext(AuthContext);
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);

  const getMyGardens = async () => {
    const token = getToken();
    const myHeader = new Headers({
      Authorization: `Bearer ${token}`,
    });
    var requestOptions = {
      method: "GET",
      headers: myHeader,
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/getpostedgardens",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setMyGardens(result.gardens);
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, []);

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
      console.log("deletedgarden", result);
      getMyGardens();
      setShowAlertConfirm(false);
    } catch (err) {
      console.log("error deleting this garden", err);
    }
  };

  return (
    <div>
      {loginStatus && (
        <div className="garden-pv-container">
          <h3 className="garden-pv-header">Gardens posted:</h3>

          {myGardens.map((g) => {
            return (
              <div className="garden-pv">
                <div className="garden-pv-left">
                  <p>{g.farmName}</p>
                  <img src={g.image} style={{ maxWidth: "60vw" }} />
                </div>
                <div className="garden-pv-right">
                  <Link to={`/browse/${g._id}`}>
                    <IconButton aria-label="view details">
                      <InfoIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete garden"
                    // onClick={() => deletePostedGarden(g._id)}
                    onClick={() => setShowAlertConfirm(true)}
                  >
                    {showAlertConfirm && (
                      <AlertConfirm
                        setShowAlertConfirm={setShowAlertConfirm}
                        handleDelete={deletePostedGarden}
                        id={g._id}
                        message="Are you sure you want to delete this garden?"
                        button1="Yes, delete this garden"
                        button2="No, keep this garden"
                      />
                    )}

                    <DeleteForeverIcon />
                  </IconButton>

                  {/* <p
                    style={{ color: "red", textDecoration: "underline" }}
                    onClick={() => deletePostedGarden(g._id)}
                  >
                    Delete
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GardensPosted;

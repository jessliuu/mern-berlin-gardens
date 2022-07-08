import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

const GardensVolunteered = () => {
  const [myGardens, setMyGardens] = useState([]);
  const { getToken, loginStatus } = useContext(AuthContext);
  const token = getToken();

  const getMyGardens = async () => {
    const myHeader = new Headers({
      Authorization: `Bearer ${token}`,
    });
    var requestOptions = {
      method: "GET",
      headers: myHeader,
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/getvolunteeredgardens",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setMyGardens(result.volunteeredgardens);
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, [loginStatus]);

  const deleteVolunteeredGarden = async (gardenid) => {
    let urlencoded = new URLSearchParams({ _id: gardenid });
    var requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/unvolunteerforgarden",
        requestOptions
      );
      const result = await response.json();
      console.log("unvolunteering garden!", result);
    } catch (err) {
      console.log("Error with un-volunteering for this garden", err);
    }
  };

  return (
    <div>
      {loginStatus &&
        (myGardens.length === 0 ? (
          <div className="garden-pv-container">
            <h3 className="garden-pv-header">Gardens volunteered:</h3>
            <p>You currently have not signed up to volunteer for any garden.</p>
          </div>
        ) : (
          <div className="garden-pv-container">
            <h3 className="garden-pv-header">Gardens volunteered:</h3>

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
                      aria-label="view details"
                      onClick={() => deleteVolunteeredGarden(g._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default GardensVolunteered;

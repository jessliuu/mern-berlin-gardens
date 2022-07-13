import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import AlertConfirm from "./AlertConfirm";
import GardenPosted from "./GardenPosted";

const GardensPosted = () => {
  const [myGardens, setMyGardens] = useState([]);
  const [loader, setLoader] = useState(true);
  const { getToken, loginStatus } = useContext(AuthContext);
  const [postingResult, setPostingResult] = useState("");

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
      setLoader(false);
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, []);

  const deleteFrontend = (id) => {
    setPostingResult("You have successfully deleted the garden.");
    setMyGardens(
      myGardens.filter(function (g) {
        return g._id !== id;
      })
    );
  };

  return (
    <div>
      {loginStatus && !loader ? (
        <div className="garden-pv-container">
          <h3 className="garden-pv-header">Gardens posted:</h3>
          {postingResult && <p>{postingResult}</p>}
          {myGardens.length === 0 ? (
            <p>You currently have not posted any garden.</p>
          ) : (
            myGardens.map((g) => {
              return <GardenPosted info={g} deleteFrontend={deleteFrontend} />;
            })
          )}
        </div>
      ) : null}
    </div>
  );
};

export default GardensPosted;

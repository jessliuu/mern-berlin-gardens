import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "../Styles/GardenPosted&Volunteered.css";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import GardenVolunteered from "./GardenVolunteered";

const GardensVolunteered = () => {
  const [myGardens, setMyGardens] = useState([]);
  const { getToken, loginStatus } = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
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
        "http://localhost:5001/api/user/getvolunteeredgardens",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setMyGardens(result.volunteeredgardens);
      setLoader(false);
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, [loginStatus]);

  // const deleteVolunteeredGarden = async (gardenid) => {
  //   let urlencoded = new URLSearchParams({ _id: gardenid });
  //   var requestOptions = {
  //     method: "POST",
  //     body: urlencoded,
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5001/api/user/unvolunteerforgarden",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     console.log("unvolunteering garden!", result);
  //   } catch (err) {
  //     console.log("Error with un-volunteering for this garden", err);
  //   }
  // };

  const deleteFrontend = (id) => {
    setPostingResult("You have successfully unsubscribed from the garden.");
    setMyGardens(
      myGardens.filter(function (g) {
        return g._id !== id;
      })
    );
  };

  return (
    <div>
      {loginStatus && !loader ? (
        myGardens.length === 0 ? (
          <div className="garden-pv-container">
            <h3 className="garden-pv-header">Gardens volunteered:</h3>
            {postingResult && <p>{postingResult}</p>}
            <p>You currently have not signed up to volunteer for any garden.</p>
          </div>
        ) : (
          <div className="garden-pv-container">
            <h3 className="garden-pv-header">Gardens volunteered:</h3>
            {postingResult && <p>{postingResult}</p>}
            {myGardens.map((g) => {
              return (
                <GardenVolunteered info={g} deleteFrontend={deleteFrontend} />
                // <div className="garden-pv">
                //   <div className="garden-pv-left">
                //     <p>{g.farmName}</p>
                //     <img src={g.image} style={{ maxWidth: "60vw" }} />
                //   </div>
                //   <div className="garden-pv-right">
                //     <Link to={`/browse/${g._id}`}>
                //       <IconButton aria-label="view details">
                //         <InfoIcon />
                //       </IconButton>
                //     </Link>
                //     <IconButton
                //       aria-label="view details"
                //       onClick={() => deleteVolunteeredGarden(g._id)}
                //     >
                //       <DeleteForeverIcon />
                //     </IconButton>
                //   </div>
                // </div>
              );
            })}
          </div>
        )
      ) : null}
    </div>
  );
};

export default GardensVolunteered;

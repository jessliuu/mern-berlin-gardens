import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import "../Styles/GardenPosted&Volunteered.css";
import GardenVolunteered from "./GardenVolunteered";
import { serverURL } from "../config";

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
        `${serverURL}/api/user/getvolunteeredgardens`,
        requestOptions
      );
      const result = await response.json();

      setMyGardens(result.volunteeredgardens);
      setLoader(false);
      // console.log("getmygardesn in volunteering", myGardens);
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, []);

  const deleteFrontendV = (id) => {
    console.log("getmygarden in volunteering 2", myGardens);
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
        <div className="garden-pv-container">
          <h3 className="garden-pv-header">Gardens volunteered:</h3>
          {postingResult && <p>{postingResult}</p>}
          {myGardens.length === 0 ? (
            <p>You currently have not signed up to volunteer for any garden.</p>
          ) : (
            myGardens.map((g) => {
              return (
                <GardenVolunteered info={g} deleteFrontendV={deleteFrontendV} />
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
};

export default GardensVolunteered;

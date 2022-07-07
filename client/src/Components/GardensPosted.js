import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { fontStyle } from "@mui/system";

const GardensPosted = () => {
  const [myGardens, setMyGardens] = useState([]);
  const { getToken, loginStatus } = useContext(AuthContext);

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
    } catch (err) {
      console.log("error deleting this garden", err);
    }
  };

  return (
    <div>
      {loginStatus && (
        <div>
          <h3>Gardens posted:</h3>

          {myGardens.map((g) => {
            return (
              <div>
                <p>{g.farmName}</p>
                <img src={g.image} style={{ maxHeight: "200px" }} />
                <Link to={`/browse/${g._id}`} className="p-2">
                  View details
                </Link>
                <p
                  style={{ color: "red", textDecoration: "underline" }}
                  onClick={() => deletePostedGarden(g._id)}
                >
                  Delete
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GardensPosted;

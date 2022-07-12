import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Container } from "@mui/material";
import { Button } from "react-bootstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GardenForm from "./GardenForm";
import GardensPosted from "./GardensPosted";
import GardensVolunteered from "./GardensVolunteered";

const Profile = () => {
  // const [userProfile, setUserProfile] = useState({});
  // const [userProfileError, setUserProfileError] = useState(
  //   "Please log in first"
  // );
  const { getToken, userProfile, userProfileError, loader } =
    useContext(AuthContext);

  // const getProfile = async () => {
  //   console.log("getProflie");
  //   const token = getToken();
  //   const myHeader = new Headers({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeader,
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5001/api/user/profile",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     console.log("results", result);

  //     setUserProfile({
  //       name: result.name,
  //       role: result.role,
  //       id: result.id,
  //       email: result.email,
  //       gardens: result.gardens,
  //       volunteeredgardens: result.volunteeredgardens,
  //     });

  //     console.log("userProfile2", userProfile);
  //     setUserProfileError(null);

  //     // showGardenForm();
  //     // showGardensPosted();
  //   } catch (err) {
  //     console.log("error getting profile", err.message);
  //     setUserProfileError("Please log in first");
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // console.log("userProfile", userProfile);
  // console.log("userProfile.role", userProfile.role);

  // const showGardenForm = () => {
  //   if (userProfile.role === "host") {
  //     return <GardenForm />;
  //   }
  // };

  // useEffect(() => {
  //   showGardenForm();
  // }, [userProfile]);

  // const showGardensPosted = () => {
  //   if (userProfile.role === "host") {
  //     return <GardensPosted />;
  //   }
  // };

  return (
    <Container style={{ marginTop: "5%" }}>
      {/* {loader && <p>loading...</p>} */}
      {!loader && (
        <div>
          {!userProfileError && !loader ? (
            <div
              style={{
                backgroundColor: "lightpink",
                borderRadius: "16px",
                color: "grey",
                padding: "4%",
                margin: "5%",
              }}
            >
              <p style={{ fontSize: "x-large" }}>
                Dear {userProfile.name}, you are logged in as a{" "}
                <span style={{ color: "green", fontSize: "x-large" }}>
                  {userProfile.role}
                </span>
                .
              </p>
              {userProfile.role === "host" ? (
                <p>
                  You can add a garden. <GardenForm />{" "}
                </p>
              ) : null}
            </div>
          ) : null}

          {userProfile.role === "host" && !loader ? <GardensPosted /> : null}
          {!loader ? <GardensVolunteered /> : null}

          {userProfileError && !loader ? <p>{userProfileError}</p> : null}
        </div>
      )}
    </Container>
  );
};

export default Profile;

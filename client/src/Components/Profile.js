import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Container } from "@mui/material";
import { Button } from "react-bootstrap";
import GardenForm from "./GardenForm";
import GardensPosted from "./GardensPosted";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userProfileError, setUserProfileError] = useState(
    "Please log in first"
  );
  const { getToken } = useContext(AuthContext);

  const getProfile = async () => {
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
        "http://localhost:5001/api/user/profile",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      console.log("result.user.role", result.user.role);
      setUserProfile(result.user);
      setUserProfileError(null);
      console.log("userProfile", userProfile);

      // showGardenForm();
      // showGardensPosted();
    } catch (err) {
      console.log("error getting profile", err);
      setUserProfileError("Please log in first");
    }
  };

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
    <Container maxWidth="sm" style={{ marginTop: "5%" }}>
      <button onClick={getProfile}>getProfile</button>
      {userProfile && (
        <h2
          style={{
            backgroundColor: "lightpink",
            borderRadius: "16px",
            color: "grey",
          }}
        >
          Dear{" "}
          <h2 style={{ color: "green", margin: "2%" }}>{userProfile.name},</h2>
          you are logged in as a{" "}
          <h2 style={{ color: "green" }}>{userProfile.role}.</h2>
        </h2>
      )}

      {/* {showGardenForm()} */}
      {/* {userProfile && userProfile.role === "host" ? <GardenForm /> : null} */}

      {/* 
      {userProfile.role === "host" ? (
        <Button variant="primary">Add a garden </Button>
      ) : (
        <p>View gardens you have volunteered for below</p>
      )}
      {userProfileError && <p>{userProfileError}</p>} */}
    </Container>
  );
};

export default Profile;

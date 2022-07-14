import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Container } from "@mui/material";
import { Button } from "react-bootstrap";
import GardenForm from "./GardenForm";
import GardensPosted from "./GardensPosted";
import GardensVolunteered from "./GardensVolunteered";

const Profile = () => {
  const [userProfileError, setUserProfileError] = useState(
    "Please log in first"
  );
  const { loginStatus, userProfile, loader } = useContext(AuthContext);

  const showUserProfileError = () => {
    if (loginStatus) {
      setUserProfileError(null);
    }
  };

  useEffect(() => {
    showUserProfileError();
  }, []);

  return (
    <Container style={{ marginTop: "5%" }}>
      {userProfileError && <p>{userProfileError}</p>}
      {!loader && (
        <div>
          {!userProfileError && !loader ? (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                color: "grey",
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
              {userProfile.role === "host" ? <GardenForm /> : null}
            </div>
          ) : null}

          {userProfile.role === "host" && !loader ? <GardensPosted /> : null}
          {!loader ? <GardensVolunteered /> : null}
        </div>
      )}
    </Container>
  );
};

export default Profile;

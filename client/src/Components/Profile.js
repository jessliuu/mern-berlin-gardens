import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
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
      setUserProfile({
        name: result.name,
        email: result.email,
        picture: result.picture,
        role: result.role,
      });
      setUserProfileError(null);
    } catch (err) {
      console.log("error getting profile", err);
      setUserProfileError("Please log in first");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {userProfile && (
        <p>
          Dear {userProfile.name}, you are logged in as a{" "}
          <span style={{ color: "green" }}>{userProfile.role}</span>.
        </p>
      )}
      {userProfileError && <p>{userProfileError}</p>}
    </div>
  );
};

export default Profile;

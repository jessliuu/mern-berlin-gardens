import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const redirectTo = useNavigate();
  const [loader, setLoader] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return false;
    }
  };

  const isUserLoggedIn = () => {
    const tokenExists = getToken();
    if (tokenExists) {
      setLoginStatus(true);
      console.log("User is logged in");
    } else {
      setLoginStatus(false);
      console.log("User is not logged in");
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setLoginStatus(false);
    setUserProfile({});
    redirectTo("/login");
  };

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

      setUserProfile({
        name: result.name,
        role: result.role,
        id: result.id,
        email: result.email,
        gardens: result.gardens,
        volunteeredgardens: result.volunteeredgardens,
      });

      setLoader(false);
    } catch (err) {
      console.log("error getting profile", err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        isUserLoggedIn,
        logOut,
        getToken,
        userProfile,
        getProfile,
        loader,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

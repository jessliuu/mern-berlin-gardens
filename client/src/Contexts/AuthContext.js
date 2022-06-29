import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
// import getToken from "../Utils/getToken.js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const redirectTo = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log(token);
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
      console.log(loginStatus);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setLoginStatus(false);
    redirectTo("/login");
  };

  return (
    <AuthContext.Provider
      value={{ loginStatus, isUserLoggedIn, logOut, getToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

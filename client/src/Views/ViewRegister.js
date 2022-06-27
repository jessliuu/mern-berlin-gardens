import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";

const ViewRegister = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <h2>Register here to get started!</h2>
      <RegistrationForm />
    </div>
  );
};

export default ViewRegister;

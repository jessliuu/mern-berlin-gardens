import React from "react";
import GardenForm from "../Components/GardenForm";
import GardensPosted from "../Components/GardensPosted";
import GardensVolunteered from "../Components/GardensVolunteered";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Profile from "../Components/Profile";

const ViewProfile = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <Profile />
      {/* <GardensPosted /> */}
      {/* <GardenForm /> */}
      <GardensVolunteered />
    </div>
  );
};

export default ViewProfile;

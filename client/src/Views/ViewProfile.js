import React, { Suspense } from "react";
import GardenForm from "../Components/GardenForm";
import GardensPosted from "../Components/GardensPosted";
import GardensVolunteered from "../Components/GardensVolunteered";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Profile from "../Components/Profile";

const ViewProfile = () => {
  // const timeOut = () => {
  //   console.log("time out run");
  //   return setTimeout(() => {
  //     <Profile />;
  //   }, 2000);
  // };
  const ProfilePage = React.lazy(() => import("../Components/Profile"));
  return (
    <div>
      <Header />
      <NavBar />
      <Profile />
      {/* <Suspense fallback={<div>...loading </div>}>
        <ProfilePage />
      </Suspense> */}

      {/* <GardensPosted /> */}
      {/* <GardenForm /> */}
      {/* <GardensVolunteered /> */}
    </div>
  );
};

export default ViewProfile;

import React, { Suspense } from "react";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";

const ViewProfile = () => {
  const ProfilePage = React.lazy(() => import("../Components/Profile"));
  return (
    <div>
      <Header />
      <NavBar />
      <Suspense fallback={<div>...loading </div>}>
        <ProfilePage />
      </Suspense>
    </div>
  );
};

export default ViewProfile;

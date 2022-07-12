import React, { useContext, useEffect } from "react";
import { GardensContext } from "../Contexts/GardensContext";
import { Grid } from "@mui/material";
import GardenCard from "../Components/GardenCard";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";

const ViewBrowse = () => {
  const { gardens, loader, fetchGardens } = useContext(GardensContext);

  useEffect(() => {
    fetchGardens();
  }, []);

  return (
    <div>
      <Header />
      <NavBar />
      {loader && <p>loading...</p>}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ padding: "20px" }}
      >
        {gardens &&
          gardens.map((garden) => {
            return (
              <GardenCard
                volunteers={garden.volunteers}
                farmName={garden.farmName}
                availableOn={garden.availableOn}
                neighborhood={garden.neighborhood}
                description={garden.description}
                image={garden.image}
                gardenid={garden._id}
                key={garden._id}
                hostName={garden.userid.name}
              />
            );
          })}
      </Grid>
    </div>
  );
};

export default ViewBrowse;

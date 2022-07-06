import React, { useContext, useEffect } from "react";
import { GardensContext } from "../Contexts/GardensContext";
import { Grid } from "@mui/material";
import GardenCard from "../Components/GardenCard";
import Header from "../Components/Header";
import MainPic from "../Components/MainPic";
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
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ padding: "20px" }}
      >
        {gardens &&
          gardens.map((garden) => {
            {
              console.log("my gardens>>>", garden.volunteers);
            }
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

import React, { useContext, useEffect } from "react";
import { GardensContext } from "../Contexts/GardensContext";
import { Grid } from "@mui/material";
import GardenCard from "../Components/GardenCard";

const ViewBrowse = () => {
  const { gardens, loader, fetchGardens } = useContext(GardensContext);
  useEffect(() => {
    fetchGardens();
  }, []);

  return (
    <div>
      <h1>This is my Client</h1>
      {/* {gardens && console.log(gardens)} */}
      <Grid container>
        <GardenCard info={gardens} />
      </Grid>
    </div>
  );
};

export default ViewBrowse;

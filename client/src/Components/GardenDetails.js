import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GardensContext } from "../Contexts/GardensContext";
import {
  Container,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Chat from "./Chat";
import { display } from "@mui/system";

const GardenDetails = () => {
  const params = useParams();
  console.log("params", params);
  const paramsNumber = params.gardenid;

  const { gardens, fetchGardens } = useContext(GardensContext);

  useEffect(() => {
    fetchGardens();
  }, []);
  console.log("gardens", gardens);

  const redirectTo = useNavigate();
  const handleBackToBrowse = () => redirectTo("/browse");

  return (
    <Container className="fluid mt-2">
      {/* <div>
        <h2>
          {farmName} {availableOn}
        </h2>
        <Card.Img variant="top" src={image} />
        <p>Neighborhood: &#160;{neighborhood} &#160;</p>
        <p>
          Looking for: &#160;{groupSize} &#160;volunteers in total.
          {/* {noOfVolunteers(e.volunteers.length, e.groupSize)} spots
                available. */}
      {/* </p>
        <p>Description: &#160;{description} &#160;</p>
        {experienceRequired ? (
          <p>Experience required</p>
        ) : (
          <p>Experience not required</p>
        )}
      </div> */}

      {gardens &&
        gardens
          .filter((garden) => {
            return garden._id === paramsNumber;
          })
          .map((e) => (
            <div>
              <h2>
                {e.farmName} {new Date(e.availableOn).toLocaleDateString()}
              </h2>
              <Card.Img variant="top" src={e.image} />
              <p>Neighborhood: &#160;{e.neighborhood} &#160;</p>
              <p>
                Looking for:&#160;{e.groupSize} &#160;volunteers in total.
                &#160;
                {e.groupSize - e.volunteers.length} spots available.
              </p>
              <p>Description: &#160;{e.description} &#160;</p>
              {e.experienceRequired ? (
                <p>Experience required</p>
              ) : (
                <p>Experience not required</p>
              )}
            </div>
          ))}

      {/* Option 1: use redirectTo as a callback  */}
      {/* <Button
        variant="outline-light"
        onClick={() => redirectTo("/", { replace: true })}
      /> */}
      {/* Option 2: use redirectTo in another function */}
      <Button variant="outline-dark" onClick={handleBackToBrowse}>
        Back to browse
      </Button>
      <Chat params={params} />
    </Container>
  );
};

export default GardenDetails;

import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GardensContext } from "../Contexts/GardensContext";
import { Container, Card, Button } from "react-bootstrap";

const GardenDetails = () => {
  const params = useParams();
  const paramsNumber = params.gardenid;

  const { gardens } = useContext(GardensContext);
  //   console.log(typeof gardens[0]._id);

  let result = {};
  const selectedGarden = gardens
    .filter((garden) => {
      return garden._id === paramsNumber;
    })
    .map((e) => {
      result = e;
    });
  console.log(result.farmName);

  const redirectTo = useNavigate();
  const handleBackToBrowse = () => redirectTo("/browse");

  const farmName = result.farmName;
  const availableOn = result.availableOn;
  const neighborhood = result.neighborhood;
  const groupSize = result.groupSize;
  const experienceRequired = result.experienceRequired;
  const description = result.description;
  const image = result.image;

  return (
    <Container className="fluid mt-2">
      <h2>
        {farmName} {availableOn}
      </h2>
      <Card.Img variant="top" src={image} />
      <p>Neighborhood: &#160;{neighborhood} &#160;</p>
      <p>Looking for: &#160;{groupSize} &#160;volunteers</p>
      <p>Description: &#160;{description} &#160;</p>
      {experienceRequired ? (
        <p>Experience required</p>
      ) : (
        <p>Experience not required</p>
      )}

      {/* Option 1: use redirectTo as a callback  */}
      {/* <Button
        variant="outline-light"
        onClick={() => redirectTo("/", { replace: true })}
      /> */}

      {/* Option 2: use redirectTo in another function */}
      <Button variant="outline-light" onClick={handleBackToBrowse}>
        Back to browse
      </Button>

      {/* <MyButton message="Back to browse" onClick={redirectTo("/browse")} /> */}
    </Container>
  );
};

export default GardenDetails;

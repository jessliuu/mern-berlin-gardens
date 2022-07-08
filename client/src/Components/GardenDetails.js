import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GardensContext } from "../Contexts/GardensContext";
import { Container, Card, Button, Row } from "react-bootstrap";
import Chat from "./Chat";
import "../Styles/GardenDetails.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

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
    <Container className="fluid mt-2 ">
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
            <div className="garden-details-container py-2">
              <Row className="garden-details-header">
                <h2>{e.farmName}</h2>
                <h4>
                  available on {new Date(e.availableOn).toLocaleDateString()}
                </h4>
              </Row>
              <Row className="garden-details-image">
                <Card.Img variant="top" src={e.image} />
              </Row>
              <Row className="garden-details-body">
                <p>Neighborhood: &#160;{e.neighborhood} &#160;</p>
                <p>Description: &#160;{e.description} &#160;</p>
                {e.experienceRequired ? (
                  <p>Experience required</p>
                ) : (
                  <p>Experience not required</p>
                )}
                <p>
                  Looking for&#160;{e.groupSize} &#160;volunteers in total.
                  &#160;
                  <p className="spots-left">
                    {e.groupSize - e.volunteers.length} spots left.
                  </p>
                </p>
              </Row>
            </div>
          ))}

      {/* Option 1: use redirectTo as a callback  */}
      {/* <Button
        variant="outline-light"
        onClick={() => redirectTo("/", { replace: true })}
      /> */}
      {/* Option 2: use redirectTo in another function */}

      <Chat params={params} />
      <IconButton variant="outline-dark" onClick={handleBackToBrowse}>
        <p> &#9001; Back to Browse</p>
      </IconButton>
    </Container>
  );
};

export default GardenDetails;

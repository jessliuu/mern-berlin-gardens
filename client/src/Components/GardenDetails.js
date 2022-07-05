import React, { useContext } from "react";
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

const GardenDetails = () => {
  const params = useParams();
  console.log("params", params);
  const paramsNumber = params.gardenid;

  const { gardens } = useContext(GardensContext);
  // const [messages, setMessages] = useState(null);
  // const [chatMsg, setChatMsg] = useState("");
  //   console.log(typeof gardens[0]._id);

  let result = {};
  const selectedGarden = gardens
    .filter((garden) => {
      return garden._id === paramsNumber;
    })
    .map((e) => {
      result = e;
    });
  console.log(result);

  const redirectTo = useNavigate();
  const handleBackToBrowse = () => redirectTo("/browse");

  const farmName = result.farmName;
  const availableOn = result.availableOn;
  const availableOnDate = new Date().toLocaleDateString();
  const neighborhood = result.neighborhood;
  const groupSize = result.groupSize;
  const experienceRequired = result.experienceRequired;
  const description = result.description;
  const image = result.image;
  const volunteers = result.volunteers;
  console.log("type of volunteers", typeof volunteers);
  let noOfVolunteers = () => {
    if (result.volunteers.length === 0) {
      noOfVolunteers = groupSize;
    } else {
      noOfVolunteers = groupSize - volunteers.length;
    }
  };

  return (
    <Container className="fluid mt-2">
      <h2>
        {farmName} {availableOnDate}
      </h2>
      <Card.Img variant="top" src={image} />
      <p>Neighborhood: &#160;{neighborhood} &#160;</p>
      <p>
        Looking for: &#160;{groupSize} &#160;volunteers in total.
        {noOfVolunteers} spots available.
      </p>
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
      <Button variant="outline-dark" onClick={handleBackToBrowse}>
        Back to browse
      </Button>

      <Chat params={params} />
    </Container>
  );
};

export default GardenDetails;

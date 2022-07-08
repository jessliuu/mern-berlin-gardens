import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../Styles/GardenCard.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import Modal from "./Modal";

function GardenCard(props) {
  const { getToken, userProfile } = useContext(AuthContext);
  const token = getToken();
  const [iVolunteered, setIVolunteered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // console.log("props", props);

  const farmName = props.farmName;
  const neighborhood = props.neighborhood;
  const description = props.description;
  const image = props.image;
  const gardenid = props.gardenid;
  const volunteers = props.volunteers;
  const hostName = props.hostName;

  // console.log(volunteers);
  const didIVolunteer = (volunteers) => {
    const volunteerids = volunteers.map((v) => v._id);
    console.log(volunteerids);
    if (volunteerids.includes(userProfile.id)) {
      console.log("true", userProfile.id);
      setIVolunteered(true);
    }
  };

  useEffect(() => {
    didIVolunteer(volunteers);
  }, []);

  const handleFavorite = async () => {
    let urlencoded = new URLSearchParams({ _id: gardenid });
    var requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: { Authorization: `Bearer ${token}` },
    };
    if (iVolunteered) {
      setIVolunteered(false);
      try {
        const response = await fetch(
          "http://localhost:5001/api/user/unvolunteerforgarden",
          requestOptions
        );
        const result = await response.json();
        console.log("unvolunteering garden!", result);
      } catch (err) {
        console.log("Error with un-volunteering for this garden", err);
      }
    } else {
      setIVolunteered(true);
      try {
        const response = await fetch(
          "http://localhost:5001/api/user/volunteerforgarden",
          requestOptions
        );
        const result = await response.json();
        console.log("volunteering garden!", result);
      } catch (err) {
        console.log("Error with signing up to volunteer for this garden", err);
      }
    }
  };

  const handleShare = () => {
    setShowModal(true);
  };

  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[500] }} aria-label="hostName">
              {hostName ? hostName[0] : "H"}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Link to={`/browse/${gardenid}`}>
                <MoreVertIcon />
              </Link>
            </IconButton>
          }
          title={farmName}
          subheader={neighborhood}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="garden image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleFavorite}>
            {iVolunteered ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteIcon color="disabled" />
            )}
          </IconButton>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse> */}
        {showModal && (
          <Modal
            farmName={farmName}
            gardenid={gardenid}
            setShowModal={setShowModal}
          />
        )}
      </Card>
    </Grid>
  );
}

export default GardenCard;

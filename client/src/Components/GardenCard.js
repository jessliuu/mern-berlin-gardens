import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../Styles/GardenCard.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

function GardenCard(props) {
  console.log("props", props);
  const info = props.info;
  const farmName = info.farmName;
  const neighborhood = info.neighborhood;
  const hostName = info.userid.name;
  const description = info.description;
  const image = info.image;
  const gardenid = info._id;
  // const volunteers = info.volunteers;

  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const [isLiked, setIsLiked] = useState(false);

  // const initialIsFav = () => {
  //   if (isLiked) {
  //     setIsFav(true);
  //   } else {
  //     setIsFav(false);
  //   }
  // };

  const handleFavorite = async () => {
    let urlencoded = new URLSearchParams({ _id: gardenid });
    var requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/user/volunteerforgarden",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      // redirectTo("/profile");
      // isUserLoggedIn();
    } catch (err) {
      console.log("Error with signing up to volunteer for this garden", err);
    }
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
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
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
      </Card>
    </Grid>
  );
}

export default GardenCard;

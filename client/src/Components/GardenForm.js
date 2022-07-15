import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { serverURL } from "../config";

const GardenForm = (props) => {
  const redirectTo = useNavigate();
  const { getToken, loginStatus, isUserLoggedIn, userProfile } =
    useContext(AuthContext);
  const token = getToken();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);
  const [postingResult, setPostingResult] = useState("");

  const handleShowForm = () => {
    if (!isFormShown) {
      setIsFormShown(true);
    } else {
      setIsFormShown(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormShown(false);
  };

  const [formValues, setFormValues] = useState({
    farmName: "",
    availableOn: "",
    description: "",
    groupSize: "",
    neighborhood: "",
    experienceRequired: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    console.log("typeof value", typeof value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append("image", selectedFile);
    formdata.append("farmName", formValues.farmName);
    formdata.append("availableOn", formValues.availableOn);
    formdata.append("neighborhood", formValues.neighborhood);
    formdata.append("experienceRequired", formValues.experienceRequired);
    formdata.append("description", formValues.description);
    formdata.append("groupSize", formValues.groupSize);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        `${serverURL}/api/user/addgarden`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      redirectTo("/profile");
      isUserLoggedIn();
      setIsFormShown(false);
      setFormValues({
        farmName: "",
        availableOn: "",
        description: "",
        groupSize: "",
        neighborhood: "",
        experienceRequired: false,
      });
      setPostingResult(
        "You have successfully added this garden. Refresh page to view updated list."
      );
    } catch (err) {
      console.log("Error with adding garden", err);
    }
  };

  const attachFileHandler = async (e) => {
    // console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
    // console.log(selectedFile);
    console.log("submit working");
  };

  // const useStyles = makeStyles({
  //   input: {
  //     color: "blue",
  //   },
  // });
  // const uploadPicture = async () => {
  //   // call  FormData object constructor to populate with pairs of key/values (in this case {image: "our file"} )
  //   const formData = new FormData();
  //   console.log("selectedFile", selectedFile);
  //   formData.append("image", selectedFile);
  //   console.log("formData", formData);
  //   // compose the object with the options to be sent with our request, including the type of method, and use the body of the request to attach data
  //   const requestOptions = {
  //     method: "POST",
  //     body: formData,
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:5001/api/user/imageUpload",
  //       requestOptions
  //     );
  //     console.log("response", response);
  //     const result = await response.json();
  //     console.log("result", result);
  //     setFormValues({ ...formValues, image: result.imageUrL }); // imageURL is how the field is defined in usersController
  //   } catch (error) {
  //     console.log('"error submiting picture"', error);
  //   }
  // };

  return (
    <div>
      {postingResult && (
        <p style={{ fontSize: 15, color: "green" }}>{postingResult}</p>
      )}
      {userProfile.role === "host" && !postingResult ? (
        <form
          onSubmit={handleSubmit}
          style={{
            // borderColor: "lightgreen",
            // border: "solid 0.5px",
            backgroundColor: "lightgreen",
            borderRadius: "16px",
            padding: 20,
          }}
        >
          <div>
            You can post a garden.{" "}
            {!isFormShown ? (
              <IconButton
                aria-label="show garden form"
                onClick={handleShowForm}
              >
                <AddCircleOutline />
              </IconButton>
            ) : (
              <IconButton
                aria-label="remove garden form"
                onClick={handleCloseForm}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </div>

          {isFormShown ? (
            <div>
              <Grid
                pb={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={5} md={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    farm name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="farmname-input"
                    name="farmName"
                    // label="Farm Name"
                    type="text"
                    value={formValues.farmName}
                    onChange={handleInputChange}
                    variant="standard"
                    required
                    fullWidth
                    inputProps={{ maxLength: 120 }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid
                pb={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={5} md={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    available on
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="availableon-input"
                    name="availableOn"
                    // label="Available On"
                    type="date"
                    value={formValues.availableOn}
                    onChange={handleInputChange}
                    variant="standard"
                    required
                    fullWidth
                    inputProps={{ maxLength: 120 }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid
                pb={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={5} md={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    description
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="description-input"
                    name="description"
                    // label="Description"
                    type="text"
                    value={formValues.description}
                    onChange={handleInputChange}
                    variant="standard"
                    multiline
                    required
                    fullWidth
                    inputProps={{ maxLength: 120 }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid
                pb={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={5} md={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    group size
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="groupsize-input"
                    name="groupSize"
                    // label="Group Size"
                    type="number"
                    value={formValues.groupSize}
                    onChange={handleInputChange}
                    variant="standard"
                    required
                    fullWidth
                    inputProps={{ maxLength: 120 }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid
                pb={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={5} md={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    neighborhood
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Select
                    labelId="neighborhood-select-label"
                    name="neighborhood"
                    value={formValues.neighborhood}
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                    MenuProps={{
                      // anchorOrigin: {
                      //   vertical: "bottom",
                      //   horizontal: "left",
                      // },
                      // transformOrigin: {
                      //   vertical: "top",
                      //   horizontal: "left",
                      // },
                      // getContentAnchorEl: null,
                      disableScrollLock: true,
                    }}
                    inputProps={{ maxLength: 120 }}
                    size="small"
                    fullWidth
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem
                      key="Charlottenburg"
                      value="Charlottenburg"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Charlottenburg
                    </MenuItem>
                    <MenuItem
                      key="Friedrichshain-Kreuzberg"
                      value="Friedrichshain-Kreuzberg"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Friedrichshain-Kreuzberg
                    </MenuItem>
                    <MenuItem
                      key="Lichtenberg "
                      value="Lichtenberg"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Lichtenberg
                    </MenuItem>
                    <MenuItem
                      key="Mitte"
                      value="Mitte"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Mitte
                    </MenuItem>
                    <MenuItem
                      key="Neukölln"
                      value="Neukölln"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Neukölln
                    </MenuItem>
                    <MenuItem
                      key="Pankow"
                      value="Pankow"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Pankow
                    </MenuItem>
                    <MenuItem
                      key="Schöneberg"
                      value="Schöneberg"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Schöneberg
                    </MenuItem>
                    <MenuItem
                      key="Spandau"
                      value="Spandau"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Spandau
                    </MenuItem>
                    <MenuItem
                      key="Other"
                      value="Other"
                      sx={{ fontSize: "12px", padding: 1 }}
                    >
                      Other
                    </MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid
                pb={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item xs={5} md={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"left"}
                  >
                    experience
                  </Typography>
                </Grid>

                <Grid item xs>
                  <RadioGroup
                    name="experienceRequired"
                    defaultValue={false}
                    value={formValues.experienceRequired}
                    onChange={handleInputChange}
                    row
                    required
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    <FormControlLabel
                      key="true"
                      value={true}
                      control={<Radio size="extra-small" />}
                      label={
                        <Typography style={{ fontSize: "15px" }}>
                          Required
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      key="false"
                      value={false}
                      control={<Radio size="extra-small" />}
                      label={
                        <Typography style={{ fontSize: "15px" }}>
                          Not required
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Grid item xs={12} style={{ padding: 20 }}>
                <FormControl>
                  <div style={{ alignContent: "center" }}>
                    <input type="file" onChange={attachFileHandler} required />
                  </div>
                </FormControl>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                item
                xs={12}
              >
                Submit
              </Button>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default GardenForm;

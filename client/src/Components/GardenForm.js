import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { border, borderColor } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const GardenForm = (props) => {
  // const role = props.userProfile.role;
  // console.log("role", role);

  const [isFormShown, setIsFormShown] = useState(false);
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

  const [selectedFile, setSelectedFile] = useState(null);

  const redirectTo = useNavigate();
  const { getToken, loginStatus, isUserLoggedIn } = useContext(AuthContext);
  const token = getToken();

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

    // let urlencoded = new URLSearchParams({
    //   farmName: formValues.farmName,
    //   availableOn: formValues.availableOn,
    //   description: formValues.description,
    //   groupSize: formValues.groupSize,
    //   neighborhood: formValues.neighborhood,
    //   experienceRequired: formValues.experienceRequired,

    // });

    // let formdata = new FormData({

    //   farmName: formValues.farmName,
    //   availableOn: formValues.availableOn,
    //   description: formValues.description,
    //   groupSize: formValues.groupSize,
    //   neighborhood: formValues.neighborhood,
    //   experienceRequired: formValues.experienceRequired,
    //   image: selectedFile,
    // });

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
        "http://localhost:5001/api/user/addgarden",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      redirectTo("/profile");
      isUserLoggedIn();
      setIsFormShown(false);
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
      {!isFormShown ? (
        <IconButton aria-label="show garden form" onClick={handleShowForm}>
          <AddCircleOutline />
        </IconButton>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "lightgreen", padding: 20, margin: 20 }}
        >
          <IconButton aria-label="show garden form" onClick={handleCloseForm}>
            <RemoveCircleOutlineIcon />
          </IconButton>

          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-evenly"
            direction="row"
            spacing={3}
          >
            {/* <Grid item xs={12}>
              <IconButton
                aria-label="show garden form"
                onClick={handleCloseForm}
              >
                <RemoveCircleOutline />
              </IconButton>
            </Grid> */}
            <Grid item xs={6}>
              <FormLabel>Farm Name</FormLabel>
              <TextField
                style={{ width: "50%" }}
                id="farmname-input"
                name="farmName"
                // label="Farm Name"
                type="text"
                value={formValues.farmName}
                onChange={handleInputChange}
                variant="standard"
                required
              />
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Available on</FormLabel>
              <TextField
                id="availableon-input"
                name="availableOn"
                // label="Available On"
                type="date"
                value={formValues.availableOn}
                onChange={handleInputChange}
                variant="standard"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Description</FormLabel>
              <TextField
                style={{ width: "80%" }}
                id="description-input"
                name="description"
                // label="Description"
                type="text"
                value={formValues.description}
                onChange={handleInputChange}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Group Size</FormLabel>
              <TextField
                id="groupsize-input"
                name="groupSize"
                // label="Group Size"
                type="number"
                value={formValues.groupSize}
                onChange={handleInputChange}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <FormLabel>Experience</FormLabel>
                <RadioGroup
                  name="experienceRequired"
                  defaultValue={false}
                  value={formValues.experienceRequired}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    key="true"
                    value={true}
                    control={<Radio size="small" />}
                    label="Required"
                  />
                  <FormControlLabel
                    key="false"
                    value={false}
                    control={<Radio size="small" />}
                    label="Not Required"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <FormLabel id="neighborhood-select-label">
                  Neighborhood
                </FormLabel>
                <Select
                  labelId="neighborhood-select-label"
                  name="neighborhood"
                  value={formValues.neighborhood}
                  onChange={handleInputChange}
                  variant="outlined"
                >
                  <MenuItem key="mitte" value="mitte">
                    Mitte
                  </MenuItem>
                  <MenuItem key="spandau" value="spandau">
                    Spandau
                  </MenuItem>
                  <MenuItem key="pankow " value="pankow">
                    Pankow
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ padding: 20 }}>
              <FormControl>
                <div style={{ alignContent: "center" }}>
                  <input type="file" onChange={attachFileHandler} />
                  {/* <Button
                    onClick={uploadPicture}
                    variant="contained"
                    color="inherit"
                  >
                    <AttachFileIcon />
                  </Button> */}
                </div>
              </FormControl>
            </Grid>

            {/* <Button variant="contained" component="label">
          Upload File
          <input type="file" />
        </Button> */}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              item
              xs={12}
            >
              Submit
            </Button>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default GardenForm;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const RegistrationForm = () => {
  const [newUser, setNewUser] = useState({});

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const signUp = async () => {
    //verify all necessary fields are filled
    // verify email / password length and strength with Regex

    //check code in Postman to see how composes the object that is sent in request's body
    let urlencoded = new URLSearchParams({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      picture: newUser.picture
        ? newUser.picture
        : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    });
    // urlencoded.append("name", newUser.name);
    // urlencoded.append("email", newUser.email);
    // urlencoded.append("password", newUser.password);
    // urlencoded.append("role", newUser.role);
    // urlencoded.append(
    // "picture",
    // newUser.picture
    //   ? newUser.picture
    //   : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    // );
    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/user/signup",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error fetching", error);
    }
  };
  return (
    <div>
      <Form onSubmit={signUp}>
        <Form.Group className="m-3">
          <Form.Label for="exampleEmail">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="john.smith@mail.com"
            onChange={handleChangeHandler}
            value={newUser.email ? newUser.email : ""}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Label for="exampleName">Name</Form.Label>
          <Form.Control
            type="name"
            name="name"
            id="exampleName"
            onChange={handleChangeHandler}
            value={newUser.name ? newUser.name : ""}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Label for="examplePassword">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="examplePassword"
            placeholder="required"
            onChange={handleChangeHandler}
            value={newUser.password ? newUser.password : ""}
          />
        </Form.Group>

        <div className="mb-3">
          <input
            // inline
            label="host"
            name="role"
            type="radio"
            onChange={handleChangeHandler}
            value="host"
            id="host"
          />
          <label for="host">Host </label>
          <input
            // inline
            label="volunteer"
            name="role"
            type="radio"
            onChange={handleChangeHandler}
            value="volunteer"
            id="volunteer"
          />
          <label for="volunteer">Volunteer</label>
        </div>

        <Button type="submit" variant="outline-light" className="m-3">
          Sign me up!
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
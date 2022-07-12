import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [newUser, setNewUser] = useState({});
  const [registrationResult, setRegistrationResult] = useState("");
  const [error, setError] = useState("");
  const redirectTo = useNavigate();

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (newUser.password.length < 6) {
      setError("Your password must contain at least 6 characters.");
    } else if (!newUser.role) {
      setError("You must select a role.");
      //check code in Postman to see how composes the object that is sent in request's body
    } else {
      let urlencoded = new URLSearchParams({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        picture: newUser.picture
          ? newUser.picture
          : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
      });

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
        if (response.status === 409) {
          console.log("results", results);
          setError(results.message);
        } else {
          console.log("results", results);
          setRegistrationResult(results.message);
        }
      } catch (error) {
        console.log("Server error", error);
      }
    }
  };
  return (
    <div>
      <Row className="gx-5 gy-2 " xs={1} md={2}>
        <Form onSubmit={signUp}>
          <Form.Group className="m-3" style={{ textAlign: "left" }}>
            <Form.Label for="exampleEmail">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="john.smith@mail.com"
              onChange={handleChangeHandler}
              value={newUser.email ? newUser.email : ""}
              required
            />
          </Form.Group>

          <Form.Group className="m-3" style={{ textAlign: "left" }}>
            <Form.Label for="exampleName">Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              id="exampleName"
              placeholder="John"
              onChange={handleChangeHandler}
              value={newUser.name ? newUser.name : ""}
              required
            />
          </Form.Group>

          <Form.Group className="m-3" style={{ textAlign: "left" }}>
            <Form.Label for="examplePassword">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="examplePassword"
              placeholder="must contain at least 6 characters"
              onChange={handleChangeHandler}
              value={newUser.password ? newUser.password : ""}
              required
            />
          </Form.Group>

          <div className="mb-3" style={{ textAlign: "center" }}>
            <input
              // inline
              label="host"
              name="role"
              type="radio"
              onChange={handleChangeHandler}
              value="host"
              id="host"
            />
            <label for="host">Host &#160; &#160;</label>
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

          <Button type="submit" variant="outline-dark" className="m-3">
            Sign me up!
          </Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {registrationResult && <p>{registrationResult}</p>}
        </Form>
      </Row>
    </div>
  );
};

export default RegistrationForm;

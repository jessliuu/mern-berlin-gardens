import React from "react";
import { Form, Button } from "react-bootstrap";

const RegistrationForm = () => {
  return (
    <div>
      {/* <Form onSubmit={handleRegister}> */}
      <Form.Group className="m-3">
        <Form.Label for="exampleEmail">Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="john.smith@mail.com"
          //   onChange={handleEmailChange}
          //   value={email}
        />
      </Form.Group>
      <Form.Group className="m-3">
        <Form.Label for="examplePassword">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          id="examplePassword"
          placeholder="required"
          //   onChange={handlePasswordChange}
          //   value={password}
        />
      </Form.Group>
      <Button type="submit" variant="outline-light" className="m-3">
        Sign me up!
      </Button>

      {/* </Form> */}
    </div>
  );
};

export default RegistrationForm;

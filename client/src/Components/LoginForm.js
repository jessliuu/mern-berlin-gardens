import React, { useState, useContext } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState(null);
  //   const { errorfromLogin } = useContext(AuthContext);

  //   const handleEmailChange = (e) => {
  //     setEmail(e.target.value);
  //   };

  //   const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  //   };

  //   const { login } = useContext(AuthContext);
  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     if (email.includes("@") && password.length > 5) {
  //       login(email, password);
  //       setError(null);
  //     } else {
  //       setError("Invalid login. Please try again.");
  //     }
  //   };

  return (
    <div>
      <Row className="gx-5 gy-2 " xs={1} md={2}>
        {/* <Form onSubmit={handleLogin}> */}
        <Form>
          <Form.Group className="m-3">
            <Form.Label for="exampleEmail" className="h3">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="exampleEmail"
              //   value={email}
              placeholder="john.smith@mail.com"
              //   onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label for="examplePassword" className="h3">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="examplePassword"
              //   value={password}
              placeholder="required"
              //   onChange={handlePasswordChange}
            />
            <Button type="submit" variant="outline-light" className="m-3">
              Log In
            </Button>
          </Form.Group>
        </Form>

        {/* <div>
          {error && <p>{error}</p>}
          {errorfromLogin && <p>{errorfromLogin}</p>}
        </div> */}
        <div>
          <p>
            Don't have an account? Register <Link to="/register">here</Link>
          </p>
        </div>
      </Row>
    </div>
  );
}

export default LoginForm;

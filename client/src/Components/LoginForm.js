import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [logInUser, setLogInUser] = useState("");
  //   const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //   const { errorfromLogin } = useContext(AuthContext);

  const { loginStatus, isUserLoggedIn, logOut, getProfile } =
    useContext(AuthContext);
  console.log(loginStatus);
  // useEffect(() => {
  //   isUserLoggedIn();
  // }, [loginStatus]);
  const redirectTo = useNavigate();

  const handleChangeHandler = (e) => {
    setLogInUser({ ...logInUser, [e.target.name]: e.target.value });
  };

  const logIn = async (e) => {
    // console.log(logInUser.email, logInUser.password);
    e.preventDefault();
    let urlencoded = new URLSearchParams({
      email: logInUser.email,
      password: logInUser.password,
    });

    var requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/user/login",
        requestOptions
      );

      const result = await response.json();
      const token = result.token;
      console.log("token in Login Form", token);
      const user = result.user;
      console.log(user);
      if (token) {
        localStorage.setItem("token", token);
        getProfile();
        redirectTo("/profile");
        isUserLoggedIn();
      } else {
        isUserLoggedIn();
        console.log("Error setting token");
        // return <p>Error setting token</p>
        setError("Error setting token");
      }
    } catch (err) {
      console.log("Error with logging in", err);
      setError("Error with logging in");
    }
  };

  return (
    <div>
      <Row className="gx-5 gy-2 " xs={1} md={2}>
        <Form onSubmit={logIn}>
          {/* <Form> */}
          <Form.Group className="m-3">
            <Form.Label for="exampleEmail" className="h3">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="exampleEmail"
              value={logInUser.email ? logInUser.email : ""}
              placeholder="john.smith@mail.com"
              onChange={handleChangeHandler}
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
              value={logInUser.password ? logInUser.password : ""}
              placeholder="required"
              onChange={handleChangeHandler}
            />
            <Button type="submit" variant="outline-light" className="m-3">
              Log In
            </Button>
          </Form.Group>
        </Form>

        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* {errorfromLogin && <p>{errorfromLogin}</p>} */}
        </div>
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

import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";
// import { AuthContext } from "../../Contexts/AuthContext";
// import logo from "./logo.svg";

function NavBar() {
  //   const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        className="justify-content-around"
        // style={{ marginBottom: 20 }}
      >
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            backgroundColor: "white",
            marginRight: 20,
          }}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ flexGrow: 0, marginRight: 20 }}
        >
          <Nav className="me-auto">
            <Link to="/" className="p-2">
              Home
            </Link>
            <Link to="/browse" className="p-2">
              Browse
            </Link>
            <Link to="/login" className="p-2">
              Login
            </Link>
            <Link to="/profile" className="p-2">
              Profile
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;

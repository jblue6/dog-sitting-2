import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

class NavBar extends Component {
  static contextType = GlobalContext;

  state = {
    onHomePage: true
  };

  buttonClicked = e => {
    e.preventDefault();
    this.context.logout();
  }

  componentDidMount() {
    const onHomePage = window.location.pathname === "/";
    this.setState({
      onHomePage
    });
  }

  render() {
    const { isAuthenticated } = this.context.auth;
    const { isAdmin } = this.context.auth.user;

    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Dog Sitting</Navbar.Brand>
          <Nav className="mr-sm-2">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/prices">Prices</Nav.Link>
            {
              isAuthenticated ?
                <>
                  <Nav.Link href="/booking">Booking</Nav.Link>
                  {isAdmin ? <Nav.Link href="/admin">Admin</Nav.Link> : ""}
                  <Nav.Link href="/account">Account</Nav.Link>
                  <Nav.Link onClick={this.buttonClicked}>Logout</Nav.Link>
                </> : <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
            }
            <Nav.Link
              href="https://github.com/jblue6/dog-sitting-2"
              target="_blank"
            >
              <img src="GitHub-Mark-32px.png" alt="Loading" />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

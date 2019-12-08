import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

class NavBar extends Component {
  state = {
    onHomePage: true
  };

  componentDidMount() {
    const onHomePage = window.location.pathname === "/";
    this.setState({
      onHomePage
    });
  }

  render() {
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Dog Sitting</Navbar.Brand>
          <Nav className="mr-sm-2">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/prices">Prices</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link href="https://github.com/jblue6/dog-sitting-2" target="_blank"><img src="GitHub-Mark-32px.png" /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

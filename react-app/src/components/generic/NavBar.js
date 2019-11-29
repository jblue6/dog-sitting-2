import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

class NavBar extends Component {
  state = {
    onHomePage: true
  }

  componentDidMount() {
    const onHomePage = window.location.pathname === "/";
    this.setState({
      onHomePage
    });
  }

  render() {
    const { onHomePage } = this.state;
    const navContents = onHomePage ?
      <Nav.Link href="/admin">Admin</Nav.Link> :
      <Nav.Link href="/">Home</Nav.Link>

    return (

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Dog Sitting</Navbar.Brand>
          <Nav className="mr-sm-2">
            {navContents}
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar;
import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Footer() {
  return (
    <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
      <Navbar bg="light" variant="light">
        <Container>
          Footer
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;
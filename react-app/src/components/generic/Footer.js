import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { ContactContext } from "../../context/ContactContext";

function Footer() {
  const { contact } = useContext(ContactContext);

  return (
    <footer style={{ position: "absolute", width: "100%" }} className="fixed-bottom">
      <Navbar bg="light" variant="light">
        <Container>
          <div>Phone: <a href={"tel:" + contact.phone}>{contact.phone}</a></div>
          <div>Email: <a href={"mailto:" + contact.email}>{contact.email}</a></div>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;
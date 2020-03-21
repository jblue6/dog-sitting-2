import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalState";

function Footer() {
  const { contact } = useContext(GlobalContext);

  const style = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  }

  const phantom = {
    display: 'block',
    width: '100%',
    height: '60px'
  }

  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <Navbar bg="light" variant="light">
          <Container>
            <div>Phone: <a href={"tel:" + contact.phone}>{contact.phone}</a></div>
            <div>Email: <a href={"mailto:" + contact.email}>{contact.email}</a></div>
          </Container>
        </Navbar>
      </div>
    </div>
  )
}

export default Footer;
import React, { useContext } from "react";
import { Container } from "react-bootstrap";

import { InformationContext } from "../../context/InformationContext";

import { ContactProvider } from "../../context/ContactContext";

import Images from "./Images";
import Footer from "../generic/Footer";

function Home() {
  const { title, about } = useContext(InformationContext).information;
  const aboutArr = (about) ? about.split("\n") : [];

  return (
    <div>
      <Container>
        <h2 className="mt-3">{title}</h2>
        <div className="mt-3 mb-2">
          {aboutArr.map(item => (<div>{item}<br></br></div>))}
        </div>
        <Images />
      </Container>
      <ContactProvider>
        <Footer />
      </ContactProvider>
    </div>
  );
}

export default Home;

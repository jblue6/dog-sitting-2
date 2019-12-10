import React, { useContext } from "react";
import Parser from "html-react-parser";
import { Container } from "react-bootstrap";

import { InformationContext } from "../../context/InformationContext";

import { ContactProvider } from "../../context/ContactContext";

import Images from "./Images";
import Footer from "../generic/Footer";

function Home() {
  const { title, about } = useContext(InformationContext).information;

  return (
    <div>
      <Container>
        <h2 className="mt-3">{title}</h2>
        <div className="mt-3 mb-2">
          {Parser(about ? about.replace(/\n/g, "<br>") : "")}
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

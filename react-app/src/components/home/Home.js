import React, { useContext } from "react";
import Parser from 'html-react-parser';
import { Container } from "react-bootstrap";
import { InformationContext } from "../../context/InformationContext";

function Home() {
  const { title, about } = useContext(InformationContext).information;

  return (
    <Container>
      <h2>{title}</h2>
      <div>{Parser(about ? about.replace(/\n/g, "<br>") : "")}</div>
    </Container>
  );
}

export default Home;

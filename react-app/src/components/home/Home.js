import React, { useContext } from "react";
import { Container } from "react-bootstrap";

import { InformationContext } from "../../context/InformationContext";

import { ContactProvider } from "../../context/ContactContext";

import Footer from "../generic/Footer";
import "./Home.css"

function Home() {
  const { title, about } = useContext(InformationContext).information;
  const aboutArr = (about) ? about.split("\n") : [];

  return (
    <div className="mt-3">
      <Container>
        <section className="top-container">
          <header className="showcase">
            <h1 className="mt-3">{title}</h1>
            <div className="mt-3 mb-2">
              {aboutArr.map((item, index) => (<p key={index}>{item}</p>))}
            </div>
          </header>
          <div className="top-box top-box-a">
            <h4>Prices</h4>
            <a href="/prices" className="btn">View Here</a>
          </div>
          <div className="top-box top-box-b">
            <h4>Booking</h4>
            <a href="/booking" className="btn">Request Now</a>
          </div>
        </section>
      </Container>
      <ContactProvider>
        <Footer />
      </ContactProvider>
    </div>
  );
}

export default Home;

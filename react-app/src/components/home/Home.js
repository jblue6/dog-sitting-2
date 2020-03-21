import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalState";

import Footer from "../generic/Footer";
import "./Home.css"

function Home() {
  const { title, about } = useContext(GlobalContext).information;
  const { isAuthenticated } = useContext(GlobalContext).auth;
  const bookingLink = isAuthenticated ? "/booking" : "/login";
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
            <Link to="/prices" className="btn">View Here</Link>
          </div>
          <div className="top-box top-box-b">
            <h4>Booking</h4>
            <Link to={bookingLink} className="btn">Request Now</Link>
          </div>
        </section>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;

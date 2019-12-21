import React from 'react'

import { ContactProvider } from "../../context/ContactContext";

import Footer from '../generic/Footer'
import { Container } from 'react-bootstrap';

function Booking() {
  return (
    <div>
      <Container>
        <h2 className="mt-3">Coming Soon...</h2>
      </Container>

      <ContactProvider>
        <Footer />
      </ContactProvider>
    </div>)
}

export default Booking;

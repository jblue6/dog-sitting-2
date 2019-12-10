import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";

import { PricesContext } from "../../context/PricesContext";

import { ContactProvider } from "../../context/ContactContext";

import Footer from "../generic/Footer";

function Prices() {
  const { prices } = useContext(PricesContext);

  return (
    <div>
      <Container >
        <div className="mt-3">Prices are shown below. These are estimates, please get in contact for a quote.</div>
        <Table striped hover variant="dark" className="mt-2">
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
              <th>Basis</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(price => (
              <tr key={price._id}>
                <td>{price.description}</td>
                <td>£ {price.rate.toFixed(2).toString()}</td>
                <td>{price.basis}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <ContactProvider>
        <Footer />
      </ContactProvider>
    </div>
  );
}

export default Prices;

import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import Footer from "../generic/Footer";

function Prices() {
  const { prices } = useContext(GlobalContext);

  return (
    <div>
      <Container >
        <h2 className="mt-3">Prices</h2>
        <div className="mt-2">Prices are shown below. These are estimates, please get in contact for a quote.</div>
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
      <Footer />
    </div>
  );
}

export default Prices;

import React, { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { PricesContext } from "../../context/PricesContext";

function Prices() {
  const { prices } = useContext(PricesContext);

  return (
    <Container className="mt-5">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Basis</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => (
            <tr key={price.id}>
              <td>{price.description}</td>
              <td>£ {price.rate}.00</td>
              <td>{price.basis}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Prices;

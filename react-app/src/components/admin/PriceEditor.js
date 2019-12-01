import React, { Component } from "react";
import { Form, Table, Button, Container } from "react-bootstrap";

import { PricesContext } from "../../context/PricesContext";

class PriceEditor extends Component {
  static contextType = PricesContext;

  state = {
    prices: []
  };

  deleteRow = e => {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    const { prices } = this.state;
    prices.splice(rowID, 1);
    this.setState({ prices });
  };

  addRow = () => {
    const { prices } = this.state;
    const newPrice = { description: "", rate: 0, basis: "" };
    this.setState({ prices: [...prices, newPrice] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { prices } = this.state;
    this.context.setPrices(prices);
  };

  componentDidMount() {
    const { prices } = this.context;
    this.setState({ prices });
  }

  render() {
    const { prices } = this.state;
    const inputStyle = {
      backgroundColor: "transparent",
      color: "white",
      border: "none"
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <h4>Prices Editor</h4>
        <Table striped hover variant="dark">
          <thead>
            <tr>
              <th>Description</th>
              <th>Price</th>
              <th>Basis</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={index} id={index}>
                <td>
                  <input
                    style={inputStyle}
                    defaultValue={price.description}
                  ></input>
                </td>
                <td>
                  <input style={inputStyle} defaultValue={price.rate}></input>
                </td>
                <td>
                  <input style={inputStyle} defaultValue={price.basis}></input>
                </td>
                <td>
                  <Button variant="primary" onClick={this.deleteRow}>
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="secondary" onClick={this.addRow}>
          Add Row
        </Button>
        <Button variant="primary" type="submit" className="float-right ml-2">
          Update
        </Button>
      </Form>
    );
  }
}

export default PriceEditor;

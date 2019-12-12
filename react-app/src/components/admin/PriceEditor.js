import React, { Component } from "react";
import { Form, Table, Button } from "react-bootstrap";

import UpdateMessage from "./UpdateMessage";

import { PricesContext } from "../../context/PricesContext";

class PriceEditor extends Component {
  static contextType = PricesContext;

  state = {
    prices: []
  };

  deleteRow = e => {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    const { prices } = this.state;
    const newPrices = prices.filter((price, index) => index !== rowID);
    this.setState({ prices: newPrices });
  };

  addRow = () => {
    const { prices } = this.state;
    const newPrice = { description: "", rate: 0, basis: "" };
    this.setState({ prices: [...prices, newPrice] });
  };

  updateRow = e => {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    let { value, name } = e.target;
    if (name === "rate") value = parseFloat(value);

    const { prices } = this.state;
    prices.forEach((price, index) => {
      if (index === rowID) price[name] = value;
    });

    this.setState({ prices });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { prices } = this.state;
    const { tokenConfig } = this.props;
    this.context.setPrices(prices, tokenConfig);
  };

  componentDidMount() {
    const { prices } = this.context;
    this.setState({ prices });
  }

  render() {
    const { prices } = this.state;
    const { responseMsg } = this.context;

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
              <tr key={index} id={index} onChange={this.updateRow}>
                <td>
                  <input
                    style={inputStyle}
                    name="description"
                    defaultValue={price.description}
                  ></input>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    name="rate"
                    defaultValue={price.rate}
                  ></input>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    name="basis"
                    defaultValue={price.basis}
                  ></input>
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

        <UpdateMessage responseMsg={responseMsg} />

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

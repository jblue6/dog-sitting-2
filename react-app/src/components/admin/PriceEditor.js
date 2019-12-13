import React, { Component } from "react";
import { Form, Table, Button } from "react-bootstrap";

import UpdateMessage from "./UpdateMessage";

import { PricesContext } from "../../context/PricesContext";

class PriceEditor extends Component {
  static contextType = PricesContext;

  deleteRow = e => {
    this.context.deleteRow(e);
  };

  addRow = () => {
    this.context.addRow();
  };

  updateRow = e => {
    this.context.updateRow(e);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.context.setPrices();
  };

  render() {
    const { prices, responseMsg } = this.context;

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

import React, { Component } from "react";
import { Form, Table, Button } from "react-bootstrap";

import UpdateMessage from "./UpdateMessage";

import { GlobalContext } from "../../context/GlobalState";

class PriceEditor extends Component {
  static contextType = GlobalContext;

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
              <tr key={index} id={index} onChange={this.context.updateRow}>
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
                  <Button variant="primary" onClick={this.context.deleteRow}>
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <UpdateMessage responseMsg={responseMsg} />

        <Button variant="secondary" onClick={this.context.addRow}>
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

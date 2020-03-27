import React, { Component } from 'react'
import { Form, Table, Button } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

export default class ContentEditor extends Component {
  static contextType = GlobalContext;

  state = {
    information: null,
    prices: null,
    contact: null,
    loading: true
  }

  setTitle = e => {
    this.setState({ information: { ...this.state.information, title: e.target.value } });
  }

  setAbout = e => {
    this.setState({ information: { ...this.state.information, about: e.target.value } });
  }

  deleteRow = (e) => {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    this.setState({ prices: this.state.prices.filter((price, index) => index !== rowID) })
  };

  addRow = (e) => {
    this.setState({ prices: [...this.state.prices, { description: "", rate: 0, basis: "" }] })
  };

  updateRow = (e) => {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    let { value, name } = e.target;
    if (name === "rate") value = parseFloat(value);

    const { prices } = this.state;
    prices.forEach((price, index) => {
      if (index === rowID) price[name] = value;
    });

    this.setState({ prices });
  };

  setPhone = e => {
    this.setState({ contact: { ...this.state.contact, phone: e.target.value } });
  }

  setEmail = e => {
    this.setState({ contact: { ...this.state.contact, email: e.target.value } });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { setInformation, setPrices, setContact } = this.context;
    const { information, prices, contact } = this.state;
    setInformation(information);
    setPrices(prices);
    setContact(contact);
  }

  componentDidUpdate() {
    if (this.state.information || this.state.contact) return;
    const { information, prices, contact } = this.context;
    if (!prices.length || !information.title || !contact.email) return;
    this.setState({
      information, prices, contact, loading: false
    });
  }

  render() {
    const { information, prices, contact, loading } = this.state;
    const title = information ? information.title : "";
    const about = information ? information.about : "";
    const phone = contact ? contact.phone : "";
    const email = contact ? contact.email : "";

    const inputStyle = {
      backgroundColor: "transparent",
      color: "white",
      border: "none"
    };
    return (
      <>
        {
          loading ? <div>Loading</div> : <Form onSubmit={this.handleSubmit}>
            <h4>Content Editor</h4>

            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={title}
                defaultValue={title}
                onChange={this.setTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={about}
                defaultValue={about}
                rows="8"
                onChange={this.setAbout}
              />
            </Form.Group>

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

            <Button variant="secondary" onClick={this.addRow} className="mb-5">
              Add Row
            </Button>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                defaultValue={email}
                onChange={this.setEmail}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder={phone}
                defaultValue={phone}
                onChange={this.setPhone}
              />
            </Form.Group>


            <Button variant="primary" type="submit" className="float-right ml-2">
              Update Content
             </Button>
          </Form>
        }
      </>
    )
  }
}

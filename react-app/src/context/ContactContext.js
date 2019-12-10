import React, { createContext, Component } from "react";
import axios from "axios";

export const ContactContext = createContext();

export class ContactProvider extends Component {
  state = {
    contact: {}
  };

  componentDidMount = () => {
    axios
      .get("/api/contact")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        this.setState({ contact: response.data });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  setContact = () => {

  }

  render() {
    const { contact } = this.state;
    const { setContact } = this;
    return (
      <ContactContext.Provider value={{ contact, setContact }}>
        {this.props.children}
      </ContactContext.Provider>
    );
  }
}

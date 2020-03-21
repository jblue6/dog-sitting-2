import React, { createContext, Component } from "react";
import axios from "axios";

export const ContactContext = createContext();

export class ContactProvider extends Component {
  state = {
    contact: {},
    responseMsg: ""
  };

  setContact = () => {
    const { contact } = this.state;
    const { _id } = contact;

    const token = localStorage.getItem("token");
    if (!token) return this.setState({ responseMsg: "User not authenticated" });

    const tokenConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };

    axios
      .put(`/api/contact/${_id}`, contact, tokenConfig)
      .then(response => {
        if (response.status !== 200) {
          this.setState({ responseMsg: "Update Failed" });
          return;
        }

        const { email, phone } = contact;
        const newContact = { _id, email, phone }
        this.setState({ contact: newContact, responseMsg: "Succesfully Updated" });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

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

  render() {
    const { contact, responseMsg } = this.state;
    const { setContact, setPhone, setEmail } = this;
    return (
      <ContactContext.Provider value={{ contact, setContact, setPhone, setEmail, responseMsg }}>
        {this.props.children}
      </ContactContext.Provider>
    );
  }
}

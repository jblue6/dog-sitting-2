import React, { createContext, Component } from "react";
import axios from "axios";

// create context
export const InformationContext = createContext();
InformationContext.displayName = "InformationContext";

// create the provider
export class InformationProvider extends Component {
  state = {
    information: {},
    responseMsg: ""
  };

  componentDidMount() {
    axios
      .get("/api/information")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        this.setState({ information: response.data });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  setInformation = information => {
    const { _id } = this.state.information;

    const token = localStorage.getItem("token");
    if (!token) return this.setState({ responseMsg: "User not authenticated" });

    const tokenConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };

    axios
      .put(`/api/information/${_id}`, information, tokenConfig)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ responseMsg: "Update Failed" });
        }

        const { title, about } = information;
        const newInformation = { _id, title, about }
        this.setState({ information: newInformation, responseMsg: "Succesfully Updated" });
      })
      .catch(function (err) {
        console.log("", err);
      });
  };

  render() {
    const { information, responseMsg } = this.state;
    const { setInformation } = this;
    return (
      <InformationContext.Provider value={{ information, setInformation, responseMsg }}>
        {this.props.children}
      </InformationContext.Provider >
    );
  }
}

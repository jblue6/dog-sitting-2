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

  setTitle = title => {
    const currentInfo = this.state.information;
    this.setState({ information: { ...currentInfo, title } });
  }

  setAbout = about => {
    const currentInfo = this.state.information;
    this.setState({ information: { ...currentInfo, about } });
  }

  setInformation = () => {
    const { information } = this.state;
    const { _id } = information;

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

  render() {
    const { information, responseMsg } = this.state;
    const { setInformation, setTitle, setAbout } = this;
    return (
      <InformationContext.Provider value={{ information, setInformation, setTitle, setAbout, responseMsg }}>
        {this.props.children}
      </InformationContext.Provider >
    );
  }
}

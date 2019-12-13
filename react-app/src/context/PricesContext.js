import React, { createContext, Component } from "react";
import axios from "axios";

export const PricesContext = createContext();

export class PricesProvider extends Component {
  state = {
    prices: [],
    responseMsg: ""
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

  setPrices = () => {
    const prices = this.state.prices;

    const token = localStorage.getItem("token");
    if (!token) return this.setState({ responseMsg: "User not authenticated" });

    const tokenConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };

    axios
      .post(`/api/prices/`, { prices }, tokenConfig)
      .then(response => {
        if (response.status !== 200) {
          this.setState({ responseMsg: "Update Failed" });
          return;
        }

        this.setState({ prices, responseMsg: "Succesfully Updated" });
      })
      .catch(function (err) {
        console.log("", err);
      });
  };

  componentDidMount() {
    axios
      .get("/api/Prices")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        this.setState({ prices: response.data });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  render() {
    const { prices, responseMsg } = this.state;
    const { setPrices, addRow, updateRow, deleteRow } = this;
    return (
      <PricesContext.Provider value={{ prices, setPrices, addRow, updateRow, deleteRow, responseMsg }}>
        {this.props.children}
      </PricesContext.Provider>
    );
  }
}

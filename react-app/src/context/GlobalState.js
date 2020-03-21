import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const initialState = {
  auth: {
    isAuthenticated: false,
    user: {},
    errorMsg: ""
  },
  information: {},
  prices: [],
  contact: {},
  responseMsg: ""
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function login(credentials) {
    const body = JSON.stringify(credentials);

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post("/api/auth", body, config)
      // on success
      .then(res => {
        const { token, user } = res.data;

        // set token to local storage
        localStorage.setItem("token", token);

        dispatch({
          type: "LOGIN",
          payload: user
        });
      })
      // on failure
      .catch(err => {
        const errorMsg = err.response.data.msg;
        logout(errorMsg);
      });
  };

  function logout(errorMsg = "") {
    dispatch({
      type: "LOGOUT",
      payload: errorMsg
    });
    localStorage.removeItem("token");
  };

  function setInformation() {
    const { information } = state;
    const { _id } = information;

    const token = localStorage.getItem("token");
    if (!token) return;

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
          return;
        }

        const { title, about } = information;
        const newInformation = { _id, title, about }
        dispatch({
          type: "SET_INFORMATION",
          payload: newInformation
        });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  function setContact() {
    const { contact } = state;
    const { _id } = contact;

    const token = localStorage.getItem("token");
    if (!token) return;

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
          return;
        }

        const { email, phone } = contact;
        const newContact = { _id, email, phone }
        dispatch({
          type: "SET_CONTACT",
          payload: newContact
        });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  function setPrices() {
    const prices = state.prices;

    const token = localStorage.getItem("token");
    if (!token) return;

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
          return;
        }

        dispatch({
          type: "SET_PRICES",
          payload: prices
        });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  function deleteRow(e) {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    dispatch({ type: 'DELETE_PRICE_ROW', payload: rowID });
  };

  function addRow() {
    dispatch({ type: 'ADD_PRICE_ROW', payload: null });
  };

  function updateRow(e) {
    const rowID = parseInt(e.target.parentElement.parentElement.id);
    let { value, name } = e.target;
    if (name === "rate") value = parseFloat(value);

    const { prices } = state;
    prices.forEach((price, index) => {
      if (index === rowID) price[name] = value;
    });

    dispatch({
      type: "SET_PRICES",
      payload: prices
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const tokenConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };

    // check if user is authenticated
    axios
      .get("/api/auth/user", tokenConfig)
      .then(res => {
        // if the token is valid
        const { user } = res.data;
        dispatch({
          type: "LOGIN",
          payload: user
        });
      })
      .catch(err => {
        // will be triggered if the token is no longer valid
        logout("Session Expired. Please Log in again");
      });

    axios
      .get("/api/information")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        dispatch({
          type: "SET_INFORMATION",
          payload: response.data
        });
      })
      .catch(function (err) {
        console.log("", err);
      });

    axios
      .get("/api/contact")
      .then(response => {
        if (response.status !== 200) {
          return;
        }
        dispatch({
          type: "SET_CONTACT",
          payload: response.data
        });
      })
      .catch(function (err) {
        console.log("", err);
      });

    axios
      .get("/api/prices")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        dispatch({
          type: "SET_PRICES",
          payload: response.data
        });
      })
      .catch(function (err) {
        console.log("", err);
      });
  });

  return (
    <GlobalContext.Provider value={{
      auth: state.auth,
      information: state.information,
      contact: state.contact,
      prices: state.prices,
      login,
      logout,
      setInformation,
      setContact,
      setPrices,
      addRow,
      deleteRow,
      updateRow
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

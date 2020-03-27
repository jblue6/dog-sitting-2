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
  account: {},
  bookings: [],
  allBookings: [],
  responseMsg: ""
};

const requestConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function login(credentials) {
    const body = JSON.stringify(credentials);
    try {
      const response = await axios.post("/api/auth", body, requestConfig);
      // on success
      const { token, user } = response.data;

      // set token to local storage
      localStorage.setItem("token", token);

      dispatch({
        type: "LOGIN",
        payload: user
      });
    } catch (err) {
      const errorMsg = err.response.data.msg;
      logout(errorMsg);
    }
  }

  async function register(credentials) {
    const body = JSON.stringify(credentials);
    try {
      const response = await axios.post("/api/users", body, requestConfig);
      // on success
      const { token, user } = response.data;

      // set token to local storage
      localStorage.setItem("token", token);

      dispatch({
        type: "REGISTER",
        payload: user
      });
    } catch (err) {
      const errorMsg = err.response.data.msg;
      logout(errorMsg);
    }
  }

  async function getUser() {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) {
      if (state.auth.isAuthenticated) logout();
      return;
    }
    if (state.auth.user.isAuthenticated) {
      return;
    }

    try {
      const response = await axios.get("/api/auth/user", tokenConfig);
      const { user } = response.data;
      dispatch({
        type: "LOGIN",
        payload: user
      });
    } catch (err) {
      // will be triggered if the token is no longer valid
      logout("Session Expired. Please Log in again");
    }
  }

  function logout(errorMsg = "") {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
      payload: errorMsg
    });
  }

  async function setInformation(information) {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;

    try {
      const { _id, title, about } = information;
      const response = await axios.put(
        `/api/information/${information._id}`,
        information,
        tokenConfig
      );

      if (response.status !== 200) {
        return;
      }

      dispatch({
        type: "SET_INFORMATION",
        payload: { _id, title, about }
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function getInformation() {
    if (state.information.title) return;
    try {
      const response = await axios.get("/api/information");
      if (response.status !== 200) {
        return;
      }
      dispatch({
        type: "SET_INFORMATION",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function setContact(contact) {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;

    try {
      const { _id, email, phone } = contact;
      const response = await axios.put(
        `/api/contact/${_id}`,
        contact,
        tokenConfig
      );

      if (response.status !== 200) {
        return;
      }

      dispatch({
        type: "SET_CONTACT",
        payload: { _id, email, phone }
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function getContact() {
    if (state.contact.email) return;
    try {
      const response = await axios.get("/api/contact");
      if (response.status !== 200) {
        return;
      }
      dispatch({
        type: "SET_CONTACT",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function setPrices(prices) {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;

    try {
      const response = await axios.post(
        `/api/prices/`,
        { prices },
        tokenConfig
      );

      if (response.status !== 200) {
        return;
      }

      dispatch({
        type: "SET_PRICES",
        payload: prices
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function getPrices() {
    if (state.prices.length) return;
    try {
      const response = await axios.get("/api/prices");
      if (response.status !== 200) {
        return;
      }
      dispatch({
        type: "SET_PRICES",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function requestBooking(booking) {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;

    try {
      const response = await axios.post(`/api/booking/`, booking, tokenConfig);
      if (response.status !== 200) {
        return;
      }
      dispatch({
        type: "UPDATE_BOOKINGS",
        payload: null
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function approveRejectBooking(id, action) {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;
    if (!state.auth.user.isAdmin) return;
    try {
      const response = await axios.put(
        `/api/booking/approve/${id}`,
        { action },
        tokenConfig
      );
      dispatch({
        type: "SET_ALL_BOOKINGS",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function getBookings() {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;
    if (state.bookings.length) return;
    try {
      const response = await axios.get("/api/booking", tokenConfig);
      dispatch({
        type: "SET_BOOKINGS",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function getAllBookings() {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;
    if (state.allBookings.length || !state.auth.user.isAdmin) return;
    try {
      const response = await axios.get("/api/booking/all", tokenConfig);
      dispatch({
        type: "SET_ALL_BOOKINGS",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  async function getAccount() {
    const tokenConfig = getTokenConfig();
    if (!tokenConfig) return;
    if (state.account.email) return;
    try {
      const response = await axios.get("/api/account", tokenConfig);
      dispatch({
        type: "SET_ACCOUNT",
        payload: response.data
      });
    } catch (err) {
      console.log("", err);
    }
  }

  function getTokenConfig() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };
  }

  useEffect(() => {
    getUser();
    getInformation();
    getContact();
    getPrices();
    getBookings();
    getAllBookings();
    getAccount();
  });

  return (
    <GlobalContext.Provider
      value={{
        auth: state.auth,
        information: state.information,
        contact: state.contact,
        prices: state.prices,
        bookings: state.bookings,
        allBookings: state.allBookings,
        account: state.account,
        login,
        register,
        logout,
        setInformation,
        setContact,
        setPrices,
        requestBooking,
        approveRejectBooking
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

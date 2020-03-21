import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/generic/NavBar";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Prices from "./components/prices/Prices";
import Booking from "./components/booking/Booking";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./components/account/Account";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <NavBar />
        <Router>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/prices">
            <Prices />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/booking">
            <Booking />
          </Route>

          <Route exact path="/account">
            <Account />
          </Route>

          <Route exact path="/admin">
            <Admin />
          </Route>
        </Router >
      </GlobalProvider>
    </div >
  );
}

export default App;

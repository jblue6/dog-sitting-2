import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/generic/NavBar";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Prices from "./components/prices/Prices";
import Booking from "./components/booking/Booking";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./components/account/Account";

import { InformationProvider } from "./context/InformationContext";
import { PricesProvider } from "./context/PricesContext";
import { AuthProvider } from "./context/AuthContext";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
      </AuthProvider>
      <GlobalProvider>
        <div>Hello</div>
      </GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <InformationProvider>
              <Home />
            </InformationProvider>
          </Route>

          <Route exact path="/prices">
            <PricesProvider>
              <Prices />
            </PricesProvider>
          </Route>

          <Route exact path="/booking">
            <AuthProvider>
              <Booking />
            </AuthProvider>
          </Route>

          <Route exact path="/login">
            <AuthProvider>
              <Login />
            </AuthProvider>
          </Route>

          <Route exact path="/register">
            <AuthProvider>
              <Register />
            </AuthProvider>
          </Route>

          <Route exact path="/booking">
            <AuthProvider>
              <Booking />
            </AuthProvider>
          </Route>

          <Route exact path="/account">
            <AuthProvider>
              <Account />
            </AuthProvider>
          </Route>

          <Route exact path="/admin">
            <AuthProvider>
              <Admin />
            </AuthProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

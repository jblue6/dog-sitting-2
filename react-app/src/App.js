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
          <Route exact path="/" component={Home} />

          <Route exact path="/prices" component={Prices} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/register" component={Register} />

          <Route exact path="/booking" component={Booking} />

          <Route exact path="/account" component={Account} />

          <Route exact path="/admin" component={Admin} />
        </Router >
      </GlobalProvider>
    </div >
  );
}

export default App;

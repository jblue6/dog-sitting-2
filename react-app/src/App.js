import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/generic/NavBar";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Prices from "./components/prices/Prices";

import { InformationProvider } from "./context/InformationContext";
import { PricesProvider } from "./context/PricesContext";
import { AuthProvider } from "./context/AuthContext";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/admin">
            <AuthProvider>
              <InformationProvider>
                <PricesProvider>
                  <ContactProvider>
                    <Admin />
                  </ContactProvider>
                </PricesProvider>
              </InformationProvider>
            </AuthProvider>
          </Route>

          <Route path="/prices">
            <PricesProvider>
              <Prices />
            </PricesProvider>
          </Route>

          <Route path="/">
            <InformationProvider>
              <Home />
            </InformationProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import AppBar from "./components/Appbar/Appbar";
import Home from "./pages/Home/Home";
import NameForm from "./pages/NameForm/NameForm";

import "./App.css";
import "./App.scss";

const App = () => {
  return (
    <>
      <Router>
        <AppBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={NameForm} />
        </Switch>
      </Router>
    </>
  );
};

export default hot(module)(App);

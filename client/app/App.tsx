import React from "react";
import { hot } from "react-hot-loader";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
// import { CssBaseline } from "@material-ui/core";
import MainRouter from "./MainRouter";
import theme from "./theme";

import "./App.css";
import "./App.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline/> */}
          <MainRouter/>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default hot(module)(App);

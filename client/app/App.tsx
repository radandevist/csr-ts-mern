import React from "react";
import { hot } from "react-hot-loader";
// import { ThemeProvider } from "@material-ui/core/styles";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
// import theme from "./theme";

import "./App.css";
import "./App.scss";

const App = () => {
  return (
    <>
      <ChakraProvider>
        {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
          <MainRouter/>
        </BrowserRouter>
        {/* </ThemeProvider> */}
      </ChakraProvider>
    </>
  );
};

export default hot(module)(App);

import React from "react";
import { hot } from "react-hot-loader";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

import "tailwindcss/tailwind.css";
import "./App.css";
import "./App.scss";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <MainRouter/>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default hot(module)(App);

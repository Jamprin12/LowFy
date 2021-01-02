import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import StoreProvider from "./store";

import "./styles/main.css";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("app")
);

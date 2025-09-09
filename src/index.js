import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'select2/dist/js/select2.min.js';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import setupAxios from "./setupAxios";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";
import { UserProvider } from "./helper/UserContext";

setupAxios(); // 👈 attach interceptor globally

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);

reportWebVitals();

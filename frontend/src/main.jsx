import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./services/UserContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <PayPalScriptProvider deferLoading={true}>
        <Router>
          <App />
        </Router>
      </PayPalScriptProvider>
    </UserProvider>
  </React.StrictMode>
);

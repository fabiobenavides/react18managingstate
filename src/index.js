import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from './ErrorBoundary'
import { BrowserRouter } from "react-router-dom";
import { CartProdiver } from "./CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CartProdiver>
          <App />
        </CartProdiver>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

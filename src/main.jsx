import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormKYC from "./pages/FormKYC";
import Test from "./pages/Test";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/formulario-kyc" element={<FormKYC />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

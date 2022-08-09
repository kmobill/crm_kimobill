import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form1 from "./components/Form1";
import FormKYC from "./pages/FormKYC";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Form1 />} />
        <Route path="/formulario-kyc" element={<FormKYC />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

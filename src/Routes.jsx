import React from "react";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormKYC from "./pages/FormKYC";
import Test from "./pages/Test";
import LoginPage from "./pages/LoginPage";

import { history } from "./helpers/history";
const RoutesComponent = () => {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/formulario-kyc" element={<FormKYC />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;

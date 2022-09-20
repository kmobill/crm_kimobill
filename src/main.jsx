import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormKYC from "./pages/FormKYC";
import Test from "./pages/Test";
import LoginPage from "./pages/LoginPage";
import App from "./App";
// import RoutesComponent from "./Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RoutesComponent /> */}
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/formulario-kyc" element={<FormKYC />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

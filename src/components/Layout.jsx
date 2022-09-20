import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ValidateJWT from "./ValidateJWT";
import '../App.css';
import bgImage from "../assets/images/bgLayout.png";
const Layout = ({ children }) => {
  return (
    <div id="layout" className=" min-h-screen flex flex-col justify-between">
      <Navbar />
      <ValidateJWT>{children}</ValidateJWT>
      <Footer />
    </div>
  );
};

export default Layout;

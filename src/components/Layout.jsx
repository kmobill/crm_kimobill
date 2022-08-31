import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ValidateJWT from "./ValidateJWT";
const Layout = ({ children }) => {
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col justify-between">
      <Navbar />
      <ValidateJWT>{children}</ValidateJWT>
      <Footer />
    </div>
  );
};

export default Layout;

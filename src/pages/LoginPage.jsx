import React from "react";
import Login from "../components/Login/Login";

const LoginPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 min-h-screen flex justify-center items-center">
      <section className="w-[min(420px,90%)]">
        <Login />
      </section>
    </div>
  );
};

export default LoginPage;

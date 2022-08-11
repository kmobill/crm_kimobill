import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();
  const handleClick = (target) => {
    navigate(`/${target}`);
  };
  return (
    <div className="bg-black text-slate-400 fw-bold flex justify-center py-2">
      <ul className="flex flex-row justify-around text-center w-3/5 gap-1">
        <li
          onClick={() => handleClick("")}
          className="cursor-pointer bg-slate-800 px-5 rounded-md w-1/3"
        >
          Home
        </li>
        <li
          onClick={() => handleClick("")}
          className="cursor-pointer bg-slate-800 px-5 rounded-md w-1/3"
        >
          About
        </li>
        <li
          onClick={() => handleClick("formulario-kyc")}
          className="cursor-pointer bg-slate-800 px-5 rounded-md w-1/3"
        >
          Formulario KYC
        </li>
        <li
          onClick={() => handleClick("test")}
          className="cursor-pointer bg-slate-800 px-5 rounded-md w-1/3"
        >
          test
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

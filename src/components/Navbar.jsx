import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [userinfo, setuserinfo] = useState({});
  let navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    handleClick("");
  };

  const handleClick = (target) => {
    navigate(`/${target}`);
  };
  useEffect(() => {
    const token_user = sessionStorage.getItem("token");
    fetch("http://localhost:4000/api/userinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token_user,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("error");
        }
      })
      .then((data) => {
        console.log(data);
        setuserinfo(data?.user);
      });
  }, []);

  return (
    <div className="bg-[#05051b] text-slate-400 fw-bold flex justify-center py-2">
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
        <li
          onClick={() => handleLogOut()}
          className="cursor-pointer bg-slate-800 px-5 rounded-md w-1/3"
        >
          logOut
        </li>
        <li className="cursor-pointer bg-slate-900 px-5 rounded-full w-1/3">
          {userinfo && (
            <>
              <h1>{userinfo.id}</h1>
              <h1>{userinfo.email}</h1>
              <h1>{userinfo.username}</h1>
              <h1>{userinfo.rol}</h1>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

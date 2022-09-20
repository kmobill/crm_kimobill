import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iconKMB from "../assets/icons/kmbColor.png";
import iconKMB2 from "../assets/icons/kmbWhite.png";
import userICON from "../assets/images/genericUser.png";
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
    fetch("api/userinfo", {
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
    <div className="bg-[#0066cb] text-slate-400 fw-bold w-full py-2">
      <ul className="flex flex-row justify-between items-center text-center w-full gap-5 text-base">
        <li
          onClick={() => handleClick("formulario-kyc")}
          className="cursor-pointer px-5 rounded-md w-[min(150px,30%)] flex justify-center items-center flex-col"
        >
          <img className="w-20" src={iconKMB2} alt="kmb icon" />
        </li>
        {/* <li
          onClick={() => handleClick("")}
          className="cursor-pointer px-5 rounded-md w-1/3"
        >
          About
        </li>
        <li
          onClick={() => handleClick("formulario-kyc")}
          className="cursor-pointer px-5 rounded-md w-1/3"
        >
          Formulario KYC
        </li>
        <li
          onClick={() => handleClick("test")}
          className="cursor-pointer px-5 rounded-md w-1/3"
        >
          test
        </li> */}

        <li className="cursor-pointer  px-5 rounded-md  flex flex-row justify-center items-center gap-4">
          <img className="w-8" src={userICON} alt="user icon" />
          {userinfo && (
            <>
              {/* <h1>{userinfo.id}</h1> */}
              {/* <h1>{userinfo?.email}</h1> */}
              <h1>{userinfo?.username}</h1>
              {/* <h1>{userinfo.rol}</h1> */}
            </>
          )}
          <span onClick={() => handleLogOut()} className="cursor-pointer text-4xl">&#8628;</span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ValidateJWT = ({ children }) => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);
  function hasJWT() {
    console.log(sessionStorage.getItem("token") ? true : false);
    return sessionStorage.getItem("token") ? true : false;
  }
  useEffect(() => {
    console.log("entro a jwt");

    hasJWT() ? setflag(true) : navigate("/login");
  }, []);

  return <>{flag ? children: <>{/*TODO: FAIL PAGE*/}</>}</>;
};

export default ValidateJWT;

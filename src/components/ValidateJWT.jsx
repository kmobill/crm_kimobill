import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ValidateJWT = ({ children }) => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);
  function hasJWT() {
    console.log(localStorage.getItem("token") ? true : false);
    return localStorage.getItem("token") ? true : false;
  }
  useEffect(() => {
    hasJWT() ? setflag(true) : navigate("/login");
  }, []);

  return <>{flag ? { children } : <>{/*TODO: FAIL PAGE*/}</>}</>;
};

export default ValidateJWT;

import React, { useEffect, useRef, useState } from "react";
import iconKMB from "../../assets/icons/kmbColor.png";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import simpleAlert from "../../utils/Alerts";
const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const formLogin = useRef(null);
  const [labelsMoved, setlabelsMoved] = useState(false);

  const moveLabels = () => {
    const labels = document.getElementsByClassName("labelLog");
    console.log(typeof labels);
    console.log(labels);
    for (const label of labels) {
      if (labelsMoved) {
        label.classList.add("translate-y-6");
        label.classList.remove("-translate-y-6");
      } else {
        label.classList.remove("translate-y-6");
        label.classList.add("-translate-y-6");
      }
    }
    setlabelsMoved((old) => !old);
  };

  const getNotes = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/notes")
      .then((res) => {
        if (res.status === 200) {
          console.log("Ok!");
          return res.json();
        } else {
          console.log("error");
        }
      })
      .then((notes) => {
        console.log("data obtenida: ", notes);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    formLogin.current.reportValidity();
    if (formLogin.current.checkValidity()) {
      simpleAlert(
        `username: ${userName} password: ${password}`,
        "success",
        "¡Exito!"
      );
    }
  };

  useEffect(
    () => console.log(`user: ${userName} password: ${password}`),
    [userName, password]
  );

  return (
    <div className="fw-regular">
      <div className="w-full flex justify-center">
        <section className="w-[min(900px,90%)] flex flex-col justify-center items-center mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)] text-slate-300">
          <img className="w-40" src={iconKMB} alt="kmbIcon" />
          <form
            ref={formLogin}
            className="text-left w-full p-[1rem_0] flex flex-col justify-center items-center gap-2"
          >
            <div className="w-[min(500px,90%)] flex flex-col justify-between items-center">
              <label
                className="labelLog duration-150 ease-in-out px-2 w-full relative -bottom-6"
                htmlFor="name_login"
              >
                Nombre
              </label>
              <input
              
                className=" outline-none w-full max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                // placeholder="Nombre..."
                id="name_login"
                type="text"
                onChange={(e) => setuserName(e.target.value)}
                value={userName}
                required
              />
            </div>
            <div className="w-[min(500px,90%)] flex flex-col justify-between items-center">
              <label
                className="labelLog duration-150 ease-in-out px-2 w-full relative -bottom-6"
                htmlFor="password_login"
              >
                Contraseña
              </label>
              <input
                className=" outline-none w-full max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                id="password_login"
                // placeholder="Contraseña..."
                type="password"
                required
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            {/* <button onClick={(e) => getNotes(e)}>get notes</button> */}
          </form>
          <button
            className="bg-slate-500 text-slate-300 rounded-md text-xl hover:scale-105 ease-in-out duration-150"
            onClick={(e) => handleLogin(e)}
          >
            Ingresar
          </button>
        </section>
      </div>
      <button onClick={() => moveLabels()}>move labels</button>
    </div>
  );
};

export default Login;

import React, { useEffect, useRef, useState } from "react";
import iconKMB from "../../assets/icons/kmbColor.png";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import simpleAlert from "../../utils/Alerts";
import { textWarningLogin } from "../../utils/constants";
const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const formLogin = useRef(null);
  const inputPass = useRef(null);
  const inputEmail = useRef(null);

  const moveLabels = () => {
    const aux = formLogin.current.firstChild;
    for (const aux1 of aux.children) {
      const label = aux1.firstChild;
      const input = aux1.childNodes[1];
      // console.log(input.type);

      // console.log("777", input.nodeName);
      input.addEventListener("focusin", () => {
        label.classList.add("text-slate-100", "-translate-y-10");
        label.classList.remove("translate-y-0");
      });
      input.addEventListener("focusout", () => {
        if (input.value === "") {
          label.classList.remove(
            "text-slate-100",
            "-translate-y-10"
          );
          label.classList.add("translate-y-0");
        }
      });
    }
  };
  useEffect(() => {
    moveLabels();
  }, []);

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
  const handleValidity = (input) => {
    // console.log(input);
    console.log(textWarningLogin);
    const validityState = input.validity;
    /* 
    if (validityState.valueMissing) {
      input.setCustomValidity(textWarningLogin.general.empty);
    } else if (validityState.patternMismatch) {
      if (input.type === "text") {
        input.setCustomValidity(textWarningLogin.password.pattern);
      } else if (input.type === "email") {
        input.setCustomValidity(textWarningLogin.email.pattern);
      }
    } */
    if (!input.checkValidity()) {
      if (validityState.patternMismatch) {
        if (input.type === "password") {
          input.setCustomValidity(textWarningLogin.password.pattern);
          input.reportValidity();
        } else {
          input.reportValidity();
        }
      } else {
        input.reportValidity();
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formLogin.current.checkValidity()) {
      simpleAlert(
        `username: ${userName} password: ${password}`,
        "success",
        "¡Exito!"
      );
    } else {
      formLogin.current.reportValidity();
    }
  };

  /*  useEffect(
    () => console.log(`user: ${userName} password: ${password}`),
    [userName, password]
  ); */

  return (
    <div className="fw-regular">
      <div className="w-full flex justify-center">
        <section className="w-[min(600px,90%)] min-h-[] flex flex-col justify-center items-center mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)] text-slate-300">
          <img className="w-40" src={iconKMB} alt="kmbIcon" />
          <form
            ref={formLogin}
            className="text-xl text-left w-full p-[1rem_0]  flex flex-col justify-center items-center gap-7"
          >
            <section className="w-full  flex flex-col justify-center items-center gap-4">
              <div className="w-[min(400px,90%)] flex flex-col justify-between items-center">
                <label
                  className="duration-150 ease-in-out px-1 w-full relative -bottom-6"
                  htmlFor="name_login"
                >
                  Email
                </label>
                <input
                  ref={inputEmail}
                  onKeyUp={() => handleValidity(inputEmail.current)}
                  className="outline-none w-full max-h-6 bg-transparent px-1 border-b-2 border-b-gray-400 text-slate-100"
                  id="name_login"
                  type="email"
                  onChange={(e) => setuserName(e.target.value)}
                  value={userName}
                  required
                />
              </div>
              <div className=" w-[min(400px,90%)] flex flex-col justify-between items-center">
                <label
                  className="duration-150 ease-in-out px-2 w-full relative -bottom-6"
                  htmlFor="password_login"
                >
                  Contraseña
                </label>
                <input
                  ref={inputPass}
                  onKeyUp={() => handleValidity(inputPass.current)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  className="outline-none w-full max-h-6 bg-transparent px-1 border-b-2 border-b-gray-400 text-slate-100"
                  id="password_login"
                  type="password"
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </div>
            </section>
            <section className="w-full flex flex-col justify-center items-center gap-2">
              <button
                className=" w-[min(200px,75%)] bg-slate-500 text-slate-300 rounded-md text-xl hover:scale-105 ease-in-out duration-300"
                onClick={(e) => handleLogin(e)}
              >
                Ingresar
              </button>
              <p className="text-lg text-center ">
                ¿No tiene Cuenta?{" "}
                <a
                  className="fw-bold hover:text-slate-700 duration-300"
                  href=""
                >
                  ¡Registrese!
                </a>
              </p>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useRef, useState } from "react";
import iconKMB from "../../assets/icons/kmbColor.png";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
import simpleAlert from "../../utils/Alerts";
import { textWarningLogin } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
      input.addEventListener("focusin", () => {
        label.classList.add("text-slate-100", "-translate-y-10");
        label.classList.remove("translate-y-0");
      });
      input.addEventListener("focusout", () => {
        if (input.value === "") {
          label.classList.remove("text-slate-100", "-translate-y-10");
          label.classList.add("translate-y-0");
        }
      });
    }
  };
  useEffect(() => {
    moveLabels();
  }, []);
  const handleValidity = (input) => {
    const validityState = input.validity;
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

  const getValidation = (username = "admin", password = "123") => {
    fetch("/api/userAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(" el status es: ", res.status);
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.token) {
          simpleAlert(`Hola ${userName}`, "success", "¡logeado con exito!");
          sessionStorage.setItem("token", data.token);
          navigate("/formulario-kyc");
        } else {
          simpleAlert(
            `Ah ocurrido un error...`,
            "error",
            "Usuario o contraseña incorrecta"
          );
          sessionStorage.removeItem("token");
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formLogin.current.checkValidity()) {
      getValidation(userName, password);
      // navigate("/formulario-kyc");
    } else {
      formLogin.current.reportValidity();
    }
  };

  useEffect(
    () => console.log(`user: ${userName} password: ${password}`),
    [userName, password]
  );

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
                  type="text"
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
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
                  href="/login"
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

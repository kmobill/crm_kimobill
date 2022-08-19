import React, { useRef } from "react";
import iconKMB from "../../assets/icons/kmbColor.png";
import iconKMB2 from "../../assets/icons/kmbWhite.png";
const Login = () => {
  const formLogin = useRef(null);
  return (
    <div className="fw-regular">
      <div className="w-full flex justify-center">
        <section className="w-[min(900px,90%)] flex flex-col justify-center items-center mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)] text-slate-300">
          <img className="w-40" src={iconKMB} alt="kmbIcon" />
          <form
            ref={formLogin}
            className="w-full p-[1rem_0] flex flex-col justify-center items-center gap-2"
          >
            <div className="w-[min(700px,90%)] flex justify-center items-center">
              <label className="px-2" htmlFor="name_login">Nombre: </label>
              <input className="w-3/5" placeholder="nombre..." id="name_login" type="text" />
            </div>
            <div className="">
              <label htmlFor="password_login">Contraseña: </label>
              <input
                className=" outline-none w-1/2 max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                id="password_login"
                type="password"
              />
            </div>
            <button>Ingresar</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;

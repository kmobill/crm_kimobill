import React, { useState } from "react";
import { useEffect } from "react";
import deleteIcon from "../assets/icons/close.png";
import addIcon from "../assets/icons/plus.png";
const Form1 = () => {
  const provinciasSierra = [
    "Pichincha",
    "Carchi",
    "Tungurahua",
    "Chimborazo",
    "Cañar",
    "Azuay",
    "Loja",
    "Imbabura",
    "Bolívar",
    "Cotopaxi",
  ];
  const provinciasCosta = [
    "Esmeraldas",
    "Santo Domingo de los Tsáchilas",
    "Manabí",
    "Los Ríos",
    "Guayas",
    "Santa Elena",
    " El Oro",
  ];
  const [agenciasSierra, setAgenciasSierra] = useState([]);
  const [agenciasCosta, setAgenciasCosta] = useState([]);
  const handleChange = (e, i, setfunction, array) => {
    console.log("handleChange");
    const temp = [...array];
    temp[i].provincia = e.target.value;
    setfunction(temp);
  };
  const handleChangeCant = (e, i, setfunction, array) => {
    console.log("handleChangeCant");
    const temp = [...array];
    temp[i].cant = e.target.value;
    setfunction(temp);
  };
  const handleDelete = (i, setfunction, array) => {
    console.log("handleDelete");
    const temp = [...array];
    temp.splice(i, 1);
    setfunction(temp);
  };
  const handleAdd = (agencia, setAgencia, listProvincias) => {
    console.log("handleAdd");
    for (let index = 0; index < listProvincias.length; index++) {
      const provTemp = listProvincias[index];
      if (agencia.find((item) => item.provincia == provTemp) === undefined) {
        setAgencia(agencia.concat({ provincia: provTemp, cant: 0 })); //la primera provincia disponible se devuelve
        break;
      }
    }
  };
  useEffect(() => console.log(agenciasSierra), [agenciasSierra]);
  useEffect(() => console.log(agenciasCosta), [agenciasCosta]);

  return (
    <div className="">
      <section className="flex flex-col gap-2 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center py-1">
          CUESTIONARIO DE DEBIDA DILIGENCIA PARA ENTIDADES FINANCIERAS
        </h1>
        <form className="flex flex-col gap-1">
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="razon_social">
              Razón Social:
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="razon_social"
              id="razon_social"
              required
            />
          </div>
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="RUC">
              RUC:
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="RUC"
              id="RUC"
              required
            />
          </div>
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="grupo_económico">
              Grupo económico:
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="grupo_económico"
              id="grupo_económico"
              required
            />
          </div>
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="ciudad_constitución">
              Ciudad de Constituciónl:
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="ciudad_constitución"
              id="ciudad_constitución"
              required
            />
          </div>
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="dirección_matriz">
              Dirección de la Matriz:
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="dirección_matriz"
              id="dirección_matriz"
              required
            />
          </div>
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="años_actividad">
              Años en la actividad:
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="años_actividad"
              id="años_actividad"
              required
            />
          </div>
          <div className="p-1 gap-1 flex flex-row bg-slate-500 rounded-md items-center">
            <label className="w-1/2" htmlFor="número_agencias_locales">
              Número de agencias locales :
            </label>
            <input
              className=" outline-none w-1/2 bg-transparent max-h-6 border-b-2 border-cyan-200"
              type="text"
              name="número_agencias_locales"
              id="número_agencias_locales"
              required
            />
          </div>
          <div className="flex flex-col justify-center text-slate-300">
            <h1 className="w-full text-center ">
              Número de agencias por ubicación
            </h1>
            <ul className="grid grid-cols-2 text-center gap-2 text-slate-300">
              <li>
                <h1
                  onClick={() =>
                    handleAdd(
                      agenciasSierra,
                      setAgenciasSierra,
                      provinciasSierra
                    )
                  }
                  className="bg-slate-600 cursor-pointer hover:scale-105 duration-150 ease-in-out"
                >
                  Sierra
                </h1>
                <div className="text-center gap-2 text-slate-300">
                  <ul>
                    {agenciasSierra &&
                      agenciasSierra.map((value, i) => (
                        <li key={i} className="flex flex-row items-center">
                          <select
                            value={value.provincia}
                            className="bg-transparent outline-none cursor-pointer w-[140px]"
                            onChange={(e) =>
                              handleChange(
                                e,
                                i,
                                setAgenciasSierra,
                                agenciasSierra
                              )
                            }
                          >
                            <option className="bg-slate-700" key={i}>
                              {value.provincia}
                            </option>
                            {provinciasSierra.map((provSierra, i) => {
                              if (
                                agenciasSierra.find(
                                  (item) => item.provincia == provSierra
                                ) === undefined
                              )
                                return (
                                  <option className="bg-slate-700" key={i}>
                                    {provSierra}
                                  </option>
                                );
                            })}
                          </select>
                          <input
                            className="bg-slate-900 w-9 text-center outline-none"
                            min={1}
                            max={100}
                            value={value.cant}
                            type="number"
                            onChange={(e) =>
                              handleChangeCant(
                                e,
                                i,
                                setAgenciasSierra,
                                agenciasSierra
                              )
                            }
                          />
                          <img
                            className="h-4 cursor-pointer"
                            src={deleteIcon}
                            onClick={() =>
                              handleDelete(i, setAgenciasSierra, agenciasSierra)
                            }
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
              <li>
                <h1
                  onClick={() =>
                    handleAdd(agenciasCosta, setAgenciasCosta, provinciasCosta)
                  }
                  className="bg-slate-600 cursor-pointer hover:scale-105 duration-150 ease-in-out"
                >
                  Costa
                </h1>
                <div className="text-center gap-2 text-slate-300">
                  <ul>
                    {agenciasCosta &&
                      agenciasCosta.map((value, i) => (
                        <li key={i} className="flex flex-row items-center">
                          <select
                            value={value.provincia}
                            className="bg-transparent outline-none cursor-pointer w-[140px]"
                            onChange={(e) =>
                              handleChange(
                                e,
                                i,
                                setAgenciasCosta,
                                agenciasCosta
                              )
                            }
                          >
                            <option className="bg-slate-700" key={i}>
                              {value.provincia}
                            </option>
                            {provinciasCosta.map((prov, i) => {
                              if (
                                agenciasCosta.find(
                                  (item) => item.provincia == prov
                                ) === undefined
                              )
                                return (
                                  <option className="bg-slate-700" key={i}>
                                    {prov}
                                  </option>
                                );
                            })}
                          </select>
                          <input
                            className="bg-slate-900 w-9 text-center outline-none"
                            min={1}
                            max={100}
                            value={value.cant}
                            type="number"
                            onChange={(e) =>
                              handleChangeCant(
                                e,
                                i,
                                setAgenciasCosta,
                                agenciasCosta
                              )
                            }
                          />
                          <img
                            className="h-4 cursor-pointer"
                            src={deleteIcon}
                            onClick={() =>
                              handleDelete(i, setAgenciasCosta, agenciasCosta)
                            }
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
              <li>
                <h1 className="bg-slate-600 cursor-pointer hover:scale-105 duration-150 ease-in-out">
                  Oriente
                </h1>
              </li>
              <li>
                <h1 className="bg-slate-600 cursor-pointer hover:scale-105 duration-150 ease-in-out">
                  Insular
                </h1>
              </li>
            </ul>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form1;

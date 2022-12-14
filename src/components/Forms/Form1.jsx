import React, { useRef, useState } from "react";
import { useEffect } from "react";
import deleteIcon from "../../assets/icons/close.png";
import simpleAlert from "../../utils/Alerts";
import Modal from "../Modal/Modal";
const NUMBER_LIMIT = 1000000000;
const NUMBER_MIN = 1;
const Form1 = ({ getData, setter, i, dataDB }) => {
  const form1 = useRef(null);
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
  const provinciasOriente = [
    "Sucumbíos",
    "Orellana",
    "Napo",
    "Pastaza",
    "Morona Santiago",
    "Zamora",
  ];
  const provinciasInsular = ["Galápagos"];
  const [agenciasSierra, setAgenciasSierra] = useState([]);
  const [agenciasCosta, setAgenciasCosta] = useState([]);
  const [agenciasOriente, setAgenciasOriente] = useState([]);
  const [agenciasInsular, setAgenciasInsultar] = useState([]);
  const [info, setInfo] = useState({
    razonSocial: "",
    ruc: "",
    grupoEconomico: "",
    ciudadConstitucion: "",
    direccionMatriz: "",
    añosActividad: "",
    numAgenciasLocales: "",
    telf: "",
    paginaWeb: "",
    agenciasExterior: { ubicacion: "", cantidad: "" },
  });
  const [preview, setPreview] = useState({});

  const handleDataFromDB = (data) => {
    console.log("2222data", data);
    if (data) {
      setAgenciasCosta(data?.agencias?.locales?.costa || []);
      setAgenciasSierra(data?.agencias?.locales?.sierra || []);
      setAgenciasOriente(data?.agencias?.locales?.oriente || []);
      setAgenciasInsultar(data?.agencias?.locales?.insular || []);
      setInfo({
        razonSocial: data?.informacionGeneral?.razonSocial,
        ruc: data?.informacionGeneral?.ruc,
        grupoEconomico: data?.informacionGeneral?.grupoEconomico,
        ciudadConstitucion: data?.informacionGeneral?.ciudadConstitucion,
        direccionMatriz: data?.informacionGeneral?.direccionMatriz,
        añosActividad: data?.informacionGeneral?.añosActividad,
        numAgenciasLocales: data?.informacionGeneral?.numAgenciasLocales,
        telf: data?.informacionGeneral?.telf,
        paginaWeb: data?.informacionGeneral?.paginaWeb,
        agenciasExterior: {
          ubicacion: data?.informacionGeneral?.agenciasExterior?.ubicacion,
          cantidad: data?.informacionGeneral?.agenciasExterior?.cantidad,
        },
      });
    }
  };

  const handleChangeInputs = (key, value) => {
    const temp = { ...info };
    temp[`${key}`] = value;
    setInfo(temp);
  };
  const handleChangeInputs2 = (key, key2, value) => {
    const temp = { ...info };
    temp[`${key}`][`${key2}`] = value;
    setInfo(temp);
  };
  const handleSave = () => {
    form1.current.reportValidity();
    if (form1.current.checkValidity()) {
      getData(
        {
          agencias: {
            locales: {
              sierra: agenciasSierra,
              costa: agenciasCosta,
              oriente: agenciasOriente,
              insular: agenciasInsular,
            },
            internacionales: info.agenciasExterior,
          },
          informacionGeneral: info,
        },
        setter,
        i
      );
      simpleAlert("¡Se ha guardado correctamente!", "success", "¡Exito!");
    }
  };
  const handlePreview = () => {
    setPreview({
      agencias: {
        locales: {
          sierra: agenciasSierra,
          costa: agenciasCosta,
          oriente: agenciasOriente,
          insular: agenciasInsular,
        },
        internacionales: info.agenciasExterior,
      },
      informacionGeneral: info,
    });
  };
  useEffect(() => console.log(preview), [preview]);
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
  useEffect(() => console.log(agenciasOriente), [agenciasOriente]);
  useEffect(() => console.log(agenciasInsular), [agenciasInsular]);
  useEffect(() => console.log({ info }), [info]);
  useEffect(() => handleDataFromDB(dataDB), []);

  return (
    <div className="">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-[#2b2b2b] text-center  text-xl font-semibold">
          Parte 1. Información de la entidad
        </h1>
        <form ref={form1} className="flex flex-col gap-1 text-slate-800 text-base font-medium">
          <div className="p-1 gap-1 flex flex-row justify-center rounded-md items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="razon_social">
              Razón Social:
            </label>
            <input
              className="outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="text"
              placeholder="Razón Social"
              required
              value={info.razonSocial}
              onChange={(e) =>
                handleChangeInputs("razonSocial", e.target.value)
              }
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="RUC">
              RUC:
            </label>
            <input
              className="no-arrows outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="number"
              name="RUC"
              id="RUC"
              placeholder="RUC"
              required
              value={info.ruc}
              onChange={(e) => handleChangeInputs("ruc", e.target.value)}
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="grupo_económico">
              Grupo económico:
            </label>
            <input
              className="outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]
              "
              // className=" outline-none w-1/2 max-h-6   bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="text"
              name="grupo_económico"
              id="grupo_económico"
              placeholder="Grupo económico"
              required
              value={info.grupoEconomico}
              onChange={(e) =>
                handleChangeInputs("grupoEconomico", e.target.value)
              }
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
            <label
              className="w-1/2 max-w-[200px]"
              htmlFor="ciudad_constitución"
            >
              Ciudad de Constitución:
            </label>
            <input
              value={info.ciudadConstitucion}
              placeholder="Quito"
              className="outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]
              "
              // className=" outline-none w-1/2 max-h-6  bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="text"
              name="ciudad_constitución"
              id="ciudad_constitución"
              required
              onChange={(e) =>
                handleChangeInputs("ciudadConstitucion", e.target.value)
              }
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="dirección_matriz">
              Dirección de la Matriz:
            </label>
            <input
              value={info.direccionMatriz}
              className="outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]
              "
              // className=" outline-none w-1/2 max-h-6  bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="text"
              name="dirección_matriz"
              id="dirección_matriz"
              placeholder="ejem: Av. calle1 & calle2"
              required
              onChange={(e) =>
                handleChangeInputs("direccionMatriz", e.target.value)
              }
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="años_actividad">
              Años en la actividad:
            </label>
            <input
              value={info.añosActividad}
              className="no-arrows outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]
              "
              // className="no-arrows outline-none w-1/2 max-h-6  bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="number"
              placeholder="ejem: 3"
              name="años_actividad"
              id="años_actividad"
              required
              onChange={(e) =>
                handleChangeInputs("añosActividad", e.target.value)
              }
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
            <label
              className="w-1/2 max-w-[200px]"
              htmlFor="número_agencias_locales"
            >
              Número de agencias locales :
            </label>
            <input
              value={info.numAgenciasLocales}
              className="no-arrows outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]
              "
              // className="no-arrows outline-none w-1/2 max-h-6  bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="number"
              placeholder="ejem: 3"
              name="número_agencias_locales"
              id="número_agencias_locales"
              required
              onChange={(e) =>
                handleChangeInputs("numAgenciasLocales", e.target.value)
              }
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="telefono">
              Teléfono:
            </label>
            <input
              value={info.telf}
              className="outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]
              "
              // className="outline-none w-1/2 max-h-6  bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="tel"
              name="telefono"
              placeholder="ejem: 2-222-222"
              required
              onChange={(e) => handleChangeInputs("telf", e.target.value)}
            />
          </div>
          <div className="p-1 gap-1 flex flex-row justify-center  items-center">
            <label className="w-1/2 max-w-[200px]" htmlFor="webpage">
              Página Web:
            </label>
            <input
              value={info.paginaWeb}
              className="outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
              type="url"
              name="webpage"
              placeholder="ejem: https://dominio.com"
              required
              onChange={(e) => handleChangeInputs("paginaWeb", e.target.value)}
            />
          </div>
          <div className="">
            <section className="py-3 px-2">
              <div className="flex flex-col justify-center text-slate-300 gap-2">
                <h1 className="text-slate-900 px-4 py-1 rounded-sm w-[min(90%,700px)] text-lg font-semibold text-center self-center">
                  Número de agencias por ubicación (click en la región)
                </h1>
                <ul className="grid  grid-cols-1 sm:grid-cols-2 text-center gap-2 text-slate-800 text-base font-medium">
                  <li className="flex flex-col  items-center gap-2">
                    <h1
                      onClick={() =>
                        handleAdd(
                          agenciasSierra,
                          setAgenciasSierra,
                          provinciasSierra
                        )
                      }
                      className="w-[min(250px,100%)] bg-[#41b1e9] text-slate-100 cursor-pointer rounded-sm hover:scale-[1.02] duration-150 ease-in-out"
                    >
                      Sierra
                    </h1>
                    <div className="text-center gap-2 text-slate-300 w-full">
                      <ul className="flex flex-col justify-center items-center">
                        {agenciasSierra &&
                          agenciasSierra.map((value, i) => (
                            <li
                              key={i}
                              className="flex flex-row items-center w-[min(80%,280px)]"
                            >
                              <select
                                value={value.provincia}
                                className=" text-slate-900  rounded-sm outline-none cursor-pointer w-full"
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    i,
                                    setAgenciasSierra,
                                    agenciasSierra
                                  )
                                }
                              >
                                <option className="" key={i}>
                                  {value.provincia}
                                </option>
                                {provinciasSierra.map((provSierra, i) => {
                                  if (
                                    agenciasSierra.find(
                                      (item) => item.provincia == provSierra
                                    ) === undefined
                                  )
                                    return (
                                      <option className="" key={i}>
                                        {provSierra}
                                      </option>
                                    );
                                })}
                              </select>
                              <input
                                className="border-[1px] border-[#0979af] text-slate-800 w-9 text-center outline-none"
                                min={NUMBER_MIN}
                                max={NUMBER_LIMIT}
                                value={value.cant}
                                type="number"
                                placeholder="Quito"
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
                                className="h-4 cursor-pointer ml-1"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(
                                    i,
                                    setAgenciasSierra,
                                    agenciasSierra
                                  )
                                }
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex flex-col  items-center gap-2">
                    <h1
                      onClick={() =>
                        handleAdd(
                          agenciasCosta,
                          setAgenciasCosta,
                          provinciasCosta
                        )
                      }
                      className="w-[min(250px,100%)] bg-[#41b1e9] text-slate-100 cursor-pointer rounded-sm hover:scale-[1.02] duration-150 ease-in-out"
                    >
                      Costa
                    </h1>
                    <div className="text-center gap-2 text-slate-300 w-full">
                      <ul className="flex flex-col justify-center items-center">
                        {agenciasCosta &&
                          agenciasCosta.map((value, i) => (
                            <li
                              key={i}
                              className="flex flex-row items-center w-[min(80%,280px)]"
                            >
                              <select
                                value={value.provincia}
                                className="text-slate-900  outline-none cursor-pointer w-full"
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    i,
                                    setAgenciasCosta,
                                    agenciasCosta
                                  )
                                }
                              >
                                <option className="" key={i}>
                                  {value.provincia}
                                </option>
                                {provinciasCosta.map((prov, i) => {
                                  if (
                                    agenciasCosta.find(
                                      (item) => item.provincia == prov
                                    ) === undefined
                                  )
                                    return (
                                      <option className="" key={i}>
                                        {prov}
                                      </option>
                                    );
                                })}
                              </select>
                              <input
                                className="border-[1px] border-[#0979af] text-slate-800 w-9 text-center outline-none"
                                min={NUMBER_MIN}
                                max={NUMBER_LIMIT}
                                value={value.cant}
                                placeholder="Quito"
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
                                className="h-4 cursor-pointer  ml-1"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(
                                    i,
                                    setAgenciasCosta,
                                    agenciasCosta
                                  )
                                }
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                    <h1
                      onClick={() =>
                        handleAdd(
                          agenciasOriente,
                          setAgenciasOriente,
                          provinciasOriente
                        )
                      }
                      className="w-[min(250px,100%)] bg-[#41b1e9] text-slate-100 cursor-pointer rounded-sm hover:scale-[1.02] duration-150 ease-in-out"
                    >
                      Oriente
                    </h1>
                    <div className="text-center gap-2 text-slate-300 w-full">
                      <ul className="flex flex-col justify-center items-center">
                        {agenciasOriente &&
                          agenciasOriente.map((value, i) => (
                            <li
                              key={i}
                              className="flex flex-row items-center w-[min(80%,280px)]"
                            >
                              <select
                                value={value.provincia}
                                
                                className="text-slate-900  outline-none cursor-pointer w-full"
                                // className=" bg-slate-600 rounded-sm outline-none cursor-pointer w-full"
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    i,
                                    setAgenciasOriente,
                                    agenciasOriente
                                  )
                                }
                              >
                                <option className="bg-slate-700" key={i}>
                                  {value.provincia}
                                </option>
                                {provinciasOriente.map((prov, i) => {
                                  if (
                                    agenciasOriente.find(
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
                                className="border-[1px] border-[#0979af] text-slate-800 w-9 text-center outline-none"
                                min={NUMBER_MIN}
                                max={NUMBER_LIMIT}
                                value={value.cant}
                                placeholder="Quito"
                                type="number"
                                onChange={(e) =>
                                  handleChangeCant(
                                    e,
                                    i,
                                    setAgenciasOriente,
                                    agenciasOriente
                                  )
                                }
                              />
                              <img
                                className="h-4 cursor-pointer  ml-1"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(
                                    i,
                                    setAgenciasOriente,
                                    agenciasOriente
                                  )
                                }
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                    <h1
                      onClick={() =>
                        handleAdd(
                          agenciasInsular,
                          setAgenciasInsultar,
                          provinciasInsular
                        )
                      }
                      className="w-[min(250px,100%)] bg-[#41b1e9] text-slate-100 cursor-pointer rounded-sm hover:scale-[1.02] duration-150 ease-in-out"
                    >
                      Insular
                    </h1>
                    <div className="text-center gap-2 text-slate-300 w-full">
                      <ul className="flex flex-col justify-center items-center">
                        {agenciasInsular &&
                          agenciasInsular.map((value, i) => (
                            <li
                              key={i}
                              className="flex flex-row items-center w-[min(80%,280px)]"
                            >
                              <select
                                value={value.provincia}
                                className="text-slate-900  outline-none cursor-pointer w-full"

                                // className=" bg-slate-600 rounded-sm outline-none cursor-pointer w-full"
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    i,
                                    setAgenciasInsultar,
                                    agenciasInsular
                                  )
                                }
                              >
                                <option className="bg-slate-700" key={i}>
                                  {value.provincia}
                                </option>
                                {provinciasInsular.map((prov, i) => {
                                  if (
                                    agenciasInsular.find(
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
                                className="border-[1px] border-[#0979af] text-slate-800 w-9 text-center outline-none"
                                min={NUMBER_MIN}
                                max={NUMBER_LIMIT}
                                value={value.cant}
                                type="number"
                                onChange={(e) =>
                                  handleChangeCant(
                                    e,
                                    i,
                                    setAgenciasInsultar,
                                    agenciasInsular
                                  )
                                }
                              />
                              <img
                                className="h-4 cursor-pointer  ml-1"
                                src={deleteIcon}
                                onClick={() =>
                                  handleDelete(
                                    i,
                                    setAgenciasInsultar,
                                    agenciasInsular
                                  )
                                }
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            <section className="flex flex-col gap-4">
              <h1 className="text-slate-900 px-4 py-1  rounded-sm w-[min(90%,700px)] text-center text-lg font-semibold self-center">
                Número de Agencias en el exterior
              </h1>
              <div className="flex flex-col md:flex-row w-full md:justify-center gap-4 md:gap-10 items-center text-slate-800 text-base font-medium p-1">
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <label className="" htmlFor="agencias_exteriores">
                    Ubicación Agencia:
                  </label>
                  <input
                   className=" outline-none w-1/2 max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                    type="text"
                    name="agencias_exteriores"
                    placeholder="ejem: Pais, Ciudad"
                    value={info?.agenciasExterior?.ubicacion}
                    onChange={(e) =>
                      handleChangeInputs2(
                        "agenciasExterior",
                        "ubicacion",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="" htmlFor="número_agencias_exterior">
                    Número de agencias:
                  </label>
                  <input
                    value={info.agenciasExterior.cantidad}
                    className="w-8 text-center outline-none  border-[1px] border-[#0979af] text-slate-800 rounded-sm shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                    min={NUMBER_MIN}
                    max={NUMBER_LIMIT}
                    type="number"
                    name="número_agencias_exterior"
                    onChange={(e) =>
                      handleChangeInputs2(
                        "agenciasExterior",
                        "cantidad",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </section>
          </div>
        </form>
        <div className=" w-[240px] lg:w-3/4 grid lg:grid-cols-[repeat(2,minmax(210px,1fr))] text-base py-5 gap-4 self-center">
          {/* <div className="w-4/5 lg:w-3/5 grid md:grid-cols-[repeat(2,minmax(210px,1fr))] py-5 gap-4 self-center"> */}
          {/* <div className="test-grid"> */}
          <button
            className="bg-[#0066cb] h-11 text-slate-300 rounded-md hover:scale-105 ease-in-out duration-150"
            // className="bg-slate-500 text-slate-300 rounded-md text-lg hover:scale-105 ease-in-out duration-150"
            onClick={() => handleSave()}
          >
            Guardar esta Sección
          </button>
          <Modal buttonText="Vista Previa" parentFunction={handlePreview}>
            <div>
              <h1 className="italic text-2xl text-center">
                Vista previa Parte 1
              </h1>
              <p>{JSON.stringify(preview, null, "\t")}</p>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Form1;

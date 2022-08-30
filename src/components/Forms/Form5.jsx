import { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { estilosCalendario } from "../../utils/constants";
import simpleAlert from "../../utils/Alerts";
const Form5 = ({ getData, setter, i, dataDB }) => {
  const [preview, setPreview] = useState({});
  const form5 = useRef(null);
  const preguntas = [
    "1. ¿Tiene un Manual de Prevención de Lavado de Activos?",
    "2. ¿Tiene políticas de Conocimiento de Clientes?",
    "3. ¿Realiza procesos de Debida Diligencia Ampliada a clientes de alto riesgo?",
    "4. Ejecuta procesos de Monitoreo de clientes y Transacciones?",
    "5. Ejecuta procesos de validación de Listas Oficiales?",
    "6. Dispone la Entidad de una Política de Retención de Documentos?",
    "7. Ha designado la entidad un Oficial de Cumplimiento?",
    "8. Dispone la Entidad de programas de capacitación en Prevención de Lavado de Activos?",
    "9. Ejecutan revisiones de Auditoría sobre Prevención de Lavado de Activos",
    "10. Ha sido la institución objeto de alguna investigación, proceso judicial, condena o acciones similares?",
  ];

  const [respuestas, setRespuestas] = useState(
    [...Array(preguntas.length).keys()].map(() => false)
  );
  const [subRespuestas, setSubRespuestas] = useState([
    { 1.1: new Date() },
    { 2.1: "" },
    { 3.1: "" },
    { 4.1: "manual", "4.1.1": "", "4.1.2": new Date() },
    {
      5.1: "anual",
      5.2: [false, false, false, false, false, false],
      5.3: [false, false, false, false, false],
      "5.3.1": "",
    },
    { 6.1: 0 },
    {
      7.1: { nombres: "", CI: "", email: "", tef: "", fechaNaci: new Date() },
      "7.1.1": false,
      "7.1.2": {
        nombres: "",
        CI: "",
        email: "",
        tef: "",
        fechaNaci: new Date(),
      },
    },
    { 8.1: "virtual", 8.2: "anual" },
    { 9.1: "", 9.2: "anual" },
    { 10.1: "" },
    {
      11.1: { resp: false, fecha: new Date() },
      11.2: { resp: false, fecha: new Date() },
      11.3: { resp: false, fecha: new Date() },
    },
  ]);
  const subPreguntas5_2 = [
    "Clientes",
    "Representantes Legales de Clientes",
    "Accionistas de Clientes",
    "Proveedores",
    "Empleados de la entidad",
    "Accionistas de la entidad",
  ];
  const subPreguntas5_3 = [
    "OFAC",
    "ONU",
    "PEPs",
    "Personas con Sentencia Condenatoria (Antes Consep)",
    "Otras",
  ];
  const handleDataFromDB = (data) => {
    if (data) {
      setRespuestas(data?.respuestas);
      setSubRespuestas(data?.subRespuestas);
    }
  };
  useEffect(() => handleDataFromDB(dataDB), []);
  const handleSave = () => {
    form5.current.reportValidity();
    if (form5.current.checkValidity()) {
      getData({ preguntas, respuestas, subRespuestas }, setter, i);
      simpleAlert("¡Se ha guardado correctamente!", "success", "¡Exito!");
    }
  };
  const handlePreview = () => {
    const data = {
      preguntas: [...respuestas],
    };
    const aux = respuestas.map((item, key) => {
      return { key: item };
    });
    console.log(aux);
    setPreview({});
  };
  const handleChangeArray = (value, setArray, array, key) => {
    console.log("handleChangeArray");
    const temp = [...array];
    temp[key] = value;
    setArray(temp);
  };
  const handleChangeArrayObject = (value, setArray, array, pos, key) => {
    console.log("handleChangeArrayObj");
    const temp = [...array];
    temp[pos][key] = value;
    setArray(temp);
  };
  const handleChangeArrayObjectArray = (
    value,
    setArray,
    array,
    pos,
    key,
    pos2
  ) => {
    console.log("handleChangeArrayObj");
    const temp = [...array];
    temp[pos][key][pos2] = value;
    setArray(temp);
  };
  const handleChangeArrayObjectObject = (
    value,
    setArray,
    array,
    pos,
    key,
    key2
  ) => {
    console.log("handleChangeArrayObj");
    const temp = [...array];
    temp[pos][key][key2] = value;
    setArray(temp);
  };
  useEffect(() => console.log("render"));
  useEffect(() => console.log(respuestas), [respuestas]);
  useEffect(() => console.log("sub", subRespuestas), [subRespuestas]);
  useEffect(() => console.log(dataDB), [dataDB]);

  return (
    <div className="fw-regular">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 5. Programa de cumplimiento
        </h1>
        <form ref={form5} className="flex flex-col gap-8">
          <section className="flex flex-col w-full items-center gap-5">
            <ul className="flex flex-col gap-3 w-full">
              {preguntas.map((pregunta, i) => (
                <li
                  key={i}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      {pregunta}
                    </label>
                    <input
                      className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={respuestas[i]}
                      onChange={(e) =>
                        handleChangeArray(
                          e.target.checked,
                          setRespuestas,
                          respuestas,
                          i
                        )
                      }
                    />
                  </div>
                  {respuestas[i] &&
                    (i === 0 ? (
                      <div className="p-1 gap-1 flex flex-row justify-center text-slate-400 rounded-md items-center">
                        <label
                          className="w-1/2 max-w-[200px]"
                          htmlFor="razon_social"
                        >
                          fecha de ultima actualización
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            value={subRespuestas[i][1.1]}
                            onChange={(date) =>
                              handleChangeArrayObject(
                                date,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                1.1
                              )
                            }
                            mask="__-__-____"
                            inputFormat="dd-MM-yyyy"
                            renderInput={(params) => (
                              <TextField {...params} sx={estilosCalendario} />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    ) : i === 1 ? (
                      <>
                        <label
                          className="w-[min(540px,85%)] text-slate-400 mb-2"
                          htmlFor="detalle clientes"
                        >
                          Detalle las actividades económicas "no aceptadas"
                        </label>
                        <textarea
                          className=" outline-none w-[min(500px,90%)] max-h-[150px] bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                          value={subRespuestas[i][2.1]}
                          placeholder="ejem: Casinos"
                          onChange={(e) =>
                            handleChangeArrayObject(
                              e.target.value,
                              setSubRespuestas,
                              subRespuestas,
                              i,
                              2.1
                            )
                          }
                          required
                          name="detalle clientes"
                          id=""
                          cols="30"
                          rows="10"
                        />
                      </>
                    ) : i === 2 ? (
                      <>
                        <label
                          className="w-[min(540px,85%)] text-slate-400 mb-2"
                          htmlFor="detalle clientes"
                        >
                          Detalle los tipos de clientes que son sujetos de
                          procesos de Debidas Diligencias Ampliadas
                        </label>
                        <textarea
                          className=" outline-none w-[min(500px,90%)] max-h-[150px] bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                          value={subRespuestas[i][3.1]}
                          placeholder="ejem: PEPs"
                          onChange={(e) =>
                            handleChangeArrayObject(
                              e.target.value,
                              setSubRespuestas,
                              subRespuestas,
                              i,
                              3.1
                            )
                          }
                          required
                          name="detalle clientes"
                          id=""
                          cols="30"
                          rows="10"
                        />
                      </>
                    ) : i === 3 ? (
                      <>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-row justify-center  text-slate-400 rounded-md">
                          <label className="pr-5" htmlFor="activos">
                            el proceso es:
                          </label>
                          <select
                            value={subRespuestas[i][4.1]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                4.1
                              )
                            }
                            className="w-40 bg-slate-700 outline-none rounded-sm "
                          >
                            <option value={"automatico"}>Automático</option>
                            <option value={"semiAutomatico"}>
                              Semi automático
                            </option>
                            <option value={"manual"}>Manual</option>
                          </select>
                        </div>
                        {subRespuestas[i][4.1] === "automatico" && (
                          <div className="w-5/6 p-1 gap-1 flex flex-col justify-center  text-slate-400 rounded-md">
                            <div className="flex flex-row w-full">
                              <label className="pr-5" htmlFor="activos">
                                Nombre del sistema utilizado para el proceso de
                                monitoreo
                              </label>
                              <input
                                className=" outline-none w-1/2 max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                                type="text"
                                name="razon_social"
                                id="razon_social"
                                required
                                value={subRespuestas[i]["4.1.1"]}
                                onChange={(e) =>
                                  handleChangeArrayObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    "4.1.1"
                                  )
                                }
                              />
                            </div>
                            <div className="flex flex-row w-full">
                              <label className="pr-5" htmlFor="activos">
                                Fecha en que fue implementado.
                              </label>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  // label="For desktop"
                                  value={subRespuestas[i]["4.1.2"]}
                                  onChange={(date) =>
                                    handleChangeArrayObject(
                                      date,
                                      setSubRespuestas,
                                      subRespuestas,
                                      i,
                                      "4.1.2"
                                    )
                                  }
                                  mask="__-__-____"
                                  inputFormat="dd-MM-yyyy"
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      sx={estilosCalendario}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        )}
                      </>
                    ) : i === 4 ? (
                      <>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-row justify-center  text-slate-400 rounded-md">
                          <label className="pr-5" htmlFor="activos">
                            ¿Cuál es la periodicidad con la que se ejecuta?
                          </label>
                          <select
                            value={subRespuestas[i][5.1]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                5.1
                              )
                            }
                            className="w-40 bg-slate-700 outline-none rounded-sm max-h-6 "
                          >
                            <option value={"anual"}>Anual</option>
                            <option value={"semestral"}>Semestral</option>
                            <option value={"trimestral"}>Trimestral</option>
                          </select>
                        </div>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-col justify-center  text-slate-400 rounded-md">
                          <label className="w-full">
                            La validación se ejecuta en los procesos de
                            vinculación de:
                          </label>
                          <ul>
                            {subRespuestas[i][5.2].map((value, j) => (
                              <li
                                key={j}
                                className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center"
                              >
                                <label
                                  className="w-[min(540px,85%)]"
                                  htmlFor="activos"
                                >
                                  {subPreguntas5_2[j]}
                                </label>
                                <input
                                  className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                                  type="checkbox"
                                  name="activos"
                                  id="activos"
                                  checked={value}
                                  onChange={(e) =>
                                    handleChangeArrayObjectArray(
                                      e.target.checked,
                                      setSubRespuestas,
                                      subRespuestas,
                                      i,
                                      "5.2",
                                      j
                                    )
                                  }
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-col justify-center  text-slate-400 rounded-md">
                          <label className="w-full">
                            Provea las listas contra las cuáles se realizan las
                            validaciones
                          </label>
                          <ul>
                            {subRespuestas[i][5.3].map((value, j) => (
                              <li
                                key={j}
                                className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center"
                              >
                                <label
                                  className="w-[min(540px,85%)]"
                                  htmlFor="activos"
                                >
                                  {subPreguntas5_3[j]}
                                </label>
                                <input
                                  className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                                  type="checkbox"
                                  name="activos"
                                  id="activos"
                                  checked={value}
                                  onChange={(e) =>
                                    handleChangeArrayObjectArray(
                                      e.target.checked,
                                      setSubRespuestas,
                                      subRespuestas,
                                      i,
                                      5.3,
                                      j
                                    )
                                  }
                                />
                              </li>
                            ))}
                            {subRespuestas[i][5.3][4] && (
                              <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                                <textarea
                                  className=" outline-none w-full bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                                  type="text"
                                  name="razon_social"
                                  id="razon_social"
                                  required
                                  placeholder="Detalle..."
                                  value={subRespuestas[i]["5.3.1"]}
                                  onChange={(e) =>
                                    handleChangeArrayObject(
                                      e.target.value,
                                      setSubRespuestas,
                                      subRespuestas,
                                      i,
                                      "5.3.1"
                                    )
                                  }
                                />
                              </li>
                            )}
                          </ul>
                        </div>
                      </>
                    ) : i === 5 ? (
                      <div className="w-full p-1 gap-1 flex flex-col justify-center text-slate-400 rounded-md items-center">
                        <h1>¿Por cuánto tiempo mantiene los documentos?</h1>
                        <div className="w-5/6 flex flex-row justify-center items-center">
                          <label className="px-2" htmlFor="activos">
                            Años
                          </label>
                          <input
                            className="outline-none w-12 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                            type="number"
                            name="activos"
                            id="activos"
                            min={0}
                            max={1000}
                            value={subRespuestas[i][6.1]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                parseInt(e.target.value),
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                6.1
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                    ) : i === 6 ? (
                      <>
                        <div className="w-full p-1 gap-1 flex flex-col justify-center text-slate-400 rounded-md items-center">
                          <ul className="w-5/6 flex flex-row gap-1 justify-center items-center">
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                Apellidos y Nombres
                              </label>
                              <input
                                placeholder="Nombres..."
                                className=" no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px]  shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="text"
                                name="nombresPregunta7"
                                id="activos"
                                value={subRespuestas[i][7.1]["nombres"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    7.1,
                                    "nombres"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                C.I.
                              </label>
                              <input
                                placeholder="111111111-1"
                                className=" no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px] shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="number"
                                name="nombresPregunta7"
                                id="activos"
                                min={0}
                                max={100000000000}
                                value={subRespuestas[i][7.1]["CI"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    parseInt(e.target.value),
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    7.1,
                                    "CI"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                Email
                              </label>
                              <input
                                placeholder="example@example.com"
                                className=" no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px] shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="email"
                                name="nombresPregunta7"
                                id="activos"
                                value={subRespuestas[i][7.1]["email"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    7.1,
                                    "email"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                Teléfonos
                              </label>
                              <input
                                placeholder="2-222-222"
                                className="no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px] shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="number"
                                name="nombresPregunta7"
                                id="activos"
                                min={0}
                                max={1000000000000}
                                value={subRespuestas[i][7.1]["tef"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    7.1,
                                    "tef"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="razon_social"
                              >
                                fecha Ultima actualización
                              </label>
                              <div className="h-[27px]">
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DesktopDatePicker
                                    value={subRespuestas[i][7.1]["fechaNaci"]}
                                    onChange={(date) =>
                                      handleChangeArrayObjectObject(
                                        date,
                                        setSubRespuestas,
                                        subRespuestas,
                                        i,
                                        7.1,
                                        "fechaNaci"
                                      )
                                    }
                                    mask="__-__-____"
                                    inputFormat="dd-MM-yyyy"
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        sx={estilosCalendario}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="text-slate-400 w-full p-1 gap-1 flex flex-row justify-center rounded-md items-center">
                          <label
                            className="w-[min(540px,85%)]"
                            htmlFor="activos"
                          >
                            ¿Ha designado la entidad un Oficial de Cumplimiento
                            Suplente?
                          </label>
                          <input
                            className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                            type="checkbox"
                            name="activos"
                            id="activos"
                            required
                            checked={subRespuestas[i]["7.1.1"]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.checked,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                "7.1.1"
                              )
                            }
                          />
                        </div>
                        {subRespuestas[i]["7.1.1"] && (
                          <ul className="text-slate-400 w-5/6 flex flex-row gap-1 justify-center items-center">
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                Apellidos y Nombres
                              </label>
                              <input
                                className=" no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px]  shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="text"
                                name="nombresPregunta7"
                                id="activos"
                                placeholder="Nombres"
                                value={subRespuestas[i]["7.1.2"]["nombres"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    "7.1.2",
                                    "nombres"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                C.I.
                              </label>
                              <input
                                className=" no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px] shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="number"
                                name="nombresPregunta7"
                                id="activos"
                                min={0}
                                placeholder="111111111-1"
                                max={100000000000}
                                value={subRespuestas[i]["7.1.2"]["CI"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    parseInt(e.target.value),
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    "7.1.2",
                                    "CI"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                Email
                              </label>
                              <input
                                placeholder="example@example.com"
                                className=" no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px] shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="email"
                                name="nombresPregunta7"
                                id="activos"
                                value={subRespuestas[i]["7.1.2"]["email"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    "7.1.2",
                                    "email"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="nombresPregunta7"
                              >
                                Teléfonos
                              </label>
                              <input
                                placeholder="2-222-222"
                                className="no-arrows text-slate-900 px-1 py-[2px] bg-slate-300 text-center outline-none w-full h-[27px] shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]"
                                type="number"
                                name="nombresPregunta7"
                                id="activos"
                                min={0}
                                max={1000000000000}
                                value={subRespuestas[i]["7.1.2"]["tef"]}
                                onChange={(e) =>
                                  handleChangeArrayObjectObject(
                                    e.target.value,
                                    setSubRespuestas,
                                    subRespuestas,
                                    i,
                                    "7.1.2",
                                    "tef"
                                  )
                                }
                                required
                              />
                            </li>
                            <li className="flex flex-col items-center">
                              <label
                                className="w-full fw-regular bg-sky-800 text-center"
                                htmlFor="razon_social"
                              >
                                fecha Ultima actualización
                              </label>
                              <div className="h-[27px]">
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DesktopDatePicker
                                    value={
                                      subRespuestas[i]["7.1.2"]["fechaNaci"]
                                    }
                                    onChange={(date) =>
                                      handleChangeArrayObjectObject(
                                        date,
                                        setSubRespuestas,
                                        subRespuestas,
                                        i,
                                        "7.1.2",
                                        "fechaNaci"
                                      )
                                    }
                                    mask="__-__-____"
                                    inputFormat="dd-MM-yyyy"
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        sx={estilosCalendario}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </li>
                          </ul>
                        )}
                      </>
                    ) : i === 7 ? (
                      <>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-row justify-center  text-slate-400 rounded-md">
                          <label className="pr-5" htmlFor="activos">
                            ¿Qué modalidad utilizan?
                          </label>
                          <select
                            value={subRespuestas[i][8.1]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                8.1
                              )
                            }
                            className="w-40 bg-slate-700 outline-none rounded-sm max-h-6 "
                          >
                            <option value={"virtual"}>Virtual</option>
                            <option value={"presencial"}>Presencial</option>
                          </select>
                        </div>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-row justify-center  text-slate-400 rounded-md">
                          <label className="pr-5" htmlFor="activos">
                            ¿Cuál es la periodicidad con la que se aplican los
                            procesos de capacitación??
                          </label>
                          <select
                            value={subRespuestas[i][8.2]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                8.2
                              )
                            }
                            className="w-40 bg-slate-700 outline-none rounded-sm max-h-6 "
                          >
                            <option value={"anual"}>Anual</option>
                            <option value={"semestral"}>Semestral</option>
                            <option value={"trimestral"}>Trimestral</option>
                          </select>
                        </div>
                      </>
                    ) : i === 8 ? (
                      <div className="w-full flex flex-col gap-5 justify-center items-center">
                        <div className="flex flex-col w-full justify-center items-center text-slate-400 gap-2">
                          <label className="pr-5" htmlFor="activos">
                            Nombre de la entidad que ejecuta las revisiones de
                            auditoría
                          </label>
                          <input
                            className=" outline-none w-[min(250px,90%)] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                            type="text"
                            name="razon_social"
                            id="razon_social"
                            placeholder="Nombre entidad"
                            required
                            value={subRespuestas[i][9.1]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                9.1
                              )
                            }
                          />
                        </div>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-row justify-center  text-slate-400 rounded-md">
                          <label className="pr-5" htmlFor="activos">
                            Periodicidad en que se realiza las revisiones
                          </label>
                          <select
                            value={subRespuestas[i][9.2]}
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                9.2
                              )
                            }
                            className="w-40 bg-slate-700 outline-none rounded-sm max-h-6 "
                          >
                            <option value={"anual"}>Anual</option>
                            <option value={"semestral"}>Semestral</option>
                            <option value={"trimestral"}>Trimestral</option>
                          </select>
                        </div>
                      </div>
                    ) : i === 9 ? (
                      <>
                        <>
                          <textarea
                            className=" outline-none w-[min(500px,90%)] max-h-[150px] bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                            value={subRespuestas[i][10.1]}
                            placeholder="Describa..."
                            onChange={(e) =>
                              handleChangeArrayObject(
                                e.target.value,
                                setSubRespuestas,
                                subRespuestas,
                                i,
                                10.1
                              )
                            }
                            required
                            name="detalle clientes"
                            id=""
                            cols="30"
                            rows="10"
                          />
                        </>
                      </>
                    ) : (
                      <></>
                    ))}
                </li>
              ))}
              <li className="flex flex-col items-center justify-center w-full">
                <h1 className="w-[min(570px,85%)] text-slate-100 mb-2">
                  11. ¿Cuenta su Institución con revisiones periódicas de
                  evaluación al cumplimiento de las políticas de Prevención de
                  Lavado de Activos?
                </h1>
                <ul className="flex flex-col w-[500px] text-slate-400 gap-2">
                  <li className="flex flex-row gap-2 justify-between">
                    <div className="flex flex-row justify-between gap-2 w-[200px]">
                      <label className="" htmlFor="activos">
                        Auditoría Interna
                      </label>
                      <input
                        className="outline-none h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                        type="checkbox"
                        name="activos"
                        id="activos"
                        checked={subRespuestas[10][11.1]["resp"]}
                        onChange={(e) =>
                          handleChangeArrayObjectObject(
                            e.target.checked,
                            setSubRespuestas,
                            subRespuestas,
                            10,
                            11.1,
                            "resp"
                          )
                        }
                      />
                    </div>
                    {subRespuestas[10][11.1]["resp"] && (
                      <div className="flex flex-row gap-2">
                        <h1>Fecha:</h1>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            value={subRespuestas[10][11.1]["fecha"]}
                            onChange={(date) =>
                              handleChangeArrayObjectObject(
                                date,
                                setSubRespuestas,
                                subRespuestas,
                                10,
                                11.1,
                                "fecha"
                              )
                            }
                            mask="__-__-____"
                            inputFormat="dd-MM-yyyy"
                            renderInput={(params) => (
                              <TextField {...params} sx={estilosCalendario} />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    )}
                  </li>
                  <li className="flex flex-row gap-2 justify-between">
                    <div className="flex flex-row justify-between gap-2 w-[200px]">
                      <label className="" htmlFor="activos">
                        Auditoría Externa
                      </label>
                      <input
                        className="outline-none h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                        type="checkbox"
                        name="activos"
                        id="activos"
                        checked={subRespuestas[10][11.2]["resp"]}
                        onChange={(e) =>
                          handleChangeArrayObjectObject(
                            e.target.checked,
                            setSubRespuestas,
                            subRespuestas,
                            10,
                            11.2,
                            "resp"
                          )
                        }
                      />
                    </div>
                    {subRespuestas[10][11.2]["resp"] && (
                      <div className="flex flex-row gap-2">
                        <h1>Fecha:</h1>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            value={subRespuestas[10][11.2]["fecha"]}
                            onChange={(date) =>
                              handleChangeArrayObjectObject(
                                date,
                                setSubRespuestas,
                                subRespuestas,
                                10,
                                11.2,
                                "fecha"
                              )
                            }
                            mask="__-__-____"
                            inputFormat="dd-MM-yyyy"
                            renderInput={(params) => (
                              <TextField {...params} sx={estilosCalendario} />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    )}
                  </li>
                  <li className="flex flex-row gap-2 justify-between">
                    <div className="flex flex-row justify-between gap-2 w-[200px]">
                      <label className="" htmlFor="activos">
                        Auditoría Ente de Control
                      </label>
                      <input
                        className="outline-none h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                        type="checkbox"
                        name="activos"
                        id="activos"
                        checked={subRespuestas[10][11.3]["resp"]}
                        onChange={(e) =>
                          handleChangeArrayObjectObject(
                            e.target.checked,
                            setSubRespuestas,
                            subRespuestas,
                            10,
                            11.3,
                            "resp"
                          )
                        }
                      />
                    </div>
                    {subRespuestas[10][11.3]["resp"] && (
                      <div className="flex flex-row gap-2">
                        <h1>Fecha:</h1>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            value={subRespuestas[10][11.3]["fecha"]}
                            onChange={(date) =>
                              handleChangeArrayObjectObject(
                                date,
                                setSubRespuestas,
                                subRespuestas,
                                10,
                                11.3,
                                "fecha"
                              )
                            }
                            mask="__-__-____"
                            inputFormat="dd-MM-yyyy"
                            renderInput={(params) => (
                              <TextField {...params} sx={estilosCalendario} />
                            )}
                          />
                        </LocalizationProvider>
                      </div>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </form>
        <div className="w-4/5 lg:w-3/5 grid md:grid-cols-[repeat(2,minmax(210px,1fr))] py-5 gap-4 self-center">
          <button
            className="bg-slate-500 text-slate-300 rounded-md text-xl hover:scale-105 ease-in-out duration-150"
            onClick={() => handleSave()}
          >
            Guardar esta Sección
          </button>
          <Modal buttonText="Vista Previa" parentFunction={handlePreview}>
            <div>
              <h1 className="italic text-2xl text-center">
                Vista previa Parte 5
              </h1>
              <p>{JSON.stringify("", null, "\t")}</p>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Form5;

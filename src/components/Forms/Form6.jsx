import React, { useEffect, useRef, useState } from "react";
import deleteIcon from "../../assets/icons/close.png";
import addIcon from "../../assets/icons/plus.png";
import simpleAlert from "../../utils/Alerts";
import Modal from "../Modal/Modal";
const Form6 = ({ getData, setter, i, dataDB }) => {
  const [preview, setPreview] = useState({});
  const [numPersMediosPago, setNumPersMediosPago] = useState(0);
  const [comentario, setComentario] = useState("");
  const [capacidad, setCapacidad] = useState(true);
  const [agentesOperativos, setAgentesOperativos] = useState([
    {
      nombres: "",
      rol: "",
      email: "",
      telf: "",
      porcentAsignancion: "",
      nivelResponsabilidad: "baja",
    },
  ]);
  const form6 = useRef(null);
  const handleDataFromDB = (data) => {
    if (data) {
      setNumPersMediosPago(data.numPersMediosPago);
      setComentario(data.comentario);
      setAgentesOperativos(data.agentesOperativos);
    }
  };
  useEffect(() => handleDataFromDB(dataDB), []);
  const handleSave = () => {
    form6.current.reportValidity();
    if (form6.current.checkValidity()) {
      getData(
        {
          agentesOperativos: agentesOperativos,
          comentario: comentario,
          numPersMediosPago: numPersMediosPago,
        },
        setter,
        i
      );
      simpleAlert("¡Se ha guardado correctamente!", "success", "¡Exito!");
    }
  };
  const handlePreview = () => {
    setPreview({
      agentesOperativos: agentesOperativos,
      comentario: comentario,
      numPersMediosPago: numPersMediosPago,
    });
  };
  const handleDelete = (i, setfunction, array) => {
    console.log("handleDelete");
    const temp = [...array];
    temp.splice(i, 1);
    setfunction(temp);
  };
  const handleAdd = (array, setArray, values) => {
    console.log("handleAdd");
    setArray(array.concat(values));
  };
  const handleChange = (value, i, setfunction, array, key) => {
    console.log("handleChange");
    const temp = [...array];
    temp[i][`${key}`] = value;
    setfunction(temp);
  };

  useEffect(() => console.log(agentesOperativos), [agentesOperativos]);
  useEffect(() => console.log(capacidad), [capacidad]);
  useEffect(() => console.log(comentario), [comentario]);
  useEffect(() => console.log(dataDB), [dataDB]);

  return (
    <div className="fw-regular">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <div>
          <h1 className=" text-center font-semibold text-xl">
            Parte 6. Modelo Operativo
          </h1>
          <p className=" text-center font-medium text-lg">
            Estructura Organizacional del proyecto: porcentaje de asignación y
            nivel de responsabilidad
          </p>
          <form ref={form6} className="w-full">
            <section className="w-full font-medium text-sm">
              <ul className="hidden text-center  break-all  md:grid grid-cols-[30px_repeat(6,1fr)_30px] gap-1">
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  n
                </li>
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  Apellidos y nombres
                </li>
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  Rol dentro del proyecto
                </li>
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  Email
                </li>
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  Telf
                </li>
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  % asignación al proyecto
                </li>
                <li style={{ fontWeight: 500 }} className=" bg-sky-800">
                  Nivel Responsabilidad
                </li>
              </ul>
              <ul className="w-full flex flex-col gap-1 ">
                {agentesOperativos &&
                  agentesOperativos.map((value, i) => {
                    return (
                      <li
                        className="flex flex-col border-[1px] p-2 rounded-md md:p-0 md:border-0 md:rounded-none"
                        key={i}
                      >
                        <section
                          className="w-full md:w-full grid grid-rows-[30px_repeat(6,1fr)] md:grid-cols-[30px_repeat(6,1fr)_30px] md:grid-rows-1 gap-1 
                        items-center 
                        text-center
                        "
                        >
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden bg-sky-800 text-center">
                              n
                            </label>
                            <div className="px-1 py-[2px] bg-slate-300">
                              {i + 1}
                            </div>
                          </div>
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden fw-regular bg-sky-800 text-center">
                              Apellidos y nombres
                            </label>
                            <input
                              required
                              className="w-full h-full outline-none px-1 py-[2px] bg-slate-300 text-center "
                              type="text"
                              placeholder="Nombres"
                              value={value["nombres"]}
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos,
                                  "nombres"
                                )
                              }
                            />
                          </div>
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden fw-regular bg-sky-800 text-center">
                              Rol dentro del proyecto
                            </label>

                            <input
                              required
                              className="w-full outline-none px-1 py-[2px] bg-slate-300 text-center h-full"
                              type="text"
                              placeholder="ej: Desarrolador"
                              value={value["rol"]}
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos,
                                  "rol"
                                )
                              }
                            />
                          </div>
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden fw-regular bg-sky-800 text-center">
                              Email
                            </label>
                            <input
                              required
                              className="w-full outline-none px-1 py-[2px] bg-slate-300 text-center h-full"
                              placeholder="example@example.com"
                              type="email"
                              value={value["email"]}
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos,
                                  "email"
                                )
                              }
                            />
                          </div>
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden fw-regular bg-sky-800 text-center">
                              Telf
                            </label>

                            <input
                              required
                              className="no-arrows w-full outline-none px-1 py-[2px] bg-slate-300 text-center h-full"
                              type="number"
                              value={value["telf"]}
                              placeholder="ej: 2-222-222"
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos,
                                  "telf"
                                )
                              }
                            />
                          </div>
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden fw-regular bg-sky-800 text-center">
                              % asignación al proyecto
                            </label>
                            <input
                              required
                              className="no-arrows w-full outline-none px-1 py-[2px] bg-slate-300 text-center h-full"
                              type="number"
                              value={value["porcentAsignancion"]}
                              placeholder="ej: 30%"
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos,
                                  "porcentAsignancion"
                                )
                              }
                            />
                          </div>
                          <div className="grid grid-cols-[5fr_8fr] md:block w-full h-full">
                            <label className="md:hidden fw-regular bg-sky-800 text-center">
                              Nivel Responsabilidad
                            </label>
                            <select
                              className="w-full outline-none px-1 py-[3px] bg-slate-300 text-center h-full"
                              value={value["nivelResponsabilidad"]}
                              onChange={(e) =>
                                handleChange(
                                  e.target.value,
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos,
                                  "nivelResponsabilidad"
                                )
                              }
                            >
                              <option value={"alta"}>Alta</option>
                              <option value={"media"}>Media</option>
                              <option value={"baja"}>Baja</option>
                              <option value={"nula"}>Nula</option>
                              <option value={"total"}>Total</option>
                            </select>
                          </div>
                          <div className="hidden md:flex justify-center items-center">
                            <img
                              className="h-6 cursor-pointer hover:scale-105 duration-150 ease-in-out"
                              src={deleteIcon}
                              onClick={() =>
                                handleDelete(
                                  i,
                                  setAgentesOperativos,
                                  agentesOperativos
                                )
                              }
                            />
                          </div>
                        </section>
                        <div
                          onClick={() =>
                            handleDelete(
                              i,
                              setAgentesOperativos,
                              agentesOperativos
                            )
                          }
                          className="md:hidden flex flex-row justify-center mt-2"
                        >
                          <div className="rounded-sm p-1 w-60 bg-slate-500 flex flex-row justify-center gap-1 items-center  cursor-pointer hover:scale-105 duration-150 ease-in-out">
                            <h1>Eliminar</h1>
                            <img className="h-8" src={deleteIcon} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <div
                onClick={() =>
                  handleAdd(agentesOperativos, setAgentesOperativos, [
                    {
                      nombres: "",
                      rol: "",
                      email: "",
                      telf: "",
                      porcentAsignancion: 0,
                      nivelResponsabilidad: "baja",
                    },
                  ])
                }
                className="flex flex-row justify-center mt-2"
              >
                <div className="rounded-sm p-1 w-80 bg-[#0979af] flex flex-row justify-center gap-1 items-center  cursor-pointer hover:scale-105 duration-150 ease-in-out">
                  <h1>Agregar</h1>
                  <img className="h-8" src={addIcon} />
                </div>
              </div>
            </section>
            <section className="w-full flex flex-col">
              <div className="w-full p-1 gap-1 flex flex-row justify-center  rounded-md items-center">
                <label className="w-[min(640px,85%)]" htmlFor="activos">
                  ¿Está en la capacidad de crear un área de medios de pago?
                </label>
                <input
                  className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)]  text-right"
                  type="checkbox"
                  name="activos"
                  id="activos"
                  checked={capacidad}
                  onChange={(e) => setCapacidad(e.target.checked)}
                />
              </div>
              <div className="w-full p-1 gap-1 flex flex-row justify-center  rounded-md items-center">

                {capacidad ? (
                  <>
                    <label className="w-[min(640px,80%)]" htmlFor="activos">
                      ¿Cuantas personas asignaría?
                    </label>
                    <input
                      className="outline-none w-14 h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      value={numPersMediosPago}
                      onChange={(e) => setNumPersMediosPago(e.target.value)}
                      required
                    />
                  </>
                ) : (
                  <div className="w-full flex flex-col justify-center items-center">
                    <label className="px-2">Coméntenos ¿Por que?</label>
                    <textarea
                      className="w-[min(700px,90%)] border-[1px] border-[#0979af] rounded-md outline-none h-12  px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] "
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      required
                      cols="30"
                      rows="10"
                    />
                  </div>
                )}
              </div>
            </section>
          </form>
        </div>

        <div className="w-4/5 lg:w-3/5 grid md:grid-cols-[repeat(2,minmax(210px,1fr))] py-5 gap-4 self-center">
          <button
            className="bg-[#0066cb] text-slate-300 rounded-md hover:scale-105 ease-in-out duration-150 h-11"
            onClick={() => handleSave()}
          >
            Guardar esta Sección
          </button>
          <Modal buttonText="Vista Previa" parentFunction={handlePreview}>
            <div>
              <h1 className="italic text-2xl text-center">
                Vista previa Parte 2
              </h1>
              <p>{JSON.stringify(preview, null, "\t")}</p>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Form6;

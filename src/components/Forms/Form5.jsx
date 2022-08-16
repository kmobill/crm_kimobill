import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { estilosCalendario } from "../../utils/constants";
const NUMBER_LIMIT = 100000;
const NUMBER_CLIENTS = 5;
const Form5 = ({ callback }) => {
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
  const [respuestas, setRespuestas] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const handleSave = () => {
    callback({
      productosServicios: { productosServicios, transAlertaMonitoreo },
      baseClientes: {
        baseClientes,
        clientesMayorIngreso,
        riesgoPLA,
        riesgoPLADetalle,
      },
      corresponsales: corresponsales,
    });
  };
  const handlePreview = () => {
    setPreview({
      productosServicios: { productosServicios, transAlertaMonitoreo },
      baseClientes: {
        baseClientes,
        clientesMayorIngreso,
        riesgoPLA,
        riesgoPLADetalle,
      },
      corresponsales: corresponsales,
    });
  };
  const handleChange = (value, i, setfunction, array, key) => {
    console.log("handleChange");
    const temp = [...array];
    temp[i][`${key}`] = value;
    setfunction(temp);
  };
  const handleChange2 = (value, setObj, obj, key) => {
    console.log("handleChange2");
    const temp = { ...obj };
    temp[`${key}`] = value;
    setObj(temp);
  };
  const handleChangeArray = (value, setArray, array, key) => {
    console.log("handleChangeArray");
    const temp = [...array];
    temp[key] = value;
    setArray(temp);
  };
  useEffect(() => console.log("render"));
  useEffect(() => console.log(respuestas), [respuestas]);
  useEffect(() => console.log(date), [date]);

  return (
    <div className="fw-regular">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 5. Programa de cumplimiento
        </h1>
        <form className="flex flex-col gap-8">
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
                      required
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
                            // label="For desktop"
                            value={date}
                            onChange={(date) => setDate(date)}
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
                          Detalle las actividades económicas "no aceptadas" (Ej.
                          Casinos)
                        </label>
                        <textarea
                          className=" outline-none w-[min(500px,90%)] max-h-[150px] bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                          onChange={(e) => console.log(e.target.value)}
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
                          procesos de Debidas Diligencias Ampliadas (Ej. PEPs)
                        </label>
                        <textarea
                          className=" outline-none w-[min(500px,90%)] max-h-[150px] bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                          onChange={(e) => console.log(e.target.value)}
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
                            onChange={(e) => console.log(e.target.value)}
                            className="w-40 bg-slate-700 outline-none rounded-sm "
                          >
                            <option value={"automatico"}>Automático</option>
                            <option value={"semiAutomatico"}>
                              Semi automático
                            </option>
                            <option value={"manual"}>Manual</option>
                          </select>
                        </div>
                        <div className="w-[min(500px,80%)] p-1 gap-1 flex flex-row justify-center  text-slate-400 rounded-md">
                          <label className="pr-5" htmlFor="activos">
                            Nombre del sistema utilizado para el proceso de
                            monitoreo
                          </label>
                          <select
                            onChange={(e) => console.log(e.target.value)}
                            className="w-40 bg-slate-700 outline-none rounded-sm "
                          >
                            <option value={"automatico"}>Automático</option>
                            <option value={"semiAutomatico"}>
                              Semi automático
                            </option>
                            <option value={"manual"}>Manual</option>
                          </select>

                          <label className="pr-5" htmlFor="activos">
                            Fecha en que fue implementado.
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              // label="For desktop"
                              value={date2}
                              onChange={(date) => setDate2(date)}
                              mask="__-__-____"
                              inputFormat="dd-MM-yyyy"
                              renderInput={(params) => (
                                <TextField {...params} sx={estilosCalendario} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </>
                    ) : (
                      <></>
                    ))}
                </li>
              ))}
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
                Vista previa Parte 4
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

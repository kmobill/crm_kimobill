import React, { useState } from "react";
import { useEffect } from "react";
import deleteIcon from "../assets/icons/close.png";
import addIcon from "../assets/icons/plus.png";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { estilosCalendario } from "../utils/constants";

const Form2 = () => {
  const [repLegales, setRepLegales] = useState([
    {
      CI: "",
      nombres: "",
      nacionalidad: "",
      PEP: 1,
      fechaNacimiento: new Date(),
    },
  ]);
  const [accionistas, setAccionistas] = useState([
    {
      CI: "",
      nombres: "",
      nacionalidad: "",
      PEP: 1,
      fechaNacimiento: new Date(),
    },
  ]);
  const handleChange = (value, i, setfunction, array, key) => {
    console.log("handleChange");
    const temp = [...array];
    temp[i][`${key}`] = value;
    setfunction(temp);
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

  useEffect(() => console.log(repLegales), [repLegales]);
  useEffect(() => console.log(accionistas), [accionistas]);

  return (
    <div className="">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 2 Administración de la entidad
        </h1>
        <form className="flex flex-col gap-1">
          <div className="flex flex-col justify-center text-slate-300">
            <ul className="grid grid-cols-1 text-center gap-2 text-slate-300">
              <h1 className="w-full text-center">
                Datos de Representantes Legales
              </h1>
              <li>
                <div className="text-center gap-2 text-slate-300">
                  <table className="w-full">
                    <thead className="w-full ">
                      <tr className="grid grid-cols-[repeat(5,1fr)_30px] gap-1">
                        <th className="fw-regular bg-sky-800">
                          Número de Identificación
                        </th>
                        <th className="fw-regular bg-sky-800">
                          Apellidos y nombres
                        </th>
                        <th className="fw-regular bg-sky-800">Nacionalidad</th>
                        <th className="fw-regular bg-sky-800">PEP (si/no)</th>
                        <th className="fw-regular bg-sky-800">
                          Fecha de nacimiento
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full flex flex-col gap-1 ">
                      {repLegales &&
                        repLegales.map((value, i) => {
                          return (
                            <tr
                              key={i}
                              className="grid grid-cols-[repeat(5,1fr)_30px] gap-1 text-slate-900"
                            >
                              <td>
                                <input
                                  required
                                  className="w-full outline-none px-1 py-[2px] no-arrows bg-slate-300"
                                  type="number"
                                  value={value["CI"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setRepLegales,
                                      repLegales,
                                      "CI"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  required
                                  className="w-full outline-none px-1 py-[2px] bg-slate-300"
                                  type="text"
                                  value={value["nombres"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setRepLegales,
                                      repLegales,
                                      "nombres"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  required
                                  className="w-full outline-none px-1 py-[2px] bg-slate-300"
                                  type="text"
                                  value={value["nacionalidad"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setRepLegales,
                                      repLegales,
                                      "nacionalidad"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <select
                                  className="w-full outline-none px-1 py-[3px] bg-slate-300"
                                  value={value["PEP"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setRepLegales,
                                      repLegales,
                                      "PEP"
                                    )
                                  }
                                >
                                  <option value={1}>Si</option>
                                  <option value={0}>No</option>
                                </select>
                              </td>
                              <td>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DesktopDatePicker
                                    // label="For desktop"
                                    value={value["fechaNacimiento"]}
                                    onChange={(date) =>
                                      handleChange(
                                        date,
                                        i,
                                        setRepLegales,
                                        repLegales,
                                        "fechaNacimiento"
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
                              </td>
                              <td className="flex justify-center items-center">
                                <img
                                  className="h-6 cursor-pointer hover:scale-105 duration-150 ease-in-out"
                                  src={deleteIcon}
                                  onClick={() =>
                                    handleDelete(i, setRepLegales, repLegales)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div
                  onClick={() =>
                    handleAdd(repLegales, setRepLegales, [
                      {
                        CI: "",
                        nombres: "",
                        nacionalidad: "",
                        PEP: 1,
                        fechaNacimiento: new Date(),
                      },
                    ])
                  }
                  className="flex flex-row justify-center mt-2"
                >
                  <div className="rounded-sm p-1 w-60 bg-slate-500 flex flex-row justify-center gap-1 items-center  cursor-pointer hover:scale-105 duration-150 ease-in-out">
                    <h1>Agregar representante legal</h1>
                    <img className="h-8" src={addIcon} />
                  </div>
                </div>
              </li>
              <li className="flex justify-center">
                <section className="flex flex-col w-5/6 text-left gap-2">
                  <h1 className="italic text-xl text-center">
                    Datos de Accionistas
                  </h1>
                  <p>
                    Para Bancos y Mutualistas adjuntar el detalle de accionistas
                    con participación directa o indirecta, igual o superior al
                    10% del capital suscrito; en caso de que los accionistas
                    sean empresas proporcionar el(los) nombre(s) de la(s)
                    persona(s) natural(es) propietarias.
                  </p>
                  <p>
                    Para Cooperativas de Ahorro y Crédito, adjuntar el detalle
                    de socios con participación directa o indirecta, que igualen
                    o superen el 10% del capital y reservas de la Cooperativa;
                    en caso de que los socios sean empresas proporcionar el(los)
                    nombre(s) de la(s) persona(s) natural(es) propietarias. Si
                    ningún socio posee una participación igual o superior al
                    10%, proporcionar el listado de los miembros del Consejo de
                    Administración.
                  </p>
                </section>
              </li>
              <li>
                <h1 className="w-full text-center">Datos de Accionistas</h1>
                <div className="text-center gap-2 text-slate-300">
                  <table className="w-full">
                    <thead className="w-full ">
                      <tr className="grid grid-cols-[repeat(5,1fr)_30px] gap-1">
                        <th className="fw-regular bg-sky-800">
                          Número de Identificación
                        </th>
                        <th className="fw-regular bg-sky-800">
                          Apellidos y nombres
                        </th>
                        <th className="fw-regular bg-sky-800">Nacionalidad</th>
                        <th className="fw-regular bg-sky-800">PEP (si/no)</th>
                        <th className="fw-regular bg-sky-800">
                          Fecha de nacimiento
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full flex flex-col gap-1 ">
                      {accionistas &&
                        accionistas.map((value, i) => {
                          return (
                            <tr
                              key={i}
                              className="grid grid-cols-[repeat(5,1fr)_30px] gap-1 text-slate-900"
                            >
                              <td>
                                <input
                                  required
                                  className="w-full outline-none px-1 py-[2px] no-arrows bg-slate-300"
                                  type="number"
                                  value={value["CI"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setAccionistas,
                                      accionistas,
                                      "CI"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  required
                                  className="w-full outline-none px-1 py-[2px] bg-slate-300"
                                  type="text"
                                  value={value["nombres"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setAccionistas,
                                      accionistas,
                                      "nombres"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  required
                                  className="w-full outline-none px-1 py-[2px] bg-slate-300"
                                  type="text"
                                  value={value["nacionalidad"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setAccionistas,
                                      accionistas,
                                      "nacionalidad"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <select
                                  className="w-full outline-none px-1 py-[3px] bg-slate-300"
                                  value={value["PEP"]}
                                  onChange={(e) =>
                                    handleChange(
                                      e.target.value,
                                      i,
                                      setAccionistas,
                                      accionistas,
                                      "PEP"
                                    )
                                  }
                                >
                                  <option value={1}>Si</option>
                                  <option value={0}>No</option>
                                </select>
                              </td>
                              <td>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DesktopDatePicker
                                    // label="For desktop"
                                    value={value["fechaNacimiento"]}
                                    onChange={(date) =>
                                      handleChange(
                                        date,
                                        i,
                                        setAccionistas,
                                        accionistas,
                                        "fechaNacimiento"
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
                              </td>
                              <td className="flex justify-center items-center">
                                <img
                                  className="h-6 cursor-pointer hover:scale-105 duration-150 ease-in-out"
                                  src={deleteIcon}
                                  onClick={() =>
                                    handleDelete(i, setAccionistas, accionistas)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div
                  onClick={() =>
                    handleAdd(accionistas, setAccionistas, [
                      {
                        CI: "",
                        nombres: "",
                        nacionalidad: "",
                        PEP: 1,
                        fechaNacimiento: new Date(),
                      },
                    ])
                  }
                  className="flex flex-row justify-center mt-2"
                >
                  <div className="rounded-sm p-1 w-60 bg-slate-500 flex flex-row justify-center gap-1 items-center  cursor-pointer hover:scale-105 duration-150 ease-in-out">
                    <h1>Agregar Accionista</h1>
                    <img className="h-8" src={addIcon} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form2;

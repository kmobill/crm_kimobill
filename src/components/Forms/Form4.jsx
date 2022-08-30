import { useEffect, useRef, useState } from "react";
import simpleAlert from "../../utils/Alerts";
import Modal from "../Modal/Modal";
const NUMBER_LIMIT = 100000;
const NUMBER_MIN = 1;
const NUMBER_CLIENTS = 5;
const Form4 = ({ getData, setter, i, dataDB }) => {
  const form4 = useRef(null);
  const [ROISS, setROISS] = useState(0);
  const [riesgoPLA, setRiesgoPLA] = useState(false);
  const [riesgoPLADetalle, setRiesgoPLADetalle] = useState({
    bajo: 0,
    medio: 0,
    alto: 0,
  });
  const [menusOpen, setMenusOpen] = useState({
    productosServicios: true,
    baseClientes: false,
    corresponsales: false,
  });
  const [productosServicios, setProductosServicios] = useState({
    ctaDeposito: false,
    comercioExt: false,
    bancaElect: false,
    inversionesDerivados: false,
    remesas: false,
    transfExt: false,
    emisionChequesExt: false,
    transValores: false,
  });
  const [corresponsales, setCorresponsales] = useState({
    ofreceServFinancieros: false,
    cuentasDeposito: false,
    transExterior: false,
    compensacionChequesExterior: false,
    custodia: false,
    cuentasEnOtrasEntidadesFinancieras: false,
    tipoEntidad: "localtest",
  });
  const [baseClientes, setBaseClientes] = useState({
    numTotalClientes: 0,
    persoNaturales: 0,
    persoJuridicas: 0,
    entidadesFinancieras: 0,
    entidadesEstado: 0,
    entidadesCorporativas: 0,
    noResidentes: 0,
    extranjeros: 0,
    fabricantesComercianesArmas: 0,
    remesadoras: 0,
    fundacionesONGs: 0,
    PEPs: 0,
  });
  const [transAlertaMonitoreo, setTransAlertaMonitoreo] = useState({
    depositoEfectivo: 0,
    depositoCheque: 0,
    transRecibidasNacionales: 0,
    transRecibidasExt: 0,
  });
  const [clientesMayorIngreso, setClientesMayorIngreso] = useState(
    [...Array(NUMBER_CLIENTS).keys()].map(() => ({
      CI: "",
      nombreCliente: "",
      actividadPrincipal: "",
    }))
  );

  const [preview, setPreview] = useState({});
  const handleSave = () => {
    const check = form4.current.checkValidity();
    form4.current.reportValidity();
    console.log(form4.current.reportValidity());
    console.log(form4.current.checkValidity());

    if (check) {
      getData(
        {
          productosServicios: { productosServicios, transAlertaMonitoreo },
          baseClientes: {
            baseClientes,
            clientesMayorIngreso,
            riesgoPLA,
            riesgoPLADetalle,
          },
          corresponsales: corresponsales,
        },
        setter,
        i
      );
      simpleAlert("¡Se ha guardado correctamente!", "success", "¡Exito!");
    }
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
  useEffect(
    () => console.log({ clientesMayorIngreso }),
    [clientesMayorIngreso]
  );
  useEffect(() => console.log({ productosServicios }), [productosServicios]);
  /*   useEffect(() => console.log({ riesgoPLADetalle }), [riesgoPLADetalle]);
  useEffect(() => console.log({ baseClientes }), [baseClientes]);
  useEffect(() => console.log({ corresponsales }), [corresponsales]); */
  useEffect(() => console.log({ menusOpen }), [menusOpen]);
  useEffect(() => console.log(dataDB), [dataDB]);

  /*  useEffect(
    () => console.log({ transAlertaMonitoreo }),
    [transAlertaMonitoreo]
  ); */
  return (
    <div className="fw-regular">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 4. Productos y Servicios, Clientes, Corresponsales
        </h1>
        <form ref={form4} className="flex flex-col gap-8">
          <h1
            onClick={() =>
              handleChange2(
                !menusOpen.productosServicios,
                setMenusOpen,
                menusOpen,
                "productosServicios"
              )
            }
            className="cursor-pointer self-center text-slate-300 fw-bold bg-slate-900 px-4 py-2 rounded-sm w-[min(90%,700px)] text-center"
          >
            1. Productos y Servicios que ofrece la Entidad
          </h1>
          {menusOpen.productosServicios && (
            <>
              <section className="flex flex-col w-full items-center gap-5">
                <ul className="flex flex-col gap-3 w-full">
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Cuentas de Depósito (corrientes, ahorros, inversiones)
                    </label>
                    <input
                      className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.ctaDeposito}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "ctaDeposito"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Comercio Exterior (Cartas de Crédito, Garantías)
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.comercioExt}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "comercioExt"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Banca Electrónica (transferencias bancarias e
                      interbancarias)
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.bancaElect}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "bancaElect"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Inversiones, Derivados Financieros
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.inversionesDerivados}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "inversionesDerivados"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Remesas
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.remesas}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "remesas"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Transferencias al/del exterior
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.transfExt}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "transfExt"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Emisión de cheques sobre el exterior
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.emisionChequesExt}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "emisionChequesExt"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Transporte de Valores
                    </label>
                    <input
                      className="no-arrows outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={productosServicios.transValores}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setProductosServicios,
                          productosServicios,
                          "transValores"
                        )
                      }
                    />
                  </li>
                </ul>
              </section>

              <section className="flex flex-col w-full items-center gap-5 ">
                <h1 className="fw-bold text-slate-900 bg-slate-500 px-4 py-1 rounded-sm w-[min(90%,700px)] text-center">
                  1.1 Indique las transacciones que más alertas genera en su
                  Revisiones de Monitoreo. (en porcentaje)
                </h1>
                <ul className="flex flex-col gap-3 w-full">
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Depósitos en Efectivo
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={transAlertaMonitoreo.depositoEfectivo}
                      onClick={() =>
                        handleChange2(
                          "",
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "depositoEfectivo"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "depositoEfectivo"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Depósitos en Cheque
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={transAlertaMonitoreo.depositoCheque}
                      onClick={() =>
                        handleChange2(
                          "",
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "depositoCheque"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "depositoCheque"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Transferencias Recibidas Nacionales
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={transAlertaMonitoreo.transRecibidasNacionales}
                      onClick={() =>
                        handleChange2(
                          "",
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "transRecibidasNacionales"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "transRecibidasNacionales"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Transferencias Recibidas del Exterior
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      onClick={() =>
                        handleChange2(
                          "",
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "transRecibidasExt"
                        )
                      }
                      value={transAlertaMonitoreo.transRecibidasExt}
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setTransAlertaMonitoreo,
                          transAlertaMonitoreo,
                          "transRecibidasExt"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                </ul>
              </section>
              <section className="flex flex-col w-full items-center gap-5">
                <h1 className="fw-bold text-slate-900 bg-slate-500 px-4 py-1 rounded-sm w-[min(90%,700px)] text-center">
                  1.2 indique el número de ROIIS que reportan al organismo de
                  control mensualmente
                </h1>
                <ul className="flex flex-col gap-3 w-full">
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      ROIIS
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      value={ROISS}
                      onClick={() => setROISS("")}
                      required
                      onChange={(e) => setROISS(e.target.value)}
                    />
                  </li>
                </ul>
              </section>
            </>
          )}
          <h1
            onClick={() =>
              handleChange2(
                !menusOpen.baseClientes,
                setMenusOpen,
                menusOpen,
                "baseClientes"
              )
            }
            className="cursor-pointer self-center text-slate-300 fw-bold bg-slate-900 px-4 py-2 rounded-sm w-[min(90%,700px)] text-center"
          >
            2. Base de Clientes
          </h1>
          {menusOpen.baseClientes && (
            <>
              <section className="flex flex-col w-full items-center gap-5">
                <ul className="flex flex-col gap-3 w-full">
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Número total de clientes
                    </label>
                    <input
                      className="no-arrows outline-none w-12 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={NUMBER_LIMIT}
                      required
                      value={baseClientes.numTotalClientes}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "numTotalClientes"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "numTotalClientes"
                        )
                      }
                    />
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Personas Naturales
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.persoNaturales}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "persoNaturales"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "persoNaturales"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Personas Jurídicas
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.persoJuridicas}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "persoJuridicas"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "persoJuridicas"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                </ul>
              </section>
              <section className="flex flex-col w-full items-center gap-5">
                <h1 className="fw-bold text-slate-900 bg-slate-500 px-4 py-1 rounded-sm w-[min(90%,700px)] text-center">
                  Actividad Económica de Clientes
                </h1>
                <ul className="flex flex-col gap-3 w-full">
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Entidades Financieras
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.entidadesFinancieras}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "entidadesFinancieras"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "entidadesFinancieras"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Entidades del Estado
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.entidadesEstado}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "entidadesEstado"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "entidadesEstado"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Entidades Corporativas
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.entidadesCorporativas}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "entidadesCorporativas"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "entidadesCorporativas"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      No residentes (clientes que no se encuentran domiciliados
                      en el país)
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.noResidentes}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "noResidentes"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "noResidentes"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Extranjeros
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.extranjeros}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "extranjeros"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "extranjeros"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Fabricantes o comercializadores de armas
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.fabricantesComercianesArmas}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "fabricantesComercianesArmas"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "fabricantesComercianesArmas"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Remesadoras
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.remesadoras}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "remesadoras"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "remesadoras"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      Fundaciones y ONGs
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.fundacionesONGs}
                      onClick={() =>
                        handleChange2(
                          "",
                          setBaseClientes,
                          baseClientes,
                          "fundacionesONGs"
                        )
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "fundacionesONGs"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      PEPs
                    </label>
                    <input
                      className="no-arrows outline-none w-8 h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                      type="number"
                      name="activos"
                      id="activos"
                      min={0}
                      max={100}
                      required
                      value={baseClientes.PEPs}
                      onClick={() =>
                        handleChange2("", setBaseClientes, baseClientes, "PEPs")
                      }
                      onChange={(e) =>
                        handleChange2(
                          e.target.value,
                          setBaseClientes,
                          baseClientes,
                          "PEPs"
                        )
                      }
                    />
                    <span>%</span>
                  </li>
                </ul>
              </section>
              <section className="flex flex-col w-full items-center gap-5">
                <h1 className="fw-bold text-slate-900 bg-slate-500 px-4 py-1 rounded-sm w-[min(90%,700px)] text-center">
                  2.1 Indique los cinco clientes con mayor nivel transaccional y
                  describa sus actividades económicas.
                </h1>
                <table className="w-full lg:w-10/12">
                  <thead className="w-full ">
                    <tr className="grid grid-cols-[30px_repeat(3,1fr)] gap-1 ">
                      <th className="fw-regular bg-sky-800 text-center">n</th>
                      <th className="fw-regular bg-sky-800">
                        Número de Identificación
                      </th>
                      <th className="fw-regular bg-sky-800">Nombre Cliente</th>
                      <th className="fw-regular bg-sky-800">
                        Actividad Principal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full flex flex-col gap-1 ">
                    {clientesMayorIngreso &&
                      clientesMayorIngreso.map((value, i) => {
                        return (
                          <tr
                            key={i}
                            className="grid grid-cols-[30px_repeat(3,1fr)] gap-1 text-slate-900"
                          >
                            <td className="px-1 py-[2px] bg-slate-300 text-center">
                              {i + 1}
                            </td>
                            <td>
                              <input
                                required
                                className="w-full outline-none px-1 py-[2px] no-arrows bg-slate-300"
                                type="number"
                                placeholder="111111111-1"
                                value={value["CI"]}
                                onChange={(e) =>
                                  handleChange(
                                    e.target.value,
                                    i,
                                    setClientesMayorIngreso,
                                    clientesMayorIngreso,
                                    "CI"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                required
                                className="w-full outline-none px-1 py-[2px] no-arrows bg-slate-300"
                                type="text"
                                placeholder="Nombre"
                                value={value["nombreCliente"]}
                                onChange={(e) =>
                                  handleChange(
                                    e.target.value,
                                    i,
                                    setClientesMayorIngreso,
                                    clientesMayorIngreso,
                                    "nombreCliente"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                required
                                className="w-full outline-none px-1 py-[2px] no-arrows bg-slate-300"
                                type="text"
                                placeholder="Actividad"
                                value={value["actividadPrincipal"]}
                                onChange={(e) =>
                                  handleChange(
                                    e.target.value,
                                    i,
                                    setClientesMayorIngreso,
                                    clientesMayorIngreso,
                                    "actividadPrincipal"
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </section>
              <section className="flex flex-col w-full items-center gap-5">
                <h1 className="fw-bold text-slate-900 bg-slate-500 px-4 py-1 rounded-sm w-[min(90%,700px)] text-center">
                  Riesgo De Clientes
                </h1>
                <ul className="flex flex-col gap-3 w-3/4 md:w-11/12 lg:w-4/5">
                  <li className="w-full px-2 gap-1 flex flex-row text-slate-100 rounded-md items-center">
                    <label className="w-3/4 text-left" htmlFor="activos">
                      ¿La entidad ha clasificado su base de clientes por Riesgo
                      de PLA?
                    </label>
                    <div className="h-6 w-1/4 flex justify-center">
                      <input
                        className="outline-none  h-full w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                        type="checkbox"
                        name="activos"
                        id="activos"
                        checked={riesgoPLA}
                        onChange={(e) => setRiesgoPLA(e.target.checked)}
                      />
                    </div>
                  </li>
                  {riesgoPLA && (
                    <li className="w-full px-2 gap-1 flex flex-col sm:flex-row  text-slate-100 rounded-md items-center">
                      <label
                        className="w-3/4 text-center sm:text-left"
                        htmlFor="activos"
                      >
                        Detalle el Porcentaje de Clientes por riesgo
                      </label>
                      <ul className="flex flex-col gap-2 p-1 w-full sm:w-1/4">
                        <li className="grid grid-cols-[5fr_5fr_1fr] gap-1 w-full justify-center">
                          <label className="w-2/3" htmlFor="">
                            Bajo
                          </label>
                          <div className="flex justify-end w-full">
                            <input
                              className="text-left no-arrows outline-none h-6 w-8 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                              type="number"
                              name="activos"
                              id="activos"
                              min={0}
                              max={100}
                              required
                              value={riesgoPLADetalle.bajo}
                              onClick={() =>
                                handleChange2(
                                  "",
                                  setRiesgoPLADetalle,
                                  riesgoPLADetalle,
                                  "bajo"
                                )
                              }
                              onChange={(e) =>
                                handleChange2(
                                  e.target.value,
                                  setRiesgoPLADetalle,
                                  riesgoPLADetalle,
                                  "bajo"
                                )
                              }
                            />
                          </div>
                          <span>%</span>
                        </li>
                        <li className="grid grid-cols-[5fr_5fr_1fr] gap-1 w-full justify-center">
                          <label className="w-2/3" htmlFor="">
                            Medio
                          </label>
                          <div className="flex justify-end w-full">
                            <input
                              className="text-left no-arrows outline-none h-6 w-8 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                              type="number"
                              name="activos"
                              id="activos"
                              min={0}
                              max={100}
                              required
                              value={riesgoPLADetalle.medio}
                              onClick={() =>
                                handleChange2(
                                  "",
                                  setRiesgoPLADetalle,
                                  riesgoPLADetalle,
                                  "medio"
                                )
                              }
                              onChange={(e) =>
                                handleChange2(
                                  e.target.value,
                                  setRiesgoPLADetalle,
                                  riesgoPLADetalle,
                                  "medio"
                                )
                              }
                            />
                          </div>
                          <span>%</span>
                        </li>
                        <li className="grid grid-cols-[5fr_5fr_1fr] gap-1 w-full justify-center">
                          <label className="w-2/3" htmlFor="">
                            Alto
                          </label>
                          <div className="flex justify-end w-full">
                            <input
                              className="text-left no-arrows outline-none h-6 w-8 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100"
                              type="number"
                              name="activos"
                              id="activos"
                              min={0}
                              max={100}
                              required
                              value={riesgoPLADetalle.alto}
                              onClick={() =>
                                handleChange2(
                                  "",
                                  setRiesgoPLADetalle,
                                  riesgoPLADetalle,
                                  "alto"
                                )
                              }
                              onChange={(e) =>
                                handleChange2(
                                  e.target.value,
                                  setRiesgoPLADetalle,
                                  riesgoPLADetalle,
                                  "alto"
                                )
                              }
                            />
                          </div>
                          <span>%</span>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </section>
            </>
          )}
          <h1
            onClick={() =>
              handleChange2(
                !menusOpen.corresponsales,
                setMenusOpen,
                menusOpen,
                "corresponsales"
              )
            }
            className="cursor-pointer self-center text-slate-300 fw-bold bg-slate-900 px-4 py-2 rounded-sm w-[min(90%,700px)] text-center"
          >
            3. Corresponsales
          </h1>
          {menusOpen.corresponsales && (
            <>
              <section className="flex flex-col w-full items-center gap-5">
                <ul className="flex flex-col gap-3 w-full">
                  <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                    <label className="w-[min(540px,85%)]" htmlFor="activos">
                      ¿Ofrece servicios financieros a otras entidades
                      financieras?
                    </label>
                    <input
                      className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                      type="checkbox"
                      name="activos"
                      id="activos"
                      checked={corresponsales.ofreceServFinancieros}
                      onChange={(e) =>
                        handleChange2(
                          e.target.checked,
                          setCorresponsales,
                          corresponsales,
                          "ofreceServFinancieros"
                        )
                      }
                    />
                  </li>
                  {corresponsales.ofreceServFinancieros && (
                    <>
                      <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                        <label className="w-[min(540px,85%)]" htmlFor="activos">
                          Cuentas de Depósito
                        </label>
                        <input
                          className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                          type="checkbox"
                          name="activos"
                          id="activos"
                          // value={activos}
                          checked={corresponsales.cuentasDeposito}
                          onChange={(e) =>
                            handleChange2(
                              e.target.checked,
                              setCorresponsales,
                              corresponsales,
                              "cuentasDeposito"
                            )
                          }
                        />
                      </li>
                      <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                        <label className="w-[min(540px,85%)]" htmlFor="activos">
                          Transferencias del/al exterior
                        </label>
                        <input
                          className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                          type="checkbox"
                          name="activos"
                          id="activos"
                          checked={corresponsales.transExterior}
                          onChange={(e) =>
                            handleChange2(
                              e.target.checked,
                              setCorresponsales,
                              corresponsales,
                              "transExterior"
                            )
                          }
                        />
                      </li>
                      <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                        <label className="w-[min(540px,85%)]" htmlFor="activos">
                          Compensación de cheques del exterior
                        </label>
                        <input
                          className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                          type="checkbox"
                          name="activos"
                          id="activos"
                          checked={corresponsales.compensacionChequesExterior}
                          onChange={(e) =>
                            handleChange2(
                              e.target.checked,
                              setCorresponsales,
                              corresponsales,
                              "compensacionChequesExterior"
                            )
                          }
                        />
                      </li>
                      <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                        <label className="w-[min(540px,85%)]" htmlFor="activos">
                          Custodia
                        </label>
                        <input
                          className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                          type="checkbox"
                          name="activos"
                          id="activos"
                          checked={corresponsales.custodia}
                          onChange={(e) =>
                            handleChange2(
                              e.target.checked,
                              setCorresponsales,
                              corresponsales,
                              "custodia"
                            )
                          }
                        />
                      </li>
                      <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                        <label className="w-[min(540px,85%)]" htmlFor="activos">
                          ¿La entidad mantiene cuentas en otras entidades
                          financieras?
                        </label>
                        <input
                          className="outline-none  h-6 w-6 cursor-pointer bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                          type="checkbox"
                          name="activos"
                          id="activos"
                          checked={
                            corresponsales.cuentasEnOtrasEntidadesFinancieras
                          }
                          onChange={(e) =>
                            handleChange2(
                              e.target.checked,
                              setCorresponsales,
                              corresponsales,
                              "cuentasEnOtrasEntidadesFinancieras"
                            )
                          }
                        />
                      </li>
                      {corresponsales.cuentasEnOtrasEntidadesFinancieras && (
                        <li className="w-full p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                          <label
                            className="w-[min(485px,73%)]"
                            htmlFor="activos"
                          >
                            ¿Qué tipo de entidades son?
                          </label>
                          <select
                            onChange={(e) =>
                              handleChange2(
                                e.target.value,
                                setCorresponsales,
                                corresponsales,
                                "tipoEntidad"
                              )
                            }
                            className="w-20 bg-slate-700 outline-none rounded-sm "
                          >
                            <option value={"locales"}>Locales</option>
                            <option value={"exterior"}>Exterior</option>
                          </select>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </section>
            </>
          )}
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
              <p>{JSON.stringify(preview, null, "\t")}</p>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Form4;

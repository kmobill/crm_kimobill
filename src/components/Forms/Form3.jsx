import { useEffect, useRef, useState } from "react";
import simpleAlert from "../../utils/Alerts";
import Modal from "../Modal/Modal";
const NUMBER_LIMIT = 1000000000000000;
const NUMBER_MIN = 1;
const Form3 = ({ getData, setter, i, dataDB }) => {
  const form3 = useRef(null);
  const [activos, setActivos] = useState(0);
  const [pasivos, setPasivos] = useState(0);
  const [patrimonio, setPatrimonio] = useState(0);

  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [utilidadPerdida, setUtilidadPerdida] = useState(0);

  const [preview, setPreview] = useState({});
  const handleDataFromDB = (data) => {
    // console.log("data--------", data);
    if (data) {
      setActivos(data?.balanceGeneral?.activos || 0);
      setPasivos(data?.balanceGeneral?.pasivos || 0);
      setPatrimonio(data?.balanceGeneral?.patrimonio || 0);
      setIngresos(data?.estadoPerdidaGanancias?.ingresos || 0);
      setGastos(data?.estadoPerdidaGanancias?.gastos || 0);
      setUtilidadPerdida(data?.estadoPerdidaGanancias?.utilidadPerdida || 0);
    }
  };
  useEffect(() => handleDataFromDB(dataDB), []);

  const handleSave = () => {
    form3.current.reportValidity();
    if (form3.current.checkValidity()) {
      getData(
        {
          balanceGeneral: { activos, pasivos, patrimonio },
          estadoPerdidaGanancias: { ingresos, gastos, utilidadPerdida },
        },
        setter,
        i
      );
      simpleAlert("¡Se ha guardado correctamente!", "success", "¡Exito!");
    }
  };
  const handlePreview = () => {
    setPreview({
      balanceGeneral: { activos, pasivos, patrimonio },
      estadoPerdidaGanancias: { ingresos, gastos, utilidadPerdida },
    });
  };
  useEffect(() => {
    setPatrimonio(activos - pasivos);
  }, [activos, pasivos]);

  useEffect(() => {
    setUtilidadPerdida(ingresos - gastos);
  }, [ingresos, gastos]);
  useEffect(() => console.log(dataDB), [dataDB]);

  /* useEffect(() => {
    setBalanceGeneral((old) => ({
      ...old,
      patrimonio: old.activos - old.pasivos,
    }));
  }, [balanceGeneral]); */

  return (
    <div>
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-900 font-semibold text-center text-xl">
          Parte 3. Situación financiera
        </h1>
        <form ref={form3} id="formPart3" className="flex flex-col gap-8">
          <section className="flex flex-col w-full items-center gap-5">
            <h1 className="text-slate-900 px-4 py-1 text-xl font-medium rounded-sm w-[min(90%,700px)] text-center">
              Balance General
            </h1>
            <section className="w-full text-slate-800 text-base font-medium">
              <div className="p-1 gap-1 flex flex-row justify-center rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="activos">
                  Activos
                </label>
                <input
              // className="outline-none max-w-[320px]max-h-6  border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-700"
                
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"
                  type="number"
                  name="activos"
                  id="activos"
                  min={NUMBER_MIN}
                  max={NUMBER_LIMIT}
                  required
                  value={activos}
                  onChange={(e) => setActivos(parseInt(e.target.value))}
                />
              </div>

              <div className="p-1 gap-1 flex flex-row justify-center text-slate-900 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="pasivos">
                  Pasivos
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"

                  // className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"
                  // className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"

                  type="number"
                  name="pasivos"
                  id="pasivos"
                  min={NUMBER_MIN}
                  max={NUMBER_LIMIT}
                  required
                  value={pasivos}
                  onChange={(e) => setPasivos(parseInt(e.target.value))}
                />
              </div>
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-900 rounded-md items-center">
                <label
                  className="w-1/2 max-w-[120px]"
                  htmlFor="grupo_económico"
                >
                  Patrimonio
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"
                  type="number"
                  name="razon_social"
                  id="razon_social"
                  min={NUMBER_MIN}
                  max={NUMBER_LIMIT}
                  required
                  readOnly
                  value={patrimonio}
                />
              </div>
            </section>
          </section>
          <section className="flex flex-col w-full items-center gap-5 text-slate-800 text-base font-medium">
            <h1 className="text-slate-900  px-4 py-1 text-xl font-medium rounded-sm w-[min(90%,700px)] text-center">
              Estado de Perdidas y Ganancias
            </h1>
            <section className="w-full">
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-900 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="ingresos">
                  Ingresos
                </label>
                <input
                  // className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"

                  type="number"
                  name="ingresos"
                  id="ingresos"
                  min={NUMBER_MIN}
                  max={NUMBER_LIMIT}
                  required
                  value={ingresos}
                  onChange={(e) => setIngresos(parseInt(e.target.value))}
                />
              </div>

              <div className="p-1 gap-1 flex flex-row justify-center text-slate-900 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="gastos">
                  Gastos
                </label>
                <input
                  // className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"

                  type="number"
                  name="gastos"
                  id="gastos"
                  min={NUMBER_MIN}
                  max={NUMBER_LIMIT}
                  required
                  value={gastos}
                  onChange={(e) => setGastos(parseInt(e.target.value))}
                />
              </div>
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-900 rounded-md items-center">
                <label
                  className="w-1/2 max-w-[120px]"
                  htmlFor="utilidad-perdida"
                >
                  Utilidad Perdida
                </label>
                <input
                  // className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 border-[1px] border-[#0979af] rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-900 text-right"

                  type="number"
                  name="utilidad-perdida"
                  id="utilidad-perdida"
                  min={NUMBER_MIN}
                  max={NUMBER_LIMIT}
                  required
                  readOnly
                  value={utilidadPerdida}
                />
              </div>
            </section>
          </section>
        </form>
        
        <div className=" w-[240px] lg:w-2/4 grid lg:grid-cols-[repeat(2,minmax(210px,1fr))] text-base py-5 gap-4 self-center">
        {/* <div  className="w-4/5 lg:w-3/5 grid md:grid-cols-[repeat(2,minmax(210px,1fr))] py-5 gap-4 self-center"> */}
          <button
            className="bg-[#0066cb] text-slate-300 rounded-md hover:scale-105 ease-in-out duration-150 h-11"

            // className="bg-slate-500 text-slate-300 rounded-md text-xl hover:scale-105 ease-in-out duration-150"
            onClick={(e) => handleSave(e)}
          >
            Guardar esta Sección
          </button>
          <Modal buttonText="Vista Previa" parentFunction={handlePreview}>
            <div>
              <h1 className="italic text-2xl text-center">
                Vista previa Parte 3
              </h1>
              <p>{JSON.stringify(preview, null, "\t")}</p>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Form3;

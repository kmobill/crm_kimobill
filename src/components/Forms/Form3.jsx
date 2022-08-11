import { useEffect, useState } from "react";
const NUMBER_LIMIT = 100000;
const Form3 = ({ callback }) => {
  const [activos, setActivos] = useState(0);
  const [pasivos, setPasivos] = useState(0);
  const [patrimonio, setPatrimonio] = useState(0);

  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [utilidadPerdida, setUtilidadPerdida] = useState(0);

  const handleSave = () => {
    callback({
      balanceGeneral: {activos,pasivos,patrimonio},
      estadoPerdidaGanancias: {ingresos,gastos,utilidadPerdida}
    });
  };
  useEffect(() => {
    setPatrimonio(activos - pasivos);
  }, [activos, pasivos]);

  useEffect(() => {
    setUtilidadPerdida(ingresos - gastos);
  }, [ingresos, gastos]);

  /* useEffect(() => {
    setBalanceGeneral((old) => ({
      ...old,
      patrimonio: old.activos - old.pasivos,
    }));
  }, [balanceGeneral]); */

  return (
    <div>
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 3 Situación financiera
        </h1>
        <form className="flex flex-col gap-8">
          <section className="flex flex-col w-full items-center gap-5">
            <h1 className="text-white bg-slate-900 px-4 py-2 rounded-sm w-[min(90%,270px)] text-center">
              Balance General
            </h1>
            <section className="w-full">
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="activos">
                  Activos
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                  type="number"
                  name="activos"
                  id="activos"
                  min={0}
                  max={NUMBER_LIMIT}
                  required
                  value={activos}
                  onChange={(e) => setActivos(parseInt(e.target.value))}
                />
              </div>

              <div className="p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="pasivos">
                  Pasivos
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                  type="number"
                  name="pasivos"
                  id="pasivos"
                  min={0}
                  max={NUMBER_LIMIT}
                  required
                  value={pasivos}
                  onChange={(e) => setPasivos(parseInt(e.target.value))}
                />
              </div>
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                <label
                  className="w-1/2 max-w-[120px]"
                  htmlFor="grupo_económico"
                >
                  Patrimonio
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                  type="number"
                  name="razon_social"
                  id="razon_social"
                  min={0}
                  max={NUMBER_LIMIT}
                  required
                  readOnly
                  value={patrimonio}
                />
              </div>
            </section>
          </section>
          <section className="flex flex-col w-full items-center gap-5">
            <h1 className="text-white bg-slate-900 px-4 py-2 rounded-sm w-[min(90%,270px)] text-center">
              Estado de Perdidas y Ganancias
            </h1>
            <section className="w-full">
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="ingresos">
                  Ingresos
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                  type="number"
                  name="ingresos"
                  id="ingresos"
                  min={0}
                  max={NUMBER_LIMIT}
                  required
                  value={ingresos}
                  onChange={(e) => setIngresos(parseInt(e.target.value))}
                />
              </div>

              <div className="p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                <label className="w-1/2 max-w-[120px]" htmlFor="gastos">
                  Gastos
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                  type="number"
                  name="gastos"
                  id="gastos"
                  min={0}
                  max={NUMBER_LIMIT}
                  required
                  value={gastos}
                  onChange={(e) => setGastos(parseInt(e.target.value))}
                />
              </div>
              <div className="p-1 gap-1 flex flex-row justify-center text-slate-100 rounded-md items-center">
                <label
                  className="w-1/2 max-w-[120px]"
                  htmlFor="utilidad-perdida"
                >
                  Utilidad Perdida
                </label>
                <input
                  className="no-arrows outline-none w-1/2 max-w-[320px] max-h-6 bg-slate-600  rounded-md px-1 shadow-[0_0_10px_-6px_rgba(255,255,255,0.9)] text-slate-100 text-right"
                  type="number"
                  name="utilidad-perdida"
                  id="utilidad-perdida"
                  min={0}
                  max={NUMBER_LIMIT}
                  required
                  readOnly
                  value={utilidadPerdida}
                />
              </div>
            </section>
          </section>
        </form>
        <div className="w-full flex flex-col md:flex-row justify-center items-center py-5 gap-2">
          <button
            className="bg-slate-500 text-slate-300 w-[min(80%,300px)] md:w-[min(40%,250px)] rounded-md py-1 text-xl"
            onClick={() => handleSave()}
          >
            Guardar esta Sección
          </button>
          <button
            className="bg-slate-500 text-slate-300 w-[min(80%,300px)] md:w-[min(40%,250px)] rounded-md py-1 text-xl"
            onClick={() => handleSave()}
          >
            Vista Previa
          </button>
        </div>
      </section>
    </div>
  );
};

export default Form3;

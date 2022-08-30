import React, { useEffect, useRef, useState } from "react";
import simpleAlert from "../../utils/Alerts";
import Modal from "../Modal/Modal";
import document2 from "../../assets/icons/document2.png";

const FormFiles = ({ callbackfiles, setter, dataDB }) => {
  const formFile = useRef(null);
  const [files, setfiles] = useState([]);
  const [preview, setPreview] = useState({});

  const handleSaveFiles = (value, key) => {
    const formData = new FormData();
    formData.append(`file-${key}`, value);
    const temp = [...files];
    temp[key] = value;
    console.log("fileeeeeeeeeeeeeeeeeeeeee", formData.getAll(`file-${key}`));
    console.log("fileeeeeeeeeeeeeeeeeeeeee2", temp[key]);
    setfiles(temp);
  };

  const handleSave = () => {
    formFile.current.reportValidity();
    if (formFile.current.checkValidity()) {
      callbackfiles(files, setter);
      simpleAlert("¡Se ha guardado correctamente!", "success", "¡Exito!");
    }
  };
  const handlePreview = () => {
    setPreview({
      /* file1: {
        lastModifiedDate: files.file1.lastModifiedDate,
        name: files.file1.name,
        size: files.file1.size,
        type: files.file1.type,
      },
      file2: {
        lastModifiedDate: files.file2.lastModifiedDate,
        name: files.file2.name,
        size: files.file2.size,
        type: files.file2.type,
      }, */
    });
  };
  useEffect(() => {
    console.log("cambio en files");
    for (const value of files.values()) {
      console.log(value);
    }
  }, [files]);
  useEffect(() => console.log(dataDB), [dataDB]);

  return (
    <div className="fw-regular">
      <div>
        <button onClick={() => console.log(files)}>show files</button>
      </div>
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 7. Carga de Archivos de respaldo
        </h1>
        <form
          ref={formFile}
          className="self-center w-full md:w-3/4 text-slate-400 flex flex-col gap-7"
        >
          <div className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-slate-900 text-slate-400 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
            <h1>
              Copia de la calificación del Oficial de Cumplimiento ante la UAFE:
            </h1>
            <label
              htmlFor="inputCalificacionUAFE"
              className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out"
            >
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputCalificacionUAFE"
                type="file"
                onChange={(e) => handleSaveFiles(e.target.files[0], 0)}
                // accept="image/png, image/jpeg"
                required
              />
            </label>
          </div>
          <div className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-slate-900 text-slate-400 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
            <h1>
              Copia del Certificado de Cumplimiento de Obligaciones ante la UAFE
            </h1>
            <label
              htmlFor="inputCumplimientoUAFE"
              className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out"
            >
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputCumplimientoUAFE"
                type="file"
                onChange={(e) => handleSaveFiles(e.target.files[0], 1)}
                // accept="image/png, image/jpeg"
                required
              />
            </label>
          </div>
        </form>
        <div className="w-4/5 lg:w-3/5 grid md:grid-cols-[repeat(2,minmax(210px,1fr))] py-5 gap-4 self-center">
          <button
            className="bg-slate-500 text-slate-300 rounded-md text-xl hover:scale-105 ease-in-out duration-150"
            onClick={() => handleSave()}
          >
            Guardar esta Sección
          </button>
          <Modal buttonText="Vista Previa" parentFunction={handlePreview}>
            <div className="w-full">
              <h1 className="italic text-2xl text-center">
                Vista previa Archivos subidos
              </h1>
              <div className="w-full grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1 bg-slate-900 p-3 rounded-md">
                  <h1 className="bg-slate-800 p-1 text-center">File 1</h1>
                  {preview.file1 &&
                    Object.entries(preview.file1).map((item, key) => (
                      <div key={key} className="flex flex-row gap-2">
                        <h1>{JSON.stringify(item[0], null, "\t")}:</h1>
                        <p>{JSON.stringify(item[1], null, "\t")}</p>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col gap-1 bg-slate-900 p-3 rounded-md">
                  <h1 className="bg-slate-800 p-1 text-center">File 2</h1>
                  {preview.file2 &&
                    Object.entries(preview.file2).map((item, key) => (
                      <div key={key} className="flex flex-row gap-2">
                        <h1>{JSON.stringify(item[0], null, "\t")}:</h1>
                        <p>{JSON.stringify(item[1], null, "\t")}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default FormFiles;

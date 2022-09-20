import React, { useEffect, useRef, useState } from "react";
import simpleAlert from "../../utils/Alerts";
import Modal from "../Modal/Modal";
import document2 from "../../assets/icons/document2.png";
import { sendFiles, getFilesNames } from "../../services/fileMethods";
const FormFiles = ({ callbackfiles, setter, dataDB }) => {
  const formFile = useRef(null);
  const [filesSeps, setfilesSeps] = useState([]);
  const [filesMC, setfilesMC] = useState([]);
  const [filesKM, setfilesKM] = useState([]);

  function handleSavefiles(files, folder) {
    const token = sessionStorage.getItem("token");
    const data = new FormData();
    Object.keys(files).forEach((key) => {
      data.append(files.item(key).name, files.item(key));
    });
    sendFiles(token, data, folder);
  }

  const createViewFiles = () => {
    const files2 = {
      "Documentos Seps": [...filesSeps],
      "Documentos Master Card": [...filesMC],
      "Documentos Kimobill": [...filesKM],
    };
    const files = [...filesSeps, ...filesMC, ...filesKM];
    console.log(files);
    let content = "";
    Object.keys(files2).forEach((key) => {
      content += `<section>
      <h1>${key}</h1>
      `;
      console.log(files2[key]);
      files2[key].forEach((file) => {
        content += `
        <div>
          <h1>Nombre: ${file.name}</h1>
          <h1>Peso: ${file.size / 1024 / 1000}</h1>
          <h1>Tipo: ${file.type}</h1>
          <h1>Ultima modificación ${file.lastModifiedDate}</h1>
        </div>
      `;
      });
      content += "</section>";
    });
    // files.forEach((file) => {
    //   content += `
    //   <div>
    //     <h1>Nombre: ${file.name}</h1>
    //     <h1>Peso: ${file.size / 1024 / 1000}</h1>
    //     <h1>Tipo: ${file.type}</h1>
    //     <h1>Ultima modificación ${file.lastModifiedDate}</h1>
    //   </div>
    //   `;
    // });
    document.getElementById("content-modal").innerHTML = content;
  };
  const handlePreview = () => {};
  useEffect(() => {
    console.log(
      "______________________________cambio en files________________________________"
    );
    // console.log(filesKM, filesMC, filesSeps);
    createViewFiles();
  }, [filesKM, filesMC, filesSeps]);

  useEffect(() => console.log({ filesKM }), [filesKM]);
  useEffect(() => console.log({ filesMC }), [filesMC]);
  useEffect(() => console.log({ filesSeps }), [filesSeps]);

  return (
    <div className="fw-regular">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-300 text-center italic text-lg">
          Parte 7. Carga de Archivos de respaldo
        </h1>
        <form
          ref={formFile}
          className="self-center w-full md:w-3/4 text-slate-400 flex flex-col gap-7"
        >
          <div className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-slate-900 text-slate-400 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
            <h1>Documentos adjuntos SEPS</h1>
            <label
              htmlFor="inputSEPS"
              className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out"
            >
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputSEPS"
                type="file"
                name="datatest"
                // onChange={(e) => handleSaveFiles(e.target.files, setfilesSeps)}
                onChange={(e) => {
                  setfilesSeps(e.target.files);
                }}
                // accept="image/png, image/jpeg"
                required
                multiple
              />
            </label>
          </div>

          <div className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-slate-900 text-slate-400 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
            <h1>Documentos adjuntos Master Card</h1>
            <label
              htmlFor="inputMC"
              className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out"
            >
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputMC"
                type="file"
                onChange={(e) => {
                  setfilesMC(e.target.files);
                }}
                // accept="image/png, image/jpeg"
                required
                multiple
              />
            </label>
          </div>
          <div className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-slate-900 text-slate-400 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
            <h1>Documentos adjuntos Kimobill</h1>
            <label
              htmlFor="inputKM"
              className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out"
            >
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputKM"
                type="file"
                multiple
                onChange={(e) => {
                  setfilesKM(e.target.files);
                }}
                // accept="image/png, image/jpeg"
                required
              />
            </label>
          </div>
        </form>
        <div className=" w-[240px] lg:w-3/4 grid lg:grid-cols-[repeat(3,minmax(210px,1fr))] text-base py-5 gap-4 self-center">
          <button
            className="bg-slate-500 text-slate-300 rounded-md hover:scale-105 ease-in-out duration-150"
            onClick={() => {
              handleSavefiles(filesSeps, "SEPS");
              handleSavefiles(filesKM, "KMB");
              handleSavefiles(filesMC, "MC");
            }}
          >
            Guardar esta Sección
          </button>
          <button
            className="bg-slate-500 text-slate-300 rounded-md hover:scale-105 ease-in-out duration-150"
            onClick={async () =>
              console.log(await getFilesNames(sessionStorage.getItem("token")))
            }
          >
            Archivos cargados
          </button>
          <Modal buttonText="Vista Previa" parentFunction={handlePreview}>
            <div
              id="content-modal"
              className="w-[90%] m-auto flex flex-row gap-5"
            ></div>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default FormFiles;

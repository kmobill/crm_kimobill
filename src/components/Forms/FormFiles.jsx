import React, { useEffect, useRef, useState } from "react";
import simpleAlert, { confirmAlertCallback } from "../../utils/Alerts";
import Modal from "../Modal/Modal";
import document2 from "../../assets/icons/document2.png";
import {
  sendFiles,
  getFilesNames,
  deleteFiles,
} from "../../services/fileMethods";
const FormFiles = ({ callbackfiles, setter, dataDB }) => {
  const tokenUser = sessionStorage.getItem("token");
  const formFile = useRef(null);
  const [filesSeps, setfilesSeps] = useState([]);
  const [filesMC, setfilesMC] = useState([]);
  const [filesKMB, setfilesKMB] = useState([]);
  const [filesDB, setfilesDB] = useState([]);

  function handlePromisesFiles(promises = []) {
    Promise.all(promises)
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUploadFiles(files, folder) {
    const token = sessionStorage.getItem("token");
    const data = new FormData();
    Object.keys(files).forEach((key) => {
      data.append(files.item(key).name, files.item(key));
    });
    sendFiles(token, data, folder).then((res) => {
      if (res.status === 200) {
        simpleAlert("Se guardaron los archivos con exito", "success", "Exito");
        getFilesFromDB();
      } else {
        simpleAlert("No se pudieron guardar los Archivos", "error", "Fallo");
      }
    });
  }
  // function handleDeleteFilesNoUpload(files, folder, container, setContainer) {
  //   const temp = { ...container };
  //   if (temp[folder]) {
  //     temp[folder] = temp[folder].filter((file) => !files.includes(file));
  //     setContainer(temp);
  //   }
  // }
  function handleDeleteFilesNoUpload(name, folder, container, setContainer) {
    const dt = new DataTransfer();
    const test = [...container].filter((file) => file.name !== name);
    test.forEach((file) => dt.items.add(file));
    setContainer(dt.files);
  }
  function handleDeleteFilesUploads(name, folder) {
    console.log(name, folder);
    console.log(typeof name, typeof folder);

    confirmAlertCallback(
      {
        title: "Eliminar",
        message: `¿Seguro que quiere eliminar: ${name} de la carpeta: ${folder}?`,
        typeOfAlert: "warning",
        button: "Eliminar",
      },
      {
        title: "Eliminado",
        message: `Se elimino el archivo: ${name} de la carpeta: ${folder} con exito`,
        typeOfAlert: "success",
        button: "Ok",
      },
      {
        title: "Error",
        message: `No se pudo eliminar el archivo: ${name} de la carpeta: ${folder}`,
        typeOfAlert: "error",
        button: "Ok",
      },
      deleteFiles,
      [tokenUser, name, folder],
      getFilesFromDB
    )

    // deleteFiles(tokenUser, name, folder).then((res) => {
    //   if (res.status === 200) {
    //     simpleAlert("Se elimino el archivo con exito", "success", "Exito");
    //     getFilesFromDB();
    //   } else {
    //     simpleAlert("No se pudo eliminar el Archivo", "error", "Fallo");
    //   }
    // });
  }
  function CreateViewFiles() {
    function selectContainer(name) {
      switch (name) {
        case "SEPS":
          return filesSeps;
        case "MC":
          return filesMC;
        case "KMB":
          return filesKMB;
        default:
          return null;
      }
    }
    function selectSetContainer(name) {
      switch (name) {
        case "SEPS":
          return setfilesSeps;
        case "MC":
          return setfilesMC;
        case "KMB":
          return setfilesKMB;
        default:
          return null;
      }
    }
    console.log(filesSeps);
    console.log(filesMC);
    console.log(filesKMB);
    const newFiles = {
      SEPS: [...filesSeps],
      MC: [...filesMC],
      KMB: [...filesKMB],
    };
    console.log(newFiles);
    return (
      <section className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] w-full gap-4 ">
        {Object.keys(newFiles).map((key, i) => {
          console.log(i);
          return (
            <section
              key={i}
              className="p-[0.75rem_0.5rem_0.75rem_0.7rem] bg-gradient-to-l from-sky-600 to-sky-500 text-slate-100 rounded-md"
            >
              <h1 className="font-semibold text-center">{key}</h1>
              <div className="font-medium text-base grid grid-cols-[2fr_1fr_1fr] justify-center gap-2">
                <h1 className="text-left">Archivo</h1>
                <h1 className="text-center">Estado</h1>
                <h1 className="text-center">Eliminar</h1>
              </div>
              {console.log(filesDB)}
              {console.log(key)}
              {console.log(filesDB[key])}
              {filesDB[key]?.map((file, i) => {
                console.log(file);
                return (
                  <div
                    key={i}
                    className="font-normal text-sm grid grid-cols-[2fr_1fr_1fr] justify-center gap-2"
                  >
                    <h1 className="cursor-pointer hover:scale-105 duration-300 hover:text-sky-400 ">
                      {file}
                    </h1>
                    <h1 className="text-center font-semibold text-base text-emerald-500">
                      &#10004;
                    </h1>
                    <h1
                      onClick={() => handleDeleteFilesUploads(file, key)}
                      className="cursor-pointer hover:text-rose-300  text-center font-semibold text-base text-rose-500"
                    >
                      &#10540;
                    </h1>
                  </div>
                );
              })}
              {newFiles[key]?.map((file, i) => {
                console.log(file);
                return (
                  <div
                    key={i}
                    className="font-normal text-sm grid grid-cols-[2fr_1fr_1fr] justify-center gap-2"
                  >
                    <h1 className="cursor-pointer hover:scale-105 duration-300 hover:text-sky-400 ">
                      {file.name}
                    </h1>
                    <h1 className="text-center font-semibold text-base text-amber-500">
                      &#10004;
                    </h1>
                    <h1
                      onClick={() =>
                        handleDeleteFilesNoUpload(
                          file.name,
                          key,
                          selectContainer(key),
                          selectSetContainer(key)
                        )
                      }
                      className="cursor-pointer hover:text-rose-300  text-center font-semibold text-base text-rose-500"
                    >
                      &#10540;
                    </h1>
                  </div>
                );
              })}
            </section>
          );
        })}
      </section>
    );
  }
  function clearInputs() {
    setfilesSeps([]);
    setfilesMC([]);
    setfilesKMB([]);
    formFile.current.reset();
  }
  function getFilesFromDB() {
    const token = sessionStorage.getItem("token");
    if (token) {
      getFilesNames(token)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            alert("Error al obtener los archivos");
          }
        })
        .then((files) => {
          if (files && files.data) {
            setfilesDB(files.data);
          }
        });
    }
  }

  useEffect(() => {
    getFilesFromDB();
  }, []);

  useEffect(() => console.log({ filesKMB }), [filesKMB]);
  useEffect(() => console.log({ filesMC }), [filesMC]);
  useEffect(() => console.log({ filesSeps }), [filesSeps]);

  return (
    <div className="fw-regular">
      <section className="flex flex-col mt-2 gap-1 p-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
        <h1 className="text-slate-900 text-center text-xl font-semibold">
          Parte 7. Carga de Archivos de respaldo
        </h1>
        <form
          ref={formFile}
          className="self-center w-full md:w-3/4 text-slate-400 flex flex-col gap-7"
        >
          <label
            htmlFor="inputSEPS"
            className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-gradient-to-r from-sky-600 to-sky-500 text-slate-100 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)] cursor-pointer duration-200 hover:scale-[1.02] ease-in-out"
          >
            <h1>Documentos adjuntos SEPS</h1>
            <label className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out">
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputSEPS"
                type="file"
                name="datatest"
                onChange={(e) => {
                  setfilesSeps(e.target.files);
                }}
                required
                multiple
              />
            </label>
          </label>

          <label
            htmlFor="inputMC"
            className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-gradient-to-r from-sky-600 to-sky-500 text-slate-100 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)] cursor-pointer duration-200 hover:scale-[1.02] ease-in-out"
          >
            <h1>Documentos adjuntos Master Card</h1>
            <label className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out">
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
          </label>
          <label
            htmlFor="inputKM"
            className="w-full grid grid-cols-[3fr_1fr] sm:grid-cols-[5fr_1fr] justify-center items-center bg-gradient-to-r from-sky-600 to-sky-500 text-slate-100 p-1 sm:p-[5px_20px] rounded-[4px] shadow-[0_15px_25px_rgba(0,0,0,0.6)] cursor-pointer duration-200 hover:scale-[1.02] ease-in-out"
          >
            <h1>Documentos adjuntos Kimobill</h1>
            <label className="flex justify-center items-center cursor-pointer duration-150 hover:scale-105 ease-in-out">
              <img src={document2} className="w-11" />
              <input
                className="hidden"
                id="inputKM"
                type="file"
                multiple
                onChange={(e) => {
                  setfilesKMB(e.target.files);
                }}
                // accept="image/png, image/jpeg"
                required
              />
            </label>
          </label>
        </form>
        <div className=" w-[350px] lg:w-3/4 grid lg:grid-cols-[repeat(2,minmax(210px,1fr))] text-base py-5 gap-4 self-center text-slate-100">
          <button
            className="bg-[#0066cb] h-11 rounded-md hover:scale-105 ease-in-out duration-150"
            onClick={() => {
              // handlePromisesFiles([
              //   handleUploadFiles(filesSeps, "SEPS"),
              //   handleUploadFiles(filesMC, "MC"),
              //   handleUploadFiles(filesKMB, "KM"),
              // ]);
              if (filesSeps.length > 0) {
                handleUploadFiles(filesSeps, "SEPS");
              }
              if (filesMC.length > 0) {
                handleUploadFiles(filesMC, "MC");
              }
              if (filesKMB.length > 0) {
                handleUploadFiles(filesKMB, "KMB");
              }
              clearInputs();
            }}
          >
            Guardar esta Sección
          </button>
          {/* <div onClick={() => CreateViewFilesUpload()}> */}
          <Modal buttonText="Archivos cargados">
            {/* <div className="w-full" id="content-files-upload"></div> */}
            <CreateViewFiles />
          </Modal>
          {/* </div> */}
        </div>
      </section>
    </div>
  );
};

export default FormFiles;

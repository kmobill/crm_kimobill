import React from "react";
import Layout from "../components/Layout";
import Form1 from "../components/Forms/Form1";
import Form2 from "../components/Forms/Form2";
import Carousel from "../components/Carousel/Carousel";
import { useState } from "react";
import { useEffect } from "react";
import Form3 from "../components/Forms/Form3";
import Form4 from "../components/Forms/Form4";
import Form5 from "../components/Forms/Form5";
import Form6 from "../components/Forms/Form6";
import FormFiles from "../components/Forms/FormFiles";
import { isObjEmpty } from "../utils/manageObjs";

const FormKYC = () => {
  const token_user = sessionStorage.getItem("token");
  const [dataDB, setDataDB] = useState({});
  const [dataForms, setDataForms] = useState({});
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (newData, setter, key) => {
    setter((oldData) => {
      console.log("111oldData", oldData);
      const temp = { ...oldData }; //guardo el valor anterior de la data
      console.log(temp);
      temp[`${key}`] = newData;
      return temp;
    });
  };
  const getFiles = (files, setter) => {
    setter(files);
  };
  const getDataForms = (token) => {
    setLoading(true);
    fetch("api/dataForms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("se obtuvo la data");
        } else {
          console.log("error, el status es: ", res.status);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.findedData) {
          if (data.findedData?.data) {
            setDataDB(data.findedData.data);
            console.log("databackend", data.findedData.data);
          }
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const sendDataForms = (data, token, files = null) => {
    fetch("/api/dataForms", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        token: token,
        files: files,
      }),
    }).then((res) => {
      if (res.status === 200) {
        getDataForms(token_user); //para obtener la data del backend
        console.log("se actualizo una data previa");
      } else if (res.status === 201) {
        getDataForms(token_user); //para obtener la data del backend
        console.log("se creo una nueva data");
      } else {
        console.log(" el status es: ", res.status);
      }
    });
  };
  useEffect(() => {
    console.log("first render");
    getDataForms(token_user);
  }, []);
  useEffect(() => {
    console.log("render dataForms");
    if (!isObjEmpty(dataForms)) {
      console.log("actualizando data backend");

      console.log("111newData", dataForms);
      sendDataForms(dataForms, token_user, files); //para actualizar la data
      console.log({ token_user });
    }
  }, [dataForms, files]);
  useEffect(() => console.log(files), [files]);
  useEffect(() => console.log(dataDB), [dataDB]);

  return (
    //TODO: a method to delete sub item's values when parent change to false
    <Layout>
      <div className="flex flex-col justify-center">
        <h1 className="text-slate-900 text-center text-4xl mt-4">CUESTIONARIO</h1>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <Carousel
            carouselItems={[
              <div className="w-4/5 lg:w-[800px] m-auto">
                <Form1
                  getData={getData}
                  setter={setDataForms}
                  i={"form1"}
                  dataDB={dataDB?.form1}
                />
              </div>,
              <div className="w-4/5 lg:w-11/12 xl:w-[1100px] 2xl:w-[1200px] m-auto">
                <Form2
                  getData={getData}
                  setter={setDataForms}
                  i={"form2"}
                  dataDB={dataDB?.form2}
                />
              </div>,
              <div className="w-5/6 lg:w-[900px] m-auto  min-h-[420px]">
                <Form3
                  getData={getData}
                  setter={setDataForms}
                  i={"form3"}
                  dataDB={dataDB?.form3}
                />
              </div>,
              <div className="w-5/6 lg:w-[900px] m-auto  min-h-[420px]">
                <Form4
                  getData={getData}
                  setter={setDataForms}
                  i={"form4"}
                  dataDB={dataDB?.form4}
                />
              </div>,
              <div className="w-5/6 lg:w-[950px] m-auto  min-h-[420px]">
                <Form5
                  getData={getData}
                  setter={setDataForms}
                  i={"form5"}
                  dataDB={dataDB?.form5}
                />
              </div>,
              <div className="w-5/6 lg:w-[1200px] m-auto  min-h-[420px]">
                <Form6
                  getData={getData}
                  setter={setDataForms}
                  i={"form6"}
                  dataDB={dataDB?.form6}
                />
              </div>,
              <div className="w-5/6 lg:w-[900px] m-auto  min-h-[420px]">
                <FormFiles
                  callbackfiles={getFiles}
                  setter={setFiles}
                  dataDB={dataDB?.files}
                />
              </div>,
            ]}
          />
        )}
      </div>
    </Layout>
  );
};

export default FormKYC;

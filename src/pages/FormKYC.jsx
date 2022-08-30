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

const FormKYC = () => {
  const token_user = sessionStorage.getItem("token");
  const [dataDB, setDataDB] = useState({});
  const [dataForms, setDataForms] = useState({});
  const [files, setFiles] = useState(null);

  const getData = (newData, setter, key) => {
    setter((oldData) => {
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
    fetch("http://localhost:4000/api/dataForms", {
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
          return res.json();
        } else {
          console.log(" el status es: ", res.status);
        }
      })
      .then((data) => {
        setDataDB(data);
        console.log(data?.testfinded);
      });
  };
  const sendDataForms = (data, token, files = null) => {
    fetch("http://localhost:4000/api/dataForms", {
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
      if (res.status === 204) {
        getDataForms(token_user); //para obtener la data del backend
        console.log("se actualizo una data previa");
      } else if (res.status === 202) {
        getDataForms(token_user); //para obtener la data del backend
        console.log("se creo una nueva data");
      } else {
        console.log(" el status es: ", res.status);
      }
    });
  };
  useEffect(() => {
    //en el rpimer render siempre se borra la data obtenida
    if (dataForms !== {}) {
      sendDataForms(dataForms, token_user, files); //para actualizar la data
      console.log({ token_user });
      console.log({ dataForms });
    }
  }, [dataForms, files]);
  useEffect(() => console.log(files), [files]);

  useEffect(() => {
    getDataForms(token_user);
  }, []);
  return (
    //TODO: a method to delete sub item's values when parent change to false
    <Layout>
      <div className="flex flex-col justify-center bg-slate-800">
        <h1 className="text-slate-200 text-center">
          CUESTIONARIO DE DEBIDA DILIGENCIA PARA ENTIDADES FINANCIERAS
        </h1>
        <Carousel
          carouselItems={[
            <div className="w-4/5 lg:w-[800px] m-auto">
              <Form1
                getData={getData}
                setter={setDataForms}
                i={"form1"}
                dataDB={dataDB?.testfinded}
              />
            </div>,
            <div className="w-4/5 lg:w-11/12 xl:w-[1100px] 2xl:w-[1200px] m-auto">
              <Form2
                getData={getData}
                setter={setDataForms}
                i={"form2"}
                dataDB={dataDB?.testfinded}
              />
            </div>,
            <div className="w-5/6 lg:w-[900px] m-auto  min-h-[420px]">
              <Form3
                getData={getData}
                setter={setDataForms}
                i={"form3"}
                dataDB={dataDB?.testfinded}
              />
            </div>,
            <div className="w-5/6 lg:w-[900px] m-auto  min-h-[420px]">
              <Form4
                getData={getData}
                setter={setDataForms}
                i={"form4"}
                dataDB={dataDB?.testfinded}
              />
            </div>,
            <div className="w-5/6 lg:w-[950px] m-auto  min-h-[420px]">
              <Form5
                getData={getData}
                setter={setDataForms}
                i={"form5"}
                dataDB={dataDB?.testfinded}
              />
            </div>,
            <div className="w-5/6 lg:w-[1200px] m-auto  min-h-[420px]">
              <Form6
                getData={getData}
                setter={setDataForms}
                i={"form6"}
                dataDB={dataDB?.testfinded}
              />
            </div>,
            <div className="w-5/6 lg:w-[900px] m-auto  min-h-[420px]">
              <FormFiles
                callbackfiles={getFiles}
                setter={setFiles}
                dataDB={dataDB?.testfinded}
              />
            </div>,
          ]}
        />
      </div>
    </Layout>
  );
};

export default FormKYC;

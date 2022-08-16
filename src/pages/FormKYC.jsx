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

const FormKYC = () => {
  const [dataForm1, setDataForm1] = useState([]);
  const [dataForm2, setDataForm2] = useState([]);
  const [dataForm3, setDataForm3] = useState([]);
  const [dataForm4, setDataForm4] = useState([]);
  const getDataForm1 = (data) => setDataForm1(data);
  const getDataForm2 = (data) => setDataForm2(data);
  const getDataForm3 = (data) => setDataForm3(data);
  const getDataForm4 = (data) => setDataForm4(data);
  useEffect(() => console.log({ dataForm1 }), [dataForm1]);
  useEffect(() => console.log({ dataForm2 }), [dataForm2]);
  useEffect(() => console.log({ dataForm3 }), [dataForm3]);
  useEffect(() => console.log({ dataForm4 }), [dataForm4]);
  return (
    <Layout>
      <div className="flex flex-col justify-center bg-slate-800">
        <h1 className="text-slate-200 text-center">
          CUESTIONARIO DE DEBIDA DILIGENCIA PARA ENTIDADES FINANCIERAS
        </h1>
        <Carousel
          carouselItems={[
            <div className="w-4/5 lg:w-[800px] m-auto">
              <Form1 callback={getDataForm1} />
            </div>,
            <div className="w-4/5 lg:w-11/12 xl:w-[1100px] 2xl:w-[1200px] m-auto">
              <Form2 callback={getDataForm2} />
            </div>,
            <div className="w-5/6 lg:w-[900px] m-auto  min-h-[400px]">
              <Form3 callback={getDataForm3} />
            </div>,
            <div className="w-5/6 lg:w-[900px] m-auto  min-h-[400px]">
              <Form4 callback={getDataForm4} />
            </div>,
            <div className="w-5/6 lg:w-[900px] m-auto  min-h-[400px]">
              <Form5 callback={getDataForm4} />
            </div>,
          ]}
        />
      </div>
    </Layout>
  );
};

export default FormKYC;

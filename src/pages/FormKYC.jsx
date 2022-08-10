import React from "react";
import Form1 from "../components/Form1";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import Form2 from "../components/Form2";
const FormKYC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center bg-slate-800">
        <h1 className="text-slate-200 text-center">
          CUESTIONARIO DE DEBIDA DILIGENCIA PARA ENTIDADES FINANCIERAS
        </h1>
        <Carousel
          items={[
            <div className="w-3/5 m-auto">
              <Form1 />
            </div>,
            <div className="w-4/5 m-auto">
              <Form2 />
            </div>,
          ]}
          containerItemsStyle="w-full p-[0_0_4rem_0]"
        />
        {/* <div className="w-4/5 sm:h-2/3 md:w-2/3 lg:w-3/5 xl:max-w-[600px] xl:w-2/5">
          <Form1 />
        </div> */}
      </div>
    </Layout>
  );
};

export default FormKYC;

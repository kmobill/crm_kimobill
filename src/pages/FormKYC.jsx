import React from "react";
import Form1 from "../components/Form1";
import Layout from "../components/Layout";

const FormKYC = () => {
  return (
    <Layout>
      <div className="flex justify-center bg-slate-800">
        <div className="w-4/5 sm:h-2/3 md:w-2/3 lg:w-3/5 xl:max-w-[600px] xl:w-2/5">
          <Form1 />
        </div>
      </div>
    </Layout>
  );
};

export default FormKYC;

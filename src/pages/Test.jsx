import React, { useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal/Modal";
import simpleAlert from "../utils/Alerts";
const Test = () => {
  const [first, setfirst] = useState(true);
  const [data, setData] = useState(["dafault value"]);
  const handleChange = (value, i, setfunction, array) => {
    console.log("handleChange");
    const temp = [...array];
    temp[i] = value;
    setfunction(temp);
  };

  return (
    <Layout>
      {/* <div className="h-screen bg-orange-400">
        <Modal>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga</p>
        </Modal>
      </div> */}
      <div>
        <h1>example usestate</h1>
        {first && (
          <div className="bg-black text-slate-300 p-5">
            <h1>esto se abre si first es falso</h1>
            <p>valor de first: {first}</p>
            <p>valor de data -&gt; 0: {data[0]}</p>
            <button
              className="bg-cyan-800 text-slate-900 px-5 rounded-md"
              onClick={() => handleChange("change value", 0, setData, data)}
            >
              cambiar data
            </button>
          </div>
        )}
        <button
          className="bg-cyan-800 text-slate-900 px-5 rounded-md"
          onClick={() => setfirst((oldFirst) => !oldFirst)}
        >
          cambiar first
        </button>
      </div>
    </Layout>
  );
};

export default Test;

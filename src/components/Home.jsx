import React from "react";
import Layout from "./common/Layout";
import useTitle from "../hooks/useTitle";

const TemporalHome = () => {
  const title = "Acceleraite";
  useTitle(title);
    return (
      <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center border border-blue-300">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Acceleraite se encuentra en Construcción</h1>
        <p className="text-gray-700 mb-8">
          Estamos trabajando para mejorar la experiencia.
        </p>
      </div>
    </div>
      </Layout>
  );
};

export default TemporalHome;
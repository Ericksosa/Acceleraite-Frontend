import React from "react";
import Layout from "../components/common/Layout";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Acceleraite - Admin");

  return (
    <Layout>
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido Admin
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Aquí tienes todo el acesso al sistema de alquiler de vehiculos
            Acceleraite.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

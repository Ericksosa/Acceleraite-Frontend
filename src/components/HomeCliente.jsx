import React from "react";
import LayoutCliente from "../components/common/LayoutCliente";
import useTitle from "../hooks/useTitle";

const HomeCliente = () => {
  useTitle("Accelerilate - Cliente");

  return (
    <LayoutCliente>
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenido Cliente</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Aquí solo puedes ver el inicio, no los menús de gestión.
          </p>
        </div>
      </section>
    </LayoutCliente>
  );
};

export default HomeCliente;
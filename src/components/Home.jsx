import React from "react";
import Layout from "./common/Layout";
import useTitle from "../hooks/useTitle";
import { Calendar, Clock, MapPin, Search } from "lucide-react";

const TemporalHome = () => {
  const title = "Acceleraite";
  useTitle(title);
    return (
    <Layout>
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Alquila el Auto Perfecto</h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">Miles de vehículos disponibles al mejor precio</p>

        <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-12 p-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Ubicación */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ubicación</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="¿Dónde recoges?"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Fecha de recogida */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fecha de recogida</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Fecha de devolución */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Fecha de devolución</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Hora */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hora</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition">
            <Search className="h-4 w-4" />
            Buscar Vehículos
          </button>
        </div>
      </div>
    </section>

      </Layout>
  );
};

export default TemporalHome;
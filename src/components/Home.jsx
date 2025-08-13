import React from "react";
import Layout from "./common/Layout";
import useTitle from "../hooks/useTitle";
import {
  Calendar,
  Search,
  Users,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const title = "Acceleraite";
  useTitle(title);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-700 text-white">
        {/* Decorative shapes */}
        <div className="absolute -right-20 -top-20 opacity-20 w-96 h-96 rounded-full bg-white blur-3xl transform rotate-45" />
        <div className="absolute -left-32 bottom-0 opacity-10 w-72 h-72 rounded-full bg-white blur-2xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                Alquila el auto perfecto
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-sky-100 max-w-xl">
                Miles de vehículos disponibles al mejor precio — reserva rápido
                y viaja tranquilo. Cobertura nacional, seguros opcionales y
                atención 24/7.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <Star className="h-4 w-4" /> Confiabilidad garantizada
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <Truck className="h-4 w-4" /> Entrega a domicilio
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                  <Users className="h-4 w-4" /> Atención 24/7
                </span>
              </div>

              <div className="mt-10 flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#buscar"
                  className="inline-flex items-center gap-3 bg-white text-sky-700 font-semibold px-5 py-3 rounded-lg shadow-lg hover:shadow-2xl transition"
                >
                  <Search className="h-5 w-5" />
                  Buscar Vehículos
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 rounded-lg text-sm hover:bg-white/5 transition"
                >
                  Ver Ofertas
                </motion.button>
              </div>
            </motion.div>

            {/* SEARCH CARD */}
            <motion.div
              id="buscar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative bg-white/95 text-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md"
            >
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Fecha de recogida */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium text-slate-600">
                    Fecha de recogida
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      aria-label="Fecha de recogida"
                      type="date"
                      className="pl-10 pr-4 py-3 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Fecha de devolución */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium text-slate-600">
                    Fecha de devolución
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      aria-label="Fecha de devolución"
                      type="date"
                      className="pl-10 pr-4 py-3 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow"
                  >
                    <Search className="h-4 w-4" /> Buscar Vehículos
                  </button>
                </div>
              </form>

              <div className="mt-4 text-xs text-slate-500">
                Incluye seguros básicos. Precios finales al momento de reservar.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-sky-50 rounded-md mb-4">
                <Truck className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-lg">Entrega y recogida</h3>
              <p className="mt-2 text-sm text-slate-600">
                Recogida en aeropuertos y entrega a domicilio en ciudades
                seleccionadas.
              </p>
            </div>

            <div className="p-6 rounded-xl border shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-sky-50 rounded-md mb-4">
                <Users className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-lg">Soporte 24/7</h3>
              <p className="mt-2 text-sm text-slate-600">
                Equipo listo para asistirte en cualquier momento via teléfono o
                chat.
              </p>
            </div>

            <div className="p-6 rounded-xl border shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 bg-sky-50 rounded-md mb-4">
                <Star className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-lg">Flota verificada</h3>
              <p className="mt-2 text-sm text-slate-600">
                Vehículos inspeccionados regularmente y opciones desde
                económicas hasta de lujo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-semibold">¿Listo para acelerar?</h4>
            <p className="text-sm text-sky-100 mt-1">
              Reserva hoy y obtén descuentos exclusivos en tu primera renta.
            </p>
          </div>

          <div>
            <a
              href="/register"
              className="inline-flex items-center gap-3 bg-white text-sky-700 px-5 py-3 rounded-lg shadow font-semibold"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

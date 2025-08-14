import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, ArrowLeft } from "lucide-react";
import FormularioVehiculo from "../../components/FormularioVehiculo";
import { crearVehiculo } from "../../services/VehiculoServices";

const CrearVehiculo = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (vehiculo) => {
    try {
      setSubmitting(true);
      await crearVehiculo(vehiculo);
      navigate("/vehiculos");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Car className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Crear Vehículo
            </h1>
            <p className="text-xl text-blue-100">
              Agrega un nuevo vehículo a la flota con todos sus detalles
            </p>

            {/* Opcional: mini métricas para coherencia visual
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold">Rápido</div>
                <div className="text-blue-200">Registro en minutos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold">Completo</div>
                <div className="text-blue-200">Datos esenciales</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-2xl font-bold">Consistente</div>
                <div className="text-blue-200">Estilo unificado</div>
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs + Volver */}
        <div className="flex items-center justify-between mb-6">
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Inicio
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link
                  to="/vehiculos"
                  className="text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Vehículos
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-800 font-medium">Crear</li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        </div>

        {/* Tarjeta glass del formulario */}
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 ring-white/60">
            <div className="border-b border-white/60 px-6 py-5">
              <h2 className="text-2xl font-bold text-blue-800">
                Datos del Vehículo
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Completa los campos requeridos para registrar el vehículo.
              </p>
            </div>

            <div className="px-6 py-6">
              <FormularioVehiculo onSubmit={handleSubmit} disabled={submitting} />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/60 px-6 py-4">
              <p className="text-xs text-gray-500">
                Al guardar, el vehículo se añadirá a la lista.
              </p>
              <button
                form="form-vehiculo"
                // Si tu FormularioVehiculo usa un form con id, sincroniza aquí. Si no, puedes omitir 'form'.
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Guardando…" : "Guardar vehículo"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CrearVehiculo;

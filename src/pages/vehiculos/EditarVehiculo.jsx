import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { actualizarVehiculo, obtenerVehiculos } from "../../services/VehiculoServices";
import FormularioVehiculo from "../../components/FormularioVehiculo";
import { Car, ArrowLeft } from "lucide-react";

const EditarVehiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const vehiculos = await obtenerVehiculos();
      const encontrado = vehiculos.find((e) => e.id === parseInt(id));
      setVehiculo(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    try {
      setSubmitting(true);
      await actualizarVehiculo(id, datosActualizados);
      navigate("/vehiculos");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <Car className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Editar Vehículo
          </h1>
          <p className="text-xl text-blue-100">
            Actualiza la información del vehículo seleccionado
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs + Volver */}
        <div className="flex items-center justify-between mb-6">
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/admin/dashboard" className="text-gray-500 hover:underline">
                  Inicio
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link to="/vehiculos" className="text-gray-500 hover:underline">
                  Vehículos
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-800 font-medium">Editar</li>
            </ol>
          </nav>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4" /> Volver
          </button>
        </div>

        {/* Tarjeta formulario */}
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 ring-white/60">
            <div className="border-b border-white/60 px-6 py-5">
              <h2 className="text-2xl font-bold text-blue-800">
                Datos del Vehículo
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Modifica solo los campos necesarios.
              </p>
            </div>

            <div className="px-6 py-6">
              {vehiculo ? (
                <FormularioVehiculo
                  vehiculoInicial={vehiculo}
                  onSubmit={handleSubmit}
                  disabled={submitting}
                />
              ) : (
                <p className="text-center text-gray-500">Cargando datos...</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditarVehiculo;

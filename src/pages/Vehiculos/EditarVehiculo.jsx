import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarVehiculo, obtenerVehiculo } from "../../services/VehiculoService";
import FormularioVehiculo from "../../components/FormularioVehiculo";

const EditarVehiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const vehiculos = await obtenerVehiculo();
      const encontrado = vehiculos.find((e) => e.id === parseInt(id));
      setVehiculo(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarVehiculo(id, datosActualizados);
    navigate("/vehiculos");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Vehículo</h2>
        {vehiculo ? (
          <FormularioVehiculo vehiculoInicial={vehiculo} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos del vehículo...</p>
        )}
      </div>
    </div>
  );
};

export default EditarVehiculo;
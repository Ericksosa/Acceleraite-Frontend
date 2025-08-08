import FormularioVehiculo from "../../components/FormularioVehiculo";
import { useNavigate } from "react-router-dom";
import { crearVehiculo } from "../../services/VehiculoServices";


const CrearVehiculo = () => {
  const navigate = useNavigate();

  const handleSubmit = async (vehiculo) => {
    await crearVehiculo(vehiculo);
    navigate("/vehiculos");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Vehículo</h2>
        <FormularioVehiculo onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearVehiculo;
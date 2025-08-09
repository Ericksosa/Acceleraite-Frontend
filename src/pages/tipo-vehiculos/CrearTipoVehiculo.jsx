import FormularioTipoVehiculo from "../../components/FormularioTipoVehiculo";
import { crearTipoVehiculo } from "../../services/TipoVehiculoServices";
import { useNavigate } from "react-router-dom";

const CrearTipoVehiculo = () => {
  const navigate = useNavigate();

  const handleSubmit = async (tipoVehiculo) => {
    await crearTipoVehiculo(tipoVehiculo);
    navigate("/tipo-vehiculos");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Tipo Vehiculo</h2>
        <FormularioTipoVehiculo onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearTipoVehiculo;
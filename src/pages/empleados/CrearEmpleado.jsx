import FormularioVechiculo from "../../components/FormularioEmpleado";
import { crearVehiculo } from "../../services/EmpleadosServices";
import { useNavigate } from "react-router-dom";

const CrearEmpleado = () => {
  const navigate = useNavigate();

  const handleSubmit = async (empleado) => {
    await crearEmpleado(empleado);
    navigate("/empleados");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Empleado</h2>
        <FormularioEmpleado onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearEmpleado;
import FormularioEmpleado from "../../components/FormularioEmpleado";
import { crearEmpleado } from "../../services/EmpleadosServices";
import { useNavigate } from "react-router-dom";

const CrearEmpleado = () => {
  const navigate = useNavigate();

  const handleSubmit = async (empleado) => {
    await crearEmpleado(empleado);
    navigate("/empleados");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Empleado</h2>
      <FormularioEmpleado onSubmit={handleSubmit} />
    </div>
  );
};

export default CrearEmpleado;
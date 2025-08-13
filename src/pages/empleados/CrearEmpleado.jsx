import { Pause } from "lucide-react";
import FormularioEmpleado from "../../components/FormularioEmpleado";
import { crearEmpleado } from "../../services/EmpleadosServices";
import { useNavigate } from "react-router-dom";

const CrearEmpleado = () => {
  const navigate = useNavigate();
 
  // Funcion para manejar el envio de datos al crear un empleado
  const handleSubmit = async (empleado) => {
    const payload = {
      nombre: empleado.nombre, //Le falta los datos a cargar, basicamente habia una funcion sin parametros para enviar.
      apellido: empleado.apellido,
      cedula: empleado.cedula,  
      fechaIngreso: empleado.fechaIngreso,
      porcientoComision: parseFloat(empleado.porcientoComision),
      tandaLabor: empleado.tandaLabor,
      estadoId: parseInt(empleado.estadoId),
      usuarioId: parseInt(empleado.usuarioId),
    }

    await crearEmpleado(payload);
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
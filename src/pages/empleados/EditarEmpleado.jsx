import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarEmpleado, obtenerEmpleados } from "../../services/EmpleadosServices";
import FormularioEmpleado from "../../components/FormularioEmpleado";

const EditarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const empleados = await obtenerEmpleados();
      const encontrado = empleados.find((e) => e.id === parseInt(id));
      setEmpleado(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarEmpleado(id, datosActualizados);
    navigate("/empleados");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Empleado</h2>
        {empleado ? (
          <FormularioEmpleado empleadoInicial={empleado} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos del empleado...</p>
        )}
      </div>
    </div>
  );
};

export default EditarEmpleado;
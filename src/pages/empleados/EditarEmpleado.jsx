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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Editar Empleado</h2>
      {empleado && (
        <FormularioEmpleado empleadoInicial={empleado} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default EditarEmpleado;
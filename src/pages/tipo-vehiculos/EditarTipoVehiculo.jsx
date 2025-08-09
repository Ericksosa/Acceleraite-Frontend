import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarTipoVehiculo, obtenerTipoVehiculo } from "../../services/TipoVehiculoServices";
import FormularioTipoVehiculo from "../../components/FormularioTipoVehiculo";

const EditarTipoVehiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipoVehiculo, setTipoVehiculo] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const tipoVehiculos = await obtenerTipoVehiculo();
      const encontrado = tipoVehiculos.find((e) => e.id === parseInt(id));
      setTipoVehiculo(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarTipoVehiculo(id, datosActualizados);
    navigate("/tipo-vehiculos");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Tipo Vehiculo</h2>
        {tipoVehiculo ? (
          <FormularioTipoVehiculo tipoVehiculoInicial={tipoVehiculo} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos del Tipo Vehiculo...</p>
        )}
      </div>
    </div>
  );
};

export default EditarTipoVehiculo;
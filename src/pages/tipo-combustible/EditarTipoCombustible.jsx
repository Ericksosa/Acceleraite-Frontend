import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarTipoCombustible, obtenerTipoCombustibles } from "../../services/TipoCombustibleServices";
import FormularioTipoCombustible from "../../components/FormularioTipoCombustible";

const EditarTipoCombustible = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [TipoCombustible, setTipoCombustible] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const tipoCombustibles = await obtenerTipoCombustibles();
      const encontrado = tipoCombustibles.find((e) => e.id === parseInt(id));
      setTipoCombustible(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarTipoCombustible(id, datosActualizados);
    navigate("/tipo-combustible");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Tipo de Combustible</h2>
        {TipoCombustible ? (
          <FormularioTipoCombustible TipoCombustibleInicial={TipoCombustible} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos del Tipo de combustibles...</p>
        )}
      </div>
    </div>
  );
};

export default EditarTipoCombustible;
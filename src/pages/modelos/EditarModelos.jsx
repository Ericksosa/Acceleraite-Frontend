import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarModelos, obtenerModelos } from "../../services/ModelosVehiculosServices";
import FormularioModelos from "../../components/FormularioModelos";

const EditarModelos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modelo, setModelo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      if (!id || isNaN(Number(id))) {
        setError("ID inválido en la URL");
        return;
      }

      try {
        const modelos = await obtenerModelos();
        console.log("Modelos cargados:", modelos);

        // Convertir a número para comparar correctamente
        const encontrado = modelos.find(e => Number(e.id) === Number(id));
        if (!encontrado) {
          setError(`Modelo no encontrado con ID: ${id}`);
          return;
        }

        setModelo(encontrado);
        setError(null);
      } catch (err) {
        setError("Error al cargar modelos");
        console.error(err);
      }
    };

    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    try {
      await editarModelos(id, datosActualizados);
      navigate("/modelos");
    } catch (err) {
      setError("Error al guardar los cambios");
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl text-center text-red-600">
          <h2 className="text-3xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/modelos")}
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  if (!modelo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-xl">Cargando datos del modelo...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Modelo</h2>
        <FormularioModelos ModeloInicial={modelo} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default EditarModelos;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarMarca, obtenerMarcas } from "../../services/MarcasServices";
import FormularioMarcas from "../../components/FormularioMarcas";

const EditarMarca = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marca, setMarca] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const marcas = await obtenerMarcas();
      const encontrado = marcas.find((e) => e.id === parseInt(id));
      setMarca(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarMarca(id, datosActualizados);
    navigate("/marcas");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Marca</h2>
        {marca ? (
          <FormularioMarcas MarcaInicial={marca} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos de la Marca...</p>
        )}
      </div>
    </div>
  );
};

export default EditarMarca;
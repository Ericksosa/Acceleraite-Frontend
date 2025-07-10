import FormularioMarcas from "../../components/FormularioMarcas";
import { crearMarca } from "../../services/MarcasServices";
import { useNavigate } from "react-router-dom";

const CrearMarca = () => {
  const navigate = useNavigate();

  const handleSubmit = async (Marcas) => {
    await crearMarca(Marcas);
    navigate("/marcas");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Marca</h2>
        <FormularioMarcas onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearMarca;
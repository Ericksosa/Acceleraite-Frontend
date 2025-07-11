import FormularioModelos from "../../components/FormularioModelos";
import { crearModelos } from "../../services/ModelosVehiculosServices";
import { useNavigate } from "react-router-dom";

const CrearModelos = () => {
  const navigate = useNavigate();

  const handleSubmit = async (Modelos) => {
    await crearModelos(Modelos);
    navigate("/modelos");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Modelo</h2>
        <FormularioModelos onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearModelos;
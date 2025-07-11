import FormularioTipoCombustible from "../../components/FormularioTipoCombustible";
import { crearTipoCombustible } from "../../services/TipoCombustibleServices";
import { useNavigate } from "react-router-dom";

const CrearTipoCombustible = () => {
  const navigate = useNavigate();

  const handleSubmit = async (TipoCombustible) => {
    await crearTipoCombustible(TipoCombustible);
    navigate("/tipo-combustible");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Tipo Combustible</h2>
        <FormularioTipoCombustible onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearTipoCombustible;
import FormularioReserva from "../../components/FormularioReserva";
import { crearReserva } from "../../services/ReservaServices";
import { useNavigate } from "react-router-dom";

const CrearReserva = () => {
  const navigate = useNavigate();

  const handleSubmit = async (reserva) => {
    await crearReserva(reserva);
    navigate("/reservas");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Reserva</h2>
        <FormularioReserva onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearReserva;
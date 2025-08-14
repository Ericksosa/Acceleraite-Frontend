import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarReserva, obtenerReservas } from "../../services/ReservaServices";
import FormularioReserva from "../../components/FormularioReserva";

const EditarReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const reservas = await obtenerReservas();
      const encontrada = reservas.find((r) => r.id === parseInt(id));
      setReserva(encontrada);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarReserva(id, datosActualizados);
    navigate("/reservas");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Reserva</h2>
        {reserva ? (
          <FormularioReserva reservaInicial={reserva} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos de la reserva...</p>
        )}
      </div>
    </div>
  );
};

export default EditarReserva;
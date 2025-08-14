import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/reservas';

export const obtenerReservas = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearReserva = async (reserva) => {
  const response = await axios.post(REST_API_URL, reserva);
  return response.data;
};

export const editarReserva = async (id, reserva) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, reserva);
  return response.data;
};

export const eliminarReserva = async (id, estadoId = 2) => {
  const response = await axios.put(`${REST_API_URL}/${id}/estado/${estadoId}`);
  return response.data;
};
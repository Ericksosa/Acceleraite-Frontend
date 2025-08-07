import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/vehiculos';

export const obtenerVehiculos = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearVehiculo = async (vehiculo) => {
  const response = await axios.post(REST_API_URL, vehiculo);
  return response.data;
};

export const editarVehiculo = async (id, vehiculo) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, vehiculo);
  return response.data;
};

export const eliminarVehiculo = async (id, estadoId = 2) => {
  const response = await axios.put(`${REST_API_URL}/${id}/estado/${estadoId}`);
  return response.data;
};
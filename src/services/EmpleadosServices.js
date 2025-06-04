import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/empleados';

export const obtenerEmpleados = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearEmpleado = async (empleado) => {
  const response = await axios.post(REST_API_URL, empleado);
  return response.data;
};

export const editarEmpleado = async (id, empleado) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, empleado);
  return response.data;
};

export const eliminarEmpleado = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/empleados/${id}/estado/${estadoId}`);
  return response.data;
};
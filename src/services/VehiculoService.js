import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/vehiculos';

export const listaVehiculos = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching de vehiculos: ", error);
        throw error;
    });
} 
// Obtener lista de vehículos
export const obtenerVehiculo = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

// Crear un nuevo vehículo
export const crearVehiculo = async (vehiculo) => {
  const response = await axios.post(REST_API_URL, vehiculo);
  return response.data;
};

// Editar un vehículo por ID
export const editarVehiculo = async (id, vehiculo) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, vehiculo);
  return response.data;
};

// Eliminar (desactivar) un vehículo por ID
export const eliminarVehiculo = async (id, estadoId = 2) => {
  const response = await axios.put(`${REST_API_URL}/${id}/estado/${estadoId}`);
  return response.data;
};
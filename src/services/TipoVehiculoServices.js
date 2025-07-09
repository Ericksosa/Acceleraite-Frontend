import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/tipo-vehiculos'; 

export const listaTipoVehiculos = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching tipo de vehiculos: ", error);
        throw error;
    });
} 
export const obtenerTipoVehiculo = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearTipoVehiculo = async (tipoVehiculo) => {
  const response = await axios.post(REST_API_URL, tipoVehiculo);
  return response.data;
};

export const editarTipoVehiculo = async (id, tipoVehiculo) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, tipoVehiculo);
  return response.data;
};

export const eliminarTipoVehiculo = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/tipo-vehiculos/${id}/estado/${estadoId}`);
  return response.data;
};
import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/tipo-combustibles'; 

export const listaTipoCombustibles = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching Combustibles: ", error);
        throw error;
    });
} 
export const obtenerTipoCombustibles = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearTipoCombustible = async (tipoCombustible) => {
  const response = await axios.post(REST_API_URL, tipoCombustible);
  return response.data;
};

export const editarTipoCombustible = async (id, tipoCombustible) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, tipoCombustible);
  return response.data;
};

export const eliminarTipoCombustible = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/tipo-combustibles/${id}/estado/${estadoId}`);
  return response.data;
};
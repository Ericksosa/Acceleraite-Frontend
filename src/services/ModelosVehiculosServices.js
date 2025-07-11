import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/modelos'; 

export const listaModelos = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching modelos: ", error);
        throw error;
    });
} 
export const obtenerModelos = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearModelos = async (modelos) => {
  const response = await axios.post(REST_API_URL, modelos);
  return response.data;
};

export const editarModelos = async (id, modelos) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, modelos);
  return response.data;
};

export const eliminarModelos = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/modelos/${id}/estado/${estadoId}`);
  return response.data;
};
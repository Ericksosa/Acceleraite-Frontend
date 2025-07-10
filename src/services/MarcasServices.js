import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/marcas'; 

export const listaMarcas = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching marcas: ", error);
        throw error;
    });
} 
export const obtenerMarcas = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearMarca = async (marcas) => {
  const response = await axios.post(REST_API_URL, marcas);
  return response.data;
};

export const editarMarca = async (id, marcas) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, marcas);
  return response.data;
};

export const eliminarMarca = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/marcas/${id}/estado/${estadoId}`);
  return response.data;
};
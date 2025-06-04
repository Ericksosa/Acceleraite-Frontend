import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/roles';

export const listaRoles = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching roles:", error);
        throw error;
    });
}

export const obtenerRoles = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearRol = async (rol) => {
  const response = await axios.post(REST_API_URL, rol);
  return response.data;
};

export const editarRol= async (id, rol) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, rol);
  return response.data;
};

export const eliminarRol = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/rol/${id}/estado/${estadoId}`);
  return response.data;
};
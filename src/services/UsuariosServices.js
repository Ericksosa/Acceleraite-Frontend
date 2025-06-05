import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/usuarios';

export const listaUsuario = () => {
    return axios.get(REST_API_URL)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching usuario: ", error);
        throw error;
    });
}

export const obtenerUsuarios = async () => {
  const response = await axios.get(REST_API_URL);
  return response.data;
};

export const crearUsuario = async (usuario) => {
  const response = await axios.post(REST_API_URL, usuario);
  return response.data;
};

export const editarUsuario = async (id, usuario) => {
  const response = await axios.put(`${REST_API_URL}/${id}`, usuario);
  return response.data;
};

export const eliminarUsuario = async (id, estadoId = 2) => {
  const response = await axios.put(`http://localhost:8080/api/usuarios/${id}/estado/${estadoId}`);
  return response.data;
};
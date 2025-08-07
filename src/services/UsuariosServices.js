import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/usuarios';

// Obtener todos los usuarios
export const listaUsuario = () => {
  return axios.get(BASE_URL)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching usuarios: ", error);
      throw error;
    });
};

// Obtener usuarios (versión async/await)
export const obtenerUsuarios = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Crear un nuevo usuario
export const crearUsuario = async (usuario) => {
  const response = await axios.post(BASE_URL, usuario);
  return response.data;
};

// Editar un usuario existente
export const editarUsuario = async (id, usuario) => {
  const response = await axios.put(`${BASE_URL}/${id}`, usuario);
  return response.data;
};

// Eliminar (cambiar estado) de un usuario
export const eliminarUsuario = async (id, estadoId = 2) => {
  const response = await axios.put(`${BASE_URL}/${id}/estado/${estadoId}`);
  return response.data;
};

// Login de usuario
export const loginUsuario = async (correo, password) => {
  try {
    const response = await axios.get(`${BASE_URL}/login`, {
      params: { correo, password },
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
});


// Obtener lista de vehículos
export const obtenerVehiculos = async () => {
  try {
    const res = await api.get("/vehiculos");
    return res.data;
  } catch (err) {
    console.error("obtenerVehiculos error:", err.response?.status, err.response?.data);
    throw err;
  }
};

// Crear vehículo (envía JSON)
export const crearVehiculo = async (payload) => {
  try {
    const res = await api.post("/vehiculos", payload);
    return res.data;
  } catch (err) {
    console.error("crearVehiculo error:", err.response?.status, err.response?.data);
    throw err;
  }
};

// Actualizar vehículo (envía JSON)
export const actualizarVehiculo = async (id, payload) => {
  try {
    const res = await api.put(`/vehiculos/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("actualizarVehiculo error:", err.response?.status, err.response?.data);
    throw err;
  }
};

// Eliminar vehículo (según tu API — aquí un ejemplo)
export const eliminarVehiculo = async (id) => {
  try {
    const res = await api.delete(`/vehiculos/${id}`);
    return res.data;
  } catch (err) {
    console.error("eliminarVehiculo error:", err.response?.status, err.response?.data);
    throw err;
  }
};


export const subirImagenes = async (vehiculoId, archivos = [], options = {}) => {
  if (!vehiculoId) throw new Error("vehiculoId es requerido");
  if (!archivos.length) return [];

  const { onUploadProgress } = options;
  const form = new FormData();

  archivos.forEach((file) => {
    form.append("files", file); // debe coincidir con @RequestParam("files")
  });

  try {
    const res = await api.post(`/vehiculos/${vehiculoId}/multimedia`, form, {
      onUploadProgress,
      // NO pongas headers 'Content-Type' manualmente (axios lo crea con boundary)
    });
    return res.data;
  } catch (err) {
    console.error("subirImagenes error:", err.response?.status, err.response?.data);
    throw err;
  }
};

// 🔹 Nuevo: Obtener vehículos con sus imágenes
export const obtenerVehiculosConImagenes = async () => {
  try {
    const res = await api.get("/vehiculos/con-imagenes");
    return res.data;
  } catch (err) {
    console.error("obtenerVehiculosConImagenes error:", err.response?.status, err.response?.data);
    throw err;
  }
};


// Eliminar imagen multimedia
export const eliminarImagen = async (vehiculoId, mediaId) => {
  try {
    const res = await api.delete(`/vehiculos/${vehiculoId}/multimedia/${mediaId}`);
    return res.data;
  } catch (err) {
    console.error("eliminarImagen error:", err.response?.status, err.response?.data);
    throw err;
  }
};

export const resolverUrlImagenVehiculo = (vehiculoId, media) => {
  if (!media) return null;
  if (media.url) return media.url;
  return `${API_BASE}/vehiculos/${vehiculoId}/multimedia/${media.id}`;
};


export default {
  obtenerVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  subirImagenes,
  eliminarImagen,
  resolverUrlImagenVehiculo,
};
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import FormularioVehiculo from "../components/FormularioVehiculo";
import Modal from "../components/common/Modal";
import useTitle from "../hooks/useTitle";

import { obtenerTipoCombustibles } from "../services/TipoCombustibleServices";
import { obtenerTipoVehiculo } from "../services/TipoVehiculoServices";
import { obtenerModelos } from "../services/ModelosVehiculosServices";
import { listaEstados } from "../services/EstadoServices";
import {
  obtenerVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  obtenerVehiculosConImagenes,
  resolverUrlImagenVehiculo,
} from "../services/VehiculoServices";

import { Car, Plus, Edit3, Trash2, Search } from "lucide-react";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tiposCombustible, setTiposCombustible] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tiposVehiculo, setTiposVehiculo] = useState([]);
  const [estados, setEstados] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  const navigate = useNavigate();

  useTitle("Vehículos");
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setCargandoDatos(true);
        // Usamos el endpoint que trae multimedia directamente
        const datos = await obtenerVehiculosConImagenes();
        setVehiculos(datos || []);
      } catch (err) {
        console.error("Error cargando vehículos con imágenes:", err);
        // fallback: intentar obtener sin imágenes (opcional)
        try {
          const datosFallback = await obtenerVehiculos();
          setVehiculos(datosFallback || []);
        } catch (fallbackErr) {
          console.error(
            "Fallback obtenerVehiculos también falló:",
            fallbackErr
          );
          setVehiculos([]);
        }
      } finally {
        setCargandoDatos(false);
      }
    };
    fetchVehiculos();
  }, []);

  // cargar la lista al montar
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setCargandoDatos(true);
        const datos = await obtenerVehiculos();
        setVehiculos(datos || []);
      } catch (err) {
        console.error("Error cargando vehículos:", err);
        setVehiculos([]);
      } finally {
        setCargandoDatos(false);
      }
    };
    fetchVehiculos();
  }, []);

  const obtenerNombreTipoCombustible = (id) => {
    const tipo = tiposCombustible.find((t) => t.id === id);
    return tipo ? tipo.nombre || tipo.descripcion : `ID: ${id}`;
  };

  const obtenerNombreModelo = (id) => {
    const modelo = modelos.find((m) => m.id === id);
    return modelo ? modelo.nombre || modelo.descripcion : `ID: ${id}`;
  };

  const obtenerNombreTipoVehiculo = (id) => {
    const tipo = tiposVehiculo.find((t) => t.id === id);
    return tipo ? tipo.nombre || tipo.descripcion : `ID: ${id}`;
  };

  const obtenerNombreEstado = (id) => {
    const estado = estados.find((e) => e.id === id);
    return estado ? estado.nombre || estado.descripcion : `ID: ${id}`;
  };

  // filtrar por búsqueda (usa searchTerm)
  const vehiculosFiltrados = vehiculos.filter((v) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return (
      (v.descripcion || "").toLowerCase().includes(term) ||
      (v.noPlaca || "").toLowerCase().includes(term) ||
      (v.color || "").toLowerCase().includes(term) ||
      (String(v.id) || "").includes(term) ||
      obtenerNombreModelo(v.modeloId).toLowerCase().includes(term) ||
      obtenerNombreTipoCombustible(v.tipoCombustibleId)
        .toLowerCase()
        .includes(term) ||
      obtenerNombreTipoVehiculo(v.tipoVehiculoId)
        .toLowerCase()
        .includes(term) ||
      obtenerNombreEstado(v.estadoId).toLowerCase().includes(term)
    );
  });
  // acciones principales
  const handleCrear = () => navigate("/vehiculos/crear");

  const handleEditar = () => {
    if (!vehiculoSeleccionado) {
      alert("Seleccione un vehículo para editar.");
      return;
    }
    navigate(`/vehiculos/editar/${vehiculoSeleccionado.id}`);
  };

  const handleEliminar = async () => {
    if (!vehiculoSeleccionado) return;
    if (!window.confirm("¿Estás seguro de eliminar este vehículo?")) return;

    try {
      await eliminarVehiculo(vehiculoSeleccionado.id);
      const datosActualizados = await obtenerVehiculos();
      setVehiculos(datosActualizados || []);
      setVehiculoSeleccionado(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Ocurrió un error al eliminar. Inténtalo de nuevo.");
    }
  };

  const handleSubmitFormulario = async (vehiculo) => {
    try {
      if (vehiculoSeleccionado) {
        await actualizarVehiculo(vehiculoSeleccionado.id, vehiculo);
      } else {
        await crearVehiculo(vehiculo);
      }
      const datosActualizados = await obtenerVehiculos();
      setVehiculos(datosActualizados || []);
      setModalAbierto(false);
      setVehiculoSeleccionado(null);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar el vehículo.");
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setVehiculoSeleccionado(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Header */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                  <Car className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lista de Vehículos
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Gestiona todos los vehículos disponibles en la flota
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Car className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="text-2xl font-bold">
                    {vehiculosFiltrados.length}
                  </div>
                  <div className="text-blue-200">Vehículos Disponibles</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Plus className="h-8 w-8 text-green-200" />
                  </div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-blue-200">Operativos</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Trash2 className="h-8 w-8 text-yellow-200" />
                  </div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-blue-200">En Mantenimiento</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar vehículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCrear}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Vehículo
                </button>
                <button
                  onClick={handleEditar}
                  disabled={!vehiculoSeleccionado}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={handleEliminar}
                  disabled={!vehiculoSeleccionado}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal isOpen={modalAbierto} onClose={cerrarModal}>
            <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
              <FormularioVehiculo
                vehiculoInicial={vehiculoSeleccionado}
                onSubmit={handleSubmitFormulario}
                onCancel={cerrarModal}
              />
            </div>
          </Modal>

          {/* Lista de Vehículos */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">
                Vehículos ({vehiculosFiltrados.length})
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Administra la flota disponible
              </p>
            </div>

            {vehiculosFiltrados.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-blue-500 text-white">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Imagen</th>
                      <th className="px-6 py-3">Color</th>
                      <th className="px-6 py-3">N° Chasis</th>
                      <th className="px-6 py-3">Descripción</th>
                      <th className="px-6 py-3">Placa</th>
                      <th className="px-6 py-3">Monto/Día</th>
                      <th className="px-6 py-3">Tipo Combustible</th>
                      <th className="px-6 py-3">Modelo</th>
                      <th className="px-6 py-3">Tipo Vehículo</th>
                      <th className="px-6 py-3">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vehiculosFiltrados.map((v, idx) => {
                      // obtener primera multimedia (si el endpoint lo trae)
                      const firstMedia =
                        v.multimedia && v.multimedia.length > 0
                          ? v.multimedia[0]
                          : null;

                      // resolver URL usando helper si lo tienes, o construir con API_BASE
                      const imgSrc = firstMedia
                        ? typeof resolverUrlImagenVehiculo === "function"
                          ? resolverUrlImagenVehiculo(v.id, firstMedia)
                          : firstMedia.url ||
                            `${API_BASE}/vehiculos/${v.id}/multimedia/${firstMedia.id}`
                        : null;

                      return (
                        <tr
                          key={v.id}
                          onClick={() => setVehiculoSeleccionado(v)}
                          className={`cursor-pointer border-b ${
                            vehiculoSeleccionado?.id === v.id
                              ? "bg-yellow-100"
                              : idx % 2 === 0
                              ? "bg-blue-50"
                              : "bg-blue-100"
                          }`}
                        >
                          <td className="px-6 py-4 font-semibold text-blue-900">
                            {v.id}
                          </td>

                          {/* Imagen */}
                          <td className="px-6 py-4">
                            {imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={
                                  firstMedia?.nombreArchivo ||
                                  `Vehiculo ${v.id}`
                                }
                                className="w-20 h-14 object-cover rounded-md border"
                                onError={(e) => {
                                  // si falla, ocultar imagen rota y dejar placeholder
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-20 h-14 flex items-center justify-center bg-gray-100 rounded-md border text-gray-400">
                                <Car className="h-6 w-6" />
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-4">{v.color}</td>
                          <td className="px-6 py-4">{v.noChasis}</td>
                          <td className="px-6 py-4">{v.descripcion}</td>
                          <td className="px-6 py-4">{v.noPlaca}</td>
                          <td className="px-6 py-4">{v.montoPorDia}</td>
                          <td className="px-6 py-4">
                            {obtenerNombreTipoCombustible(v.tipoCombustibleId)}
                          </td>
                          <td className="px-6 py-4">
                            {obtenerNombreModelo(v.modeloId)}
                          </td>
                          <td className="px-6 py-4">
                            {obtenerNombreTipoVehiculo(v.tipoVehiculoId)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                v.estadoId === 1
                                  ? "bg-green-100 text-green-800"
                                  : v.estadoId === 2
                                  ? "bg-yellow-100 text-yellow-800"
                                  : v.estadoId === 3
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {obtenerNombreEstado(v.estadoId)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <Car className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay vehículos registrados
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? "No se encontraron vehículos con el término de búsqueda"
                    : "Comienza agregando un nuevo vehículo al sistema"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCrear}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Primer Vehículo
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListaVehiculos;

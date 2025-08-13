import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import FormularioTipoVehiculo from "../components/FormularioTipoVehiculo";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";
import { Car, Plus, Edit3, Trash2, Search, Tag, Star, Zap } from "lucide-react";

import {
  obtenerTipoVehiculo,
  crearTipoVehiculo,
  editarTipoVehiculo,
  eliminarTipoVehiculo
} from "../services/TipoVehiculoServices";

const ListaTipoVehiculo = () => {
  const [tipoVehiculos, setTipoVehiculos] = useState([]);
  const [tipoVehiculoSeleccionado, setTipoVehiculoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useTitle("Tipo Vehiculos");

  useEffect(() => {
    cargarTipoVehiculo();
  }, []);

  const cargarTipoVehiculo = async () => {
    const datos = await obtenerTipoVehiculo();
    setTipoVehiculos(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
    navigate("/tipo-vehiculos/crear");
  };

  const handleEditar = () => {
    if (!tipoVehiculoSeleccionado) {
      alert("Seleccione un tipo de vehiculo para editar.");
      return;
    }
    navigate(`/tipo-vehiculos/editar/${tipoVehiculoSeleccionado.id}`);
  };

  const handleEliminar = async () => {
    if (!tipoVehiculoSeleccionado) return;

    const confirmado = window.confirm("¿Estás seguro de eliminar este tipo de vehiculo?");
    if (confirmado) {
      try {
        await eliminarTipoVehiculo(tipoVehiculoSeleccionado.id);
        await cargarTipoVehiculo();
        setTipoVehiculoSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar el tipo de vehiculo. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const handleSubmitFormulario = async (tipoVehiculo) => {
    if (tipoVehiculoSeleccionado) {
      await editarTipoVehiculo(tipoVehiculoSeleccionado.id, tipoVehiculo);
    } else {
      await crearTipoVehiculo(tipoVehiculo);
    }
    await cargarTipoVehiculo();
    setModalAbierto(false);
    setTipoVehiculoSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTipoVehiculoSeleccionado(null);
  };

  // Filtrar tipos de vehículos
  const tipoVehiculosFiltrados = tipoVehiculos.filter((tipoVehiculo) => {
    const matchesSearch = tipoVehiculo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tipoVehiculo.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return tipoVehiculo.estadoId === 1 && matchesSearch;
  });

  const getVehicleIcon = (nombre) => {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('suv') || nombreLower.includes('camioneta')) {
      return <Car className="h-6 w-6 text-blue-600" />;
    } else if (nombreLower.includes('sedan') || nombreLower.includes('compacto')) {
      return <Zap className="h-6 w-6 text-green-600" />;
    } else if (nombreLower.includes('deportivo') || nombreLower.includes('lujo')) {
      return <Star className="h-6 w-6 text-purple-600" />;
    }
    return <Tag className="h-6 w-6 text-gray-600" />;
  };

  return (
    <>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tipos de Vehículos</h1>
            <p className="text-xl text-blue-100 mb-8">
              Gestiona las categorías de vehículos disponibles
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-2">
                  <Car className="h-8 w-8 text-blue-200" />
                </div>
                <div className="text-2xl font-bold">{tipoVehiculosFiltrados.length}</div>
                <div className="text-blue-200">Tipos Disponibles</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-2">
                  <Tag className="h-8 w-8 text-green-200" />
                </div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-blue-200">Categorías Activas</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-yellow-200" />
                </div>
                <div className="text-2xl font-bold">Premium</div>
                <div className="text-blue-200">Calidad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar tipo de vehículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCrear}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Nuevo Tipo
              </button>
              <button
                onClick={handleEditar}
                disabled={!tipoVehiculoSeleccionado}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Edit3 className="h-4 w-4" />
                Editar
              </button>
              <button
                onClick={handleEliminar}
                disabled={!tipoVehiculoSeleccionado}
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
            <FormularioTipoVehiculo
              tipoVehiculoInicial={tipoVehiculoSeleccionado}
              onSubmit={handleSubmitFormulario}
              onCancel={cerrarModal}
            />
          </div>
        </Modal>

        {/* Vehicle Types Grid */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Tipos de Vehículos ({tipoVehiculosFiltrados.length})
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona las categorías disponibles para la flota
            </p>
          </div>

          {tipoVehiculosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {tipoVehiculosFiltrados.map((tipoVehiculo) => (
                <div
                  key={tipoVehiculo.id}
                  onClick={() => setTipoVehiculoSeleccionado(tipoVehiculo)}
                  className={`cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                    tipoVehiculoSeleccionado?.id === tipoVehiculo.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full">
                          {getVehicleIcon(tipoVehiculo.nombre)}
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {tipoVehiculo.nombre}
                          </h4>
                          <p className="text-sm text-gray-600">ID: {tipoVehiculo.id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {tipoVehiculo.descripcion}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        Activo
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <Car className="h-full w-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tipos de vehículos</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? "No se encontraron tipos de vehículos con el término de búsqueda" 
                  : "Comienza agregando un nuevo tipo de vehículo al sistema"
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCrear}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Primer Tipo
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default ListaTipoVehiculo;
import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioEmpleado from "../components/FormularioEmpleado";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Calendar,
  Badge,
  Star,
} from "lucide-react";

import {
  obtenerEmpleados,
  crearEmpleado,
  editarEmpleado,
  eliminarEmpleado,
} from "../services/EmpleadosServices";

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTanda, setFilterTanda] = useState("");

  useTitle("Empleados");

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const datos = await obtenerEmpleados();
    setEmpleados(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
    navigate("/empleados/crear");
  };

  const handleEditar = () => {
    if (!empleadoSeleccionado) {
      alert("Seleccione un empleado para editar.");
      return;
    }
    navigate(`/empleados/editar/${empleadoSeleccionado.id}`);
  };

  const handleEliminar = async () => {
    if (!empleadoSeleccionado) return;

    const confirmado = window.confirm(
      "¿Estás seguro de eliminar este empleado?"
    );
    if (confirmado) {
      try {
        await eliminarEmpleado(empleadoSeleccionado.id);
        await cargarEmpleados();
        setEmpleadoSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar el empleado");
      }
    }
  };

  const handleSubmitFormulario = async (empleado) => {
    if (empleadoSeleccionado) {
      await editarEmpleado(empleadoSeleccionado.id, empleado);
    } else {
      await crearEmpleado(empleado);
    }
    await cargarEmpleados();
    setModalAbierto(false);
    setEmpleadoSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEmpleadoSeleccionado(null);
  };

  // Filtrar empleados
  const empleadosFiltrados = empleados.filter((empleado) => {
    const matchesSearch =
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.cedula.includes(searchTerm);
    const matchesTanda =
      filterTanda === "" || empleado.tandaLabor === filterTanda;
    return empleado.estadoId === 1 && matchesSearch && matchesTanda;
  });

  const getTandaColor = (tanda) => {
    switch (tanda) {
      case "Mañana":
        return "bg-blue-100 text-blue-800";
      case "Tarde":
        return "bg-green-100 text-green-800";
      case "Noche":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                    <Users className="h-12 w-12" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Gestión de Empleados
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Administra tu equipo de trabajo de manera eficiente
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                    <div className="text-2xl font-bold">
                      {empleadosFiltrados.length}
                    </div>
                    <div className="text-blue-200">Empleados Activos</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-8 w-8 text-green-200" />
                    </div>
                    <div className="text-2xl font-bold">
                      {
                        new Set(empleadosFiltrados.map((e) => e.tandaLabor))
                          .size
                      }
                    </div>
                    <div className="text-blue-200">Tandas Activas</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-8 w-8 text-yellow-200" />
                    </div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-blue-200">Satisfacción</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Actions Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar empleado..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select
                      value={filterTanda}
                      onChange={(e) => setFilterTanda(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Todas las tandas</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noche">Noche</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCrear}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    Nuevo Empleado
                  </button>
                  <button
                    onClick={handleEditar}
                    disabled={!empleadoSeleccionado}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={handleEliminar}
                    disabled={!empleadoSeleccionado}
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
                <FormularioEmpleado
                  empleadoInicial={empleadoSeleccionado}
                  onSubmit={handleSubmitFormulario}
                  onCancel={cerrarModal}
                />
              </div>
            </Modal>

            {/* Employees Grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">
                  Empleados Registrados ({empleadosFiltrados.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Gestiona la información de todos los empleados activos
                </p>
              </div>

              {empleadosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {empleadosFiltrados.map((empleado) => (
                    <div
                      key={empleado.id}
                      onClick={() => setEmpleadoSeleccionado(empleado)}
                      className={`cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                        empleadoSeleccionado?.id === empleado.id
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {empleado.nombre} {empleado.apellido}
                              </h4>
                              <p className="text-sm text-gray-600">
                                ID: {empleado.id}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTandaColor(
                              empleado.tandaLabor
                            )}`}
                          >
                            {empleado.tandaLabor}
                          </span>
                        </div>

                        {/* Info Grid */}
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Cédula:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {empleado.cedula}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Fecha Ingreso:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {empleado.fechaIngreso}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Comisión:
                            </span>
                            <span className="text-sm font-bold text-green-600">
                              {empleado.porcientoComision}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Usuario ID:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {empleado.usuarioId}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            <Badge className="h-3 w-3 mr-1" />
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
                    <Users className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay empleados
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || filterTanda
                      ? "No se encontraron empleados con los filtros aplicados"
                      : "Comienza agregando un nuevo empleado al sistema"}
                  </p>
                  {!searchTerm && !filterTanda && (
                    <button
                      onClick={handleCrear}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <UserPlus className="h-4 w-4" />
                      Agregar Primer Empleado
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

export default ListaEmpleados;

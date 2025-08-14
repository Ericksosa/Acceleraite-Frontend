import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioUsuario from "../components/FormularioUsuario";
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
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../services/UsuariosServices";

const ListaUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  

  useTitle("Usuarios");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const datos = await obtenerUsuarios();
    setUsuarios(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
    navigate("/usuarios/crear");
  };

  const handleEditar = () => {
    if (!usuarioSeleccionado) {
      alert("Seleccione un usuario para editar.");
      return;
    }
    navigate(`/usuarios/editar/${usuarioSeleccionado.id}`);
  };

  const handleEliminar = async () => {
    if (!usuarioSeleccionado) return;

    const confirmado = window.confirm(
      "¿Estás seguro de eliminar este usuario?"
    );
    if (confirmado) {
      try {
        await eliminarUsuario(usuarioSeleccionado.id);
        await cargarUsuarios();
        setUsuarioSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert(
          "Ocurrió un error al eliminar el usuario. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  const handleSubmitFormulario = async (usuario) => {
    if (usuarioSeleccionado) {
      await editarUsuario(usuarioSeleccionado.id, usuario);
    } else {
      await crearUsuario(usuario);
    }
    await cargarUsuarios();
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
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
                  <Users className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lista de Usuarios
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Administra y gestiona los usuarios del sistema
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Actions Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuario..."
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
                  <UserPlus className="h-4 w-4" />
                  Nuevo Usuario
                </button>
                <button
                  onClick={handleEditar}
                  disabled={!usuarioSeleccionado}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={handleEliminar}
                  disabled={!usuarioSeleccionado}
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
            <FormularioUsuario
              usuarioInicial={usuarioSeleccionado}
              onSubmit={handleSubmitFormulario}
              onCancel={cerrarModal}
            />
          </Modal>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">
                Usuarios Registrados ({usuarios.length})
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Gestiona la información de todos los usuarios activos
              </p>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Nombre Usuario</th>
                    <th className="px-6 py-3">Correo</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios
                      .filter((usuario) => usuario.estadoId === 1)
                      .map((usuario, index) => (
                        <tr
                          key={usuario.id}
                          onClick={() => setUsuarioSeleccionado(usuario)}
                          className={`cursor-pointer border-b ${
                            usuarioSeleccionado?.id === usuario.id
                              ? "bg-yellow-100"
                              : index % 2 === 0
                              ? "bg-blue-50"
                              : "bg-blue-100"
                          }`}
                        >
                          <td className="px-6 py-4 font-semibold text-blue-900">
                            {usuario.id}
                          </td>
                          <td className="px-6 py-4">{usuario.nombreUsuario}</td>
                          <td className="px-6 py-4">{usuario.correo}</td>
                          <td className="px-6 py-4">{usuario.estadoId}</td>
                          <td className="px-6 py-4">{usuario.rolId}</td>
                        </tr>
                      ))
                  ) : (
                    <tr className="bg-white">
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No hay usuarios disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListaUsuario;

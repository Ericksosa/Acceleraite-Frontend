import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioUsuario from "../components/FormularioUsuario";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";


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

    const confirmado = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmado) {
      try {
        await eliminarUsuario(usuarioSeleccionado.id);
        await cargarUsuarios();
        setUsuarioSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar el usuario. Por favor, inténtalo de nuevo.");
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
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Usuario</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioUsuario
            usuarioInicial={usuarioSeleccionado}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModal}
          />
        </Modal>

        <div className="relative overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
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
                    <td className="px-6 py-4 font-semibold text-blue-900">{usuario.id}</td>
                    <td className="px-6 py-4">{usuario.nombreUsuario}</td>
                    <td className="px-6 py-4">{usuario.correo}</td>
                    <td className="px-6 py-4">{usuario.estadoId}</td>
                    <td className="px-6 py-4">{usuario.rolId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No hay usuario disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ListaUsuario;
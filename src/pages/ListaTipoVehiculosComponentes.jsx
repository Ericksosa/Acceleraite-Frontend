import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioTipoVehiculo from "../components/FormularioTipoVehiculo";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";


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

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Tipo de Vehiculo</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioTipoVehiculo
            tipoVehiculoInicial={tipoVehiculoSeleccionado}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModal}
          />
        </Modal>

        <div className="relative overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Descripcion</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tipoVehiculos.length > 0 ? (
                tipoVehiculos
                .filter((tipoVehiculo) => tipoVehiculo.estadoId === 1)
                .map((tipoVehiculo, index) => (
                  <tr
                    key={tipoVehiculo.id}
                    onClick={() => setTipoVehiculoSeleccionado(tipoVehiculo)}
                    className={`cursor-pointer border-b ${
                      tipoVehiculoSeleccionado?.id === tipoVehiculo.id
                        ? "bg-yellow-100"
                        : index % 2 === 0
                        ? "bg-blue-50"
                        : "bg-blue-100"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{tipoVehiculo.id}</td>
                    <td className="px-6 py-4">{tipoVehiculo.nombre}</td>
                    <td className="px-6 py-4">{tipoVehiculo.descripcion}</td>
                    <td className="px-6 py-4">{tipoVehiculo.estadoId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No hay tipo de vehiculos disponibles
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

export default ListaTipoVehiculo;
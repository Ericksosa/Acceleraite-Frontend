import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioTipoCombustible from "../components/FormularioTipoCombustible";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";


import {
  obtenerTipoCombustibles,
  crearTipoCombustible,
  editarTipoCombustible,
  eliminarTipoCombustible
} from "../services/TipoCombustibleServices";

const ListaTipoCombustible = () => {
  const [TipoCombustibles, setTipoCombustibles] = useState([]);
  const [TipoCombustibleSeleccionado, setTipoCombustibleSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useTitle("Tipo Combustible");

  useEffect(() => {
    cargarTipoCombustible();

  }, []);

  const cargarTipoCombustible = async () => {
    const datos = await obtenerTipoCombustibles();
    setTipoCombustibles(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
  navigate("/tipo-combustible/crear");
  };

  const handleEditar = () => {
  if (!TipoCombustibleSeleccionado) {
    alert("Seleccione un tipo de combustible para editar.");
    return;
  }
  navigate(`/tipo-combustible/editar/${TipoCombustibleSeleccionado.id}`);
};

  const handleEliminar = async () => {
    if (!TipoCombustibleSeleccionado) return;

    const confirmado = window.confirm("¿Estás seguro de eliminar este tipo de combustible?");
    if (confirmado) {
      try {
        await eliminarTipoCombustible(TipoCombustibleSeleccionado.id);
        await cargarTipoCombustible();
        setTipoCombustibleSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar el tipo de combustible. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const handleSubmitFormulario = async (TipoCombustible) => {
    if (TipoCombustibleSeleccionado) {
      await editarTipoCombustible(TipoCombustibleSeleccionado.id, TipoCombustible);
    } else {
      await crearTipoCombustible(TipoCombustible);
    }
    await cargarTipoCombustible();
    setModalAbierto(false);
    setTipoCombustibleSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTipoCombustibleSeleccionado(null);
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Tipo de Combustibles</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioTipoCombustible
            TipoCombustibleInicial={TipoCombustibleSeleccionado}
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
              {TipoCombustibles.length > 0 ? (
                TipoCombustibles
                .filter((TipoCombustible) => TipoCombustible.estadoId === 1)
                .map((TipoCombustible, index) => (
                  <tr
                    key={TipoCombustible.id}
                    onClick={() => setTipoCombustibleSeleccionado(TipoCombustible)}
                    className={`cursor-pointer border-b ${
                      TipoCombustibleSeleccionado?.id === TipoCombustible.id
                        ? "bg-yellow-100"
                        : index % 2 === 0
                        ? "bg-blue-50"
                        : "bg-blue-100"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{TipoCombustible.id}</td>
                    <td className="px-6 py-4">{TipoCombustible.nombre}</td>
                    <td className="px-6 py-4">{TipoCombustible.descripcion}</td>
                    <td className="px-6 py-4">{TipoCombustible.estadoId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No hay tipo de combustibles disponibles
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

export default ListaTipoCombustible;
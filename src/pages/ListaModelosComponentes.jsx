import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioModelos from "../components/FormularioModelos";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";

import {
  obtenerModelos,
  crearModelos,
  editarModelos,
  eliminarModelos
} from "../services/ModelosVehiculosServices";

const ListaModelos = () => {
  const [Modelos, setModelos] = useState([]);
  const [ModeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useTitle("Modelos");

  useEffect(() => {
    cargarModelos();

  }, []);

  const cargarModelos = async () => {
    const datos = await obtenerModelos();
    setModelos(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
  navigate("/modelos/crear");
  };

  const handleEditar = () => {
  if (!ModeloSeleccionado) {
    alert("Seleccione un modelo para editar.");
    return;
  }
  navigate(`/modelos/editar/${ModeloSeleccionado.id}`);
};

  const handleEliminar = async () => {
    if (!ModeloSeleccionado) return;

    const confirmado = window.confirm("¿Estás seguro de eliminar este modelo?");
    if (confirmado) {
      try {
        await eliminarModelos(ModeloSeleccionado.id);
        await cargarModelos();
        setModeloSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar el modelo. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const handleSubmitFormulario = async (Modelo) => {
    if (ModeloSeleccionado) {
      await editarModelos(ModeloSeleccionado.id, Modelo);
    } else {
      await crearModelos(Modelo);
    }
    await cargarModelos();
    setModalAbierto(false);
    setModeloSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setModeloSeleccionado(null);
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Modelos</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioModelos
            ModeloInicial={ModeloSeleccionado}
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
                 <th className="px-6 py-3">Marca</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {Modelos.length > 0 ? (
                Modelos
                .filter((Modelo) => Modelo.estadoId === 1)
                .map((Modelo, index) => (
                  <tr
                    key={Modelo.id}
                    onClick={() => setModeloSeleccionado(Modelo)}
                    className={`cursor-pointer border-b ${
                      ModeloSeleccionado?.id === Modelo.id
                        ? "bg-yellow-100"
                        : index % 2 === 0
                        ? "bg-blue-50"
                        : "bg-blue-100"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{Modelo.id}</td>
                    <td className="px-6 py-4">{Modelo.nombre}</td>
                    <td className="px-6 py-4">{Modelo.descripcion}</td>
                     <td className="px-6 py-4">{Modelo.marcaId}</td>
                    <td className="px-6 py-4">{Modelo.estadoId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No hay modelos disponibles
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

export default ListaModelos;
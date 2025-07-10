import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioMarcas from "../components/FormularioMarcas";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";


import {
  obtenerMarcas,
  crearMarca,
  editarMarca,
  eliminarMarca
} from "../services/MarcasServices";

const ListaMarca = () => {
  const [Marcas, setMarcas] = useState([]);
  const [MarcaSeleccionado, setMarcaSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useTitle("Marcas");

  useEffect(() => {
    cargarMarca();

  }, []);

  const cargarMarca = async () => {
    const datos = await obtenerMarcas();
    setMarcas(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
  navigate("/marcas/crear");
  };

  const handleEditar = () => {
  if (!MarcaSeleccionado) {
    alert("Seleccione una marca para editar.");
    return;
  }
  navigate(`/marcas/editar/${MarcaSeleccionado.id}`);
};

  const handleEliminar = async () => {
    if (!MarcaSeleccionado) return;

    const confirmado = window.confirm("¿Estás seguro de eliminar esta marca?");
    if (confirmado) {
      try {
        await eliminarMarca(MarcaSeleccionado.id);
        await cargarMarca();
        setMarcaSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar la marca. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const handleSubmitFormulario = async (Marca) => {
    if (MarcaSeleccionado) {
      await editarMarca(MarcaSeleccionado.id, Marca);
    } else {
      await crearMarca(Marca);
    }
    await cargarMarca();
    setModalAbierto(false);
    setMarcaSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMarcaSeleccionado(null);
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Marcas</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioMarcas
            MarcaInicial={MarcaSeleccionado}
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
              {Marcas.length > 0 ? (
                Marcas
                .filter((Marca) => Marca.estadoId === 1)
                .map((Marca, index) => (
                  <tr
                    key={Marca.id}
                    onClick={() => setMarcaSeleccionado(Marca)}
                    className={`cursor-pointer border-b ${
                      MarcaSeleccionado?.id === Marca.id
                        ? "bg-yellow-100"
                        : index % 2 === 0
                        ? "bg-blue-50"
                        : "bg-blue-100"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{Marca.id}</td>
                    <td className="px-6 py-4">{Marca.nombre}</td>
                    <td className="px-6 py-4">{Marca.descripcion}</td>
                    <td className="px-6 py-4">{Marca.estadoId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No hay marcas disponibles
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

export default ListaMarca;
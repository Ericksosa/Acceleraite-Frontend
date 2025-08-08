import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioVehiculo from "../components/FormularioVehiculo";
import Modal from "../components/common/Modal";
import useTitle from "../hooks/useTitle";

import {
  obtenerVehiculos,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
} from "../services/VehiculoServices";

const ListaVehiculos = () => {
  // Hooks al nivel superior
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const navigate = useNavigate();

  useTitle("Vehículos");

  // Fetch de vehículos al montar
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const datos = await obtenerVehiculos();
        setVehiculos(datos);
      } catch (err) {
        console.error("Error cargando vehículos:", err);
      }
    };
    fetchVehiculos();
  }, []);

  // Handlers de acciones
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
      setVehiculos(datosActualizados);
      setVehiculoSeleccionado(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Ocurrió un error al eliminar. Inténtalo de nuevo.");
    }
  };

  const handleSubmitFormulario = async (vehiculo) => {
    try {
      if (vehiculoSeleccionado) {
        await editarVehiculo(vehiculoSeleccionado.id, vehiculo);
      } else {
        await crearVehiculo(vehiculo);
      }
      const datosActualizados = await obtenerVehiculos();
      setVehiculos(datosActualizados);
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

  // JSX al nivel principal
  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">
        Lista de Vehículos
      </h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />

        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioVehiculo
            vehiculoInicial={vehiculoSeleccionado}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModal}
          />
        </Modal>

        <div className="relative overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Color</th>
                <th className="px-6 py-3">Número de chasis</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Placa</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Modelo</th>
                <th className="px-6 py-3">Combustible</th>
                <th className="px-6 py-3">Tipo vehículo</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length > 0 ? (
                vehiculos
                  .filter((v) => v.estadoId === 1)
                  .map((v, idx) => (
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
                      <td className="px-6 py-4">{v.color}</td>
                      <td className="px-6 py-4">{v.noChasis}</td>
                      <td className="px-6 py-4">{v.descripcion}</td>
                      <td className="px-6 py-4">{v.noPlaca}</td>
                      <td className="px-6 py-4">{v.estadoId}</td>
                      <td className="px-6 py-4">{v.modeloId}</td>
                      <td className="px-6 py-4">{v.tipocombustibleId}</td>
                      <td className="px-6 py-4">{v.tipovehiculoId}</td>
                    </tr>
                  ))
              ) : (
                <tr className="bg-white">
                  <td
                    colSpan="9"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay vehículos disponibles
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

export default ListaVehiculos;

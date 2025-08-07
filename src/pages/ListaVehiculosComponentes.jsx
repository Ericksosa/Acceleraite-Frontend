import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioVehiculo from "../components/FormularioVehiculo";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";

import {
  obtenerVehiculos,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
} from "../services/VehiculoServices";

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useTitle("Vehículos");

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    const datos = await obtenerVehiculos();
    setVehiculos(datos);
  };

  const navigate = useNavigate();

  const handleCrear = () => {
    navigate("/vehiculos/crear");
  };

  const handleEditar = () => {
    if (!vehiculoSeleccionado) {
      alert("Seleccione un vehículo para editar.");
      return;
    }
    navigate(`/vehiculos/editar/${vehiculoSeleccionado.id}`);
  };

  const handleEliminar = async () => {
    if (!vehiculoSeleccionado) return;

    const confirmado = window.confirm("¿Estás seguro de eliminar este vehículo?");
    if (confirmado) {
      try {
        await eliminarVehiculo(vehiculoSeleccionado.id);
        await cargarVehiculos();
        setVehiculoSeleccionado(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar el vehículo");
      }
    }
  };

  const handleSubmitFormulario = async (vehiculo) => {
    if (vehiculoSeleccionado) {
      await editarVehiculo(vehiculoSeleccionado.id, vehiculo);
    } else {
      await crearVehiculo(vehiculo);
    }
    await cargarVehiculos();
    setModalAbierto(false);
    setVehiculoSeleccionado(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setVehiculoSeleccionado(null);
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Vehículos</h2>

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

        {/* Tabla de vehículos */}
        <div className="relative overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Chasis</th>
                <th className="px-6 py-3">Motor</th>
                <th className="px-6 py-3">Placa</th>
                <th className="px-6 py-3">Color</th>
                <th className="px-6 py-3">Tipo Combustible</th>
                <th className="px-6 py-3">Modelo</th>
                <th className="px-6 py-3">Tipo Vehículo</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length > 0 ? (
                vehiculos
                  .filter((vehiculo) => vehiculo.estadoId === 1)
                  .map((vehiculo, index) => (
                    <tr
                      key={vehiculo.id}
                      onClick={() => setVehiculoSeleccionado(vehiculo)}
                      className={`cursor-pointer border-b ${
                        vehiculoSeleccionado?.id === vehiculo.id
                          ? "bg-yellow-100"
                          : index % 2 === 0
                          ? "bg-blue-50"
                          : "bg-blue-100"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-blue-900">{vehiculo.id}</td>
                      <td className="px-6 py-4">{vehiculo.descripcion}</td>
                      <td className="px-6 py-4">{vehiculo.noChasis}</td>
                      <td className="px-6 py-4">{vehiculo.noMotor}</td>
                      <td className="px-6 py-4">{vehiculo.noPlaca}</td>
                      <td className="px-6 py-4">{vehiculo.color}</td>
                      <td className="px-6 py-4">{vehiculo.tipoCombustibleId}</td>
                      <td className="px-6 py-4">{vehiculo.modeloId}</td>
                      <td className="px-6 py-4">{vehiculo.tipoVehiculoId}</td>
                      <td className="px-6 py-4">{vehiculo.estadoId}</td>
                    </tr>
                  ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
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
import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioReserva from "../components/FormularioReserva";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";

import {
  obtenerReservas,
  crearReserva,
  editarReserva,
  eliminarReserva,
} from "../services/ReservaServices";
import { obtenerEmpleados } from "../services/EmpleadosServices";
import { obtenerUsuarios } from "../services/UsuariosServices";
import { obtenerVehiculos } from "../services/VehiculoServices";

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useTitle("Reservas");

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    setReservas(await obtenerReservas());
    setEmpleados(await obtenerEmpleados());
    setUsuarios(await obtenerUsuarios());
    setVehiculos(await obtenerVehiculos());
  };

  const navigate = useNavigate();

  const handleCrear = () => {
    navigate("/reservas/crear");
  };

  const handleEditar = () => {
    if (!reservaSeleccionada) {
      alert("Seleccione una reserva para editar.");
      return;
    }
    navigate(`/reservas/editar/${reservaSeleccionada.id}`);
  };

  const handleEliminar = async () => {
    if (!reservaSeleccionada) return;

    const confirmado = window.confirm("¿Estás seguro de eliminar esta reserva?");
    if (confirmado) {
      try {
        await eliminarReserva(reservaSeleccionada.id);
        await cargarTodo();
        setReservaSeleccionada(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al eliminar la reserva");
      }
    }
  };

  const handleSubmitFormulario = async (reserva) => {
    if (reservaSeleccionada) {
      await editarReserva(reservaSeleccionada.id, reserva);
    } else {
      await crearReserva(reserva);
    }
    await cargarTodo();
    setModalAbierto(false);
    setReservaSeleccionada(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setReservaSeleccionada(null);
  };

  const obtenerNombre = (lista, id, campo = "nombre") => {
    const encontrado = lista.find(e => e.id === id);
    return encontrado?.[campo] || "—";
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Reservas</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioReserva
            reservaInicial={reservaSeleccionada}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModal}
          />
        </Modal>

        <div className="relative overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Fecha Creación</th>
                <th className="px-6 py-3">Fecha Inicio</th>
                <th className="px-6 py-3">Monto/Día</th>
                <th className="px-6 py-3">Días</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Vehículo</th>
                <th className="px-6 py-3">Empleado</th>
                <th className="px-6 py-3">Usuario</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas
                  .filter((r) => r.estadoId === 1)
                  .map((reserva, index) => (
                    <tr
                      key={reserva.id}
                      onClick={() => setReservaSeleccionada(reserva)}
                      className={`cursor-pointer border-b ${
                        reservaSeleccionada?.id === reserva.id
                          ? "bg-yellow-100"
                          : index % 2 === 0
                          ? "bg-blue-50"
                          : "bg-blue-100"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-blue-900">{reserva.id}</td>
                      <td className="px-6 py-4">{reserva.fechaCreacion?.split("T")[0]}</td>
                        <td className="px-6 py-4">{reserva.fechaInicio?.split("T")[0]}</td>
                      <td className="px-6 py-4">{reserva.monto_X_Dia}</td>
                      <td className="px-6 py-4">{reserva.cantidadDia}</td>
                      <td className="px-6 py-4">{reserva.montoTotal}</td>
                      <td className="px-6 py-4">{obtenerNombre(vehiculos, reserva.vehiculoId, "descripcion")}</td>
                      <td className="px-6 py-4">{obtenerNombre(empleados, reserva.empleadoId)}</td>
                      <td className="px-6 py-4">{obtenerNombre(usuarios, reserva.usuarioId, "nombreUsuario")}</td>
                      <td className="px-6 py-4">{reserva.estadoId}</td>
                    </tr>
                  ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                    No hay reservas disponibles
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

export default ListaReservas;
import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import BotonesAcciones from "../components/common/BotonesAcciones";
import FormularioEmpleado from "../components/FormularioEmpleado";
import useTitle from "../hooks/useTitle";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";


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

    const confirmado = window.confirm("¿Estás seguro de eliminar este empleado?");
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

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-blue-600 mb-6 mt-4 text-center">Lista de Empleados</h2>

      <div className="px-4">
        <BotonesAcciones
          onCreate={handleCrear}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />

        {/* ✅ Modal con Formulario */}
        <Modal isOpen={modalAbierto} onClose={cerrarModal}>
          <FormularioEmpleado
            empleadoInicial={empleadoSeleccionado}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModal}
          />
        </Modal>

        {/* Tabla de empleados */}
        <div className="relative overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Apellido</th>
                <th className="px-6 py-3">Cédula</th>
                <th className="px-6 py-3">Fecha Ingreso</th>
                <th className="px-6 py-3">% Comisión</th>
                <th className="px-6 py-3">Tanda Labor</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {empleados.length > 0 ? (
                empleados.map((empleado, index) => (
                  <tr
                    key={empleado.id}
                    onClick={() => setEmpleadoSeleccionado(empleado)}
                    className={`cursor-pointer border-b ${
                      empleadoSeleccionado?.id === empleado.id
                        ? "bg-yellow-100"
                        : index % 2 === 0
                        ? "bg-blue-50"
                        : "bg-blue-100"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-900">{empleado.id}</td>
                    <td className="px-6 py-4">{empleado.nombre}</td>
                    <td className="px-6 py-4">{empleado.apellido}</td>
                    <td className="px-6 py-4">{empleado.cedula}</td>
                    <td className="px-6 py-4">{empleado.fechaIngreso}</td>
                    <td className="px-6 py-4">{empleado.porcientoComision}</td>
                    <td className="px-6 py-4">{empleado.tandaLabor}</td>
                    <td className="px-6 py-4">{empleado.estadoId}</td>
                    <td className="px-6 py-4">{empleado.usuarioId}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No hay empleados disponibles
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

export default ListaEmpleados;
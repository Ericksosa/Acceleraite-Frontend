import React, { useState, useEffect } from "react";
import { obtenerVehiculos } from "../services/VehiculoServices";
import { obtenerEmpleados } from "../services/EmpleadosServices";
import { obtenerUsuarios } from "../services/UsuariosServices";

const FormularioReserva = ({ reservaInicial, onSubmit }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [formData, setFormData] = useState({
    fechaCreacion: "",
    fechaInicio: "",
    monto_X_Dia: "",
    cantidadDia: "",
    comentario: "",
    montoTotal: "",
    empleadoId: "",
    vehiculoId: "",
    usuarioId: "",
    estadoId: "",
  });

  useEffect(() => {
    const cargarDatos = async () => {
      setVehiculos(await obtenerVehiculos());
      setEmpleados(await obtenerEmpleados());
      setUsuarios(await obtenerUsuarios());
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    if (reservaInicial) setFormData(reservaInicial);
  }, [reservaInicial]);

  const handleVehiculoChange = (e) => {
    const vehiculoId = e.target.value;
    const seleccionado = vehiculos.find(v => v.id === parseInt(vehiculoId));
    setFormData({
      ...formData,
      vehiculoId,
      monto_X_Dia: seleccionado?.montoPorDia || ""
    });
  };

  useEffect(() => {
    const monto = parseFloat(formData.monto_X_Dia || 0);
    const dias = parseInt(formData.cantidadDia || 0);
    const total = monto * dias;
    setFormData(prev => ({ ...prev, montoTotal: total }));
  }, [formData.monto_X_Dia, formData.cantidadDia]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="fechaCreacion"
          value={formData.fechaCreacion}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="vehiculoId"
          value={formData.vehiculoId}
          onChange={handleVehiculoChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione un vehículo</option>
          {vehiculos.map(v => (
            <option key={v.id} value={v.id}>
              {v.descripcion} - ${v.montoPorDia}
            </option>
          ))}
        </select>

        <input
          name="monto_X_Dia"
          value={formData.monto_X_Dia}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          name="cantidadDia"
          placeholder="Cantidad de Días"
          value={formData.cantidadDia}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="montoTotal"
          value={formData.montoTotal}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          name="comentario"
          placeholder="Comentario"
          value={formData.comentario}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="empleadoId"
          value={formData.empleadoId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione un empleado</option>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>

        <select
          name="usuarioId"
          value={formData.usuarioId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nombreUsuario}</option>
          ))}
        </select>

        <input
          name="estadoId"
          placeholder="Estado ID"
          value={formData.estadoId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormularioReserva;
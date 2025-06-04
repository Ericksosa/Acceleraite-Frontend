import React, { useState, useEffect } from "react";

const FormularioEmpleado = ({ empleadoInicial, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fechaIngreso: "",
    porcientoComision: "",
    tandaLabor: "",
    estadoId: "",
    usuarioId: "",
  });

  useEffect(() => {
    if (empleadoInicial) setFormData(empleadoInicial);
  }, [empleadoInicial]);

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
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="fechaIngreso"
          value={formData.fechaIngreso}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="porcientoComision"
          placeholder="% Comisión"
          value={formData.porcientoComision}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tandaLabor"
          placeholder="Tanda Labor"
          value={formData.tandaLabor}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="estadoId"
          placeholder="Estado"
          value={formData.estadoId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="usuarioId"
          placeholder="Usuario ID"
          value={formData.usuarioId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormularioEmpleado;
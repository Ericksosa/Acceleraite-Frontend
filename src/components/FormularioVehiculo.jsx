import React, { useState, useEffect } from "react";

const FormularioVehiculo = ({ vehiculoInicial, onSubmit }) => {
  const [formData, setFormData] = useState({
    noChasis: "",
    descripcion: "",
    estadoId: "",
    modeloId: "",
  });

  useEffect(() => {
    if (vehiculoInicial) setFormData(vehiculoInicial);
  }, [vehiculoInicial]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosFinales = {
      ...formData,
      estadoId: parseInt(formData.estadoId, 10) || null,
    };
    onSubmit(datosFinales);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="noChasis"
          placeholder="noChasis"
          value={formData.noChasis}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
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
          name="color"
          placeholder="color"
          value={formData.color}
          onChange={handleChange}
          className="border p-2 rounded"
        />
         <input
          name="modeloId"
          placeholder="modeloId"
          value={formData.modeloId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="noPlaca"
          placeholder="noPlaca"
          value={formData.noPlaca}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tipocombustibleId"
          placeholder="tipocombustibleId"
          value={formData.tipocombustibleId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tipovehiculoId"
          placeholder="tipovehiculoID"
          value={formData.tipovehiculoId}
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

export default FormularioVehiculo;
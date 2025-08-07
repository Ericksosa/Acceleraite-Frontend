import React, { useState, useEffect } from "react";

const FormularioVehiculo = ({ vehiculoInicial, onSubmit }) => {
  const [formData, setFormData] = useState({
    descripcion: "",
    noChasis: "",
    noMotor: "",
    noPlaca: "",
    color: "",
    tipoCombustibleId: "",
    modeloId: "",
    tipoVehiculoId: "",
    estadoId: "",
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
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          className="border p-2 rounded"
         />
            
         <input
          name="noChasis"
          placeholder="noChasis"
          value={formData.noChasis}
          onChange={handleChange}
          className="border p-2 rounded"
        />
            
        <input
          name="noMotor"
          placeholder="NoMotor"
          value={formData.noMotor}
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
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tipoCombustibleId"
          placeholder="Tipo Combustible ID"
          value={formData.tipoCombustibleId}
          onChange={handleChange}
          className="border p-2 rounded"
        />
                    
        <input
          name="modeloId"
          placeholder="modeloId"
          value={formData.modeloId}
          className="border p-2 rounded"
         />
         <input
          name="tipovehiculoId"
          placeholder="tipovehiculoID"
          value={formData.tipoVehiculoId}
          className="border p-2 rounded"
        />
        <input
          name="estadoId"
          placeholder="Estado"
          value={formData.estadoId}
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
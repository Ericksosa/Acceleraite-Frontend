import React, { useState, useEffect } from "react";

const FormularioUsuario = ({ usuarioInicial, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    correo: "",
    password: "",
    estadoId: "",
    rolId: "",
  });

  useEffect(() => {
    if (usuarioInicial) setFormData(usuarioInicial);
  }, [usuarioInicial]);

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
          name="nombreUsuario"
          placeholder="Nombre Usuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="password"
          placeholder="Contraseña"
          value={formData.password}
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
          name="rolId"
          placeholder="Rol"
          value={formData.rolId}
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

export default FormularioUsuario;
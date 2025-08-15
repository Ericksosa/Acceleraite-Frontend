import React, { useState, useEffect } from "react";
import axios from "axios";

const FormularioTipoCombustible = ({ TipoCombustibleInicial, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estadoId: "",         
    estadoNombre: ""       
  });

  const [estados, setEstados] = useState([]); 

  useEffect(() => {
    const cargarEstados = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Error al cargar estados:', error);
      }
    };
    
    cargarEstados();
  }, []);

  useEffect(() => {
    if (TipoCombustibleInicial) {
      setFormData({
        nombre: TipoCombustibleInicial.nombre,
        descripcion: TipoCombustibleInicial.descripcion,
        estadoId: TipoCombustibleInicial.estadoId,
        estadoNombre: TipoCombustibleInicial.estadoNombre
      });
    }
  }, [TipoCombustibleInicial]);

  const handleChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleEstadoChange = e => {
    const estadoId = e.target.value;
    const sel = estados.find(est => String(est.id) === estadoId);
    setFormData({
      ...formData,
      estadoId,
      estadoNombre: sel ? sel.nombre : ""
    });
  };

  const handleSubmit = e => {
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
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="estadoId"
          value={formData.estadoId}
          onChange={handleEstadoChange}
          className="border p-2 rounded"
        >
          <option value="" disabled>
            -- Selecciona un estado --
          </option>
          {estados.map(est => (
            <option key={est.id} value={est.id}>
              {est.nombre}
            </option>
          ))}
        </select>
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

export default FormularioTipoCombustible;
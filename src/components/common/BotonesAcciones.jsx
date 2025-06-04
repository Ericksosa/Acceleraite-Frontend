import React from "react";

const BotonesAcciones = ({ onCreate, onEdit, onDelete }) => (
  <div className="flex gap-4 mb-6">
    <button
      onClick={onCreate}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
    >
      Crear
    </button>
    <button
      onClick={onEdit}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
    >
      Editar
    </button>
    <button
      onClick={onDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
    >
      Eliminar
    </button>
  </div>
);

export default BotonesAcciones;
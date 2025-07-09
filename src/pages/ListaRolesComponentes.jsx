import React, {useEffect, useState} from "react";
import { listaRoles } from "../services/RolServices";
import Layout from "../components/common/Layout";
import useTitle from "../hooks/useTitle";

const ListaRolesComponentes = () => {
    const [roles, setRoles] = useState([]);
      useTitle("Roles");
    useEffect(() => {
        listaRoles()
            .then(data => {
                setRoles(data);
            })
            .catch(error => console.error("Error al obtener roles:", error));
    }, []);

return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center border border-blue-300">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Lista de Roles</h2>
        <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((rol, index) => (
                <tr
                  key={rol.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-blue-900">{rol.id}</td>
                  <td className="px-6 py-4">{rol.nombre}</td>
                  <td className="px-6 py-4">{rol.descripcion}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No hay roles disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </Layout>
);
};

export default ListaRolesComponentes;
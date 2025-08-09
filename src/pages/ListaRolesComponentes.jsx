import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import useTitle from "../hooks/useTitle";
import { listaRoles } from "../services/RolesServices";
import {
  Shield,
  Users,
  Crown,
  UserCheck,
  Search,
  Star,
  Lock,
  Eye,
} from "lucide-react";

const ListaRolesComponentes = () => {
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useTitle("Roles");

  useEffect(() => {
    listaRoles()
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => console.error("Error al obtener roles:", error));
  }, []);

  // Filtrar roles
  const rolesFiltrados = roles.filter((rol) => {
    const matchesSearch =
      rol.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rol.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getRoleIcon = (nombre) => {
    const nombreLower = nombre.toLowerCase();
    if (
      nombreLower.includes("admin") ||
      nombreLower.includes("administrador")
    ) {
      return <Crown className="h-6 w-6 text-purple-600" />;
    } else if (
      nombreLower.includes("user") ||
      nombreLower.includes("usuario")
    ) {
      return <UserCheck className="h-6 w-6 text-blue-600" />;
    } else if (
      nombreLower.includes("manager") ||
      nombreLower.includes("gerente")
    ) {
      return <Users className="h-6 w-6 text-green-600" />;
    } else if (nombreLower.includes("super") || nombreLower.includes("root")) {
      return <Shield className="h-6 w-6 text-red-600" />;
    }
    return <Lock className="h-6 w-6 text-gray-600" />;
  };

  const getRoleColor = (nombre) => {
    const nombreLower = nombre.toLowerCase();
    if (
      nombreLower.includes("admin") ||
      nombreLower.includes("administrador")
    ) {
      return "bg-purple-100 text-purple-800 border-purple-200";
    } else if (
      nombreLower.includes("user") ||
      nombreLower.includes("usuario")
    ) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (
      nombreLower.includes("manager") ||
      nombreLower.includes("gerente")
    ) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (nombreLower.includes("super") || nombreLower.includes("root")) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Header */}
          <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white bg-opacity-20 p-4 rounded-full">
                    <Shield className="h-12 w-12" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Gestión de Roles
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Administra los permisos y roles del sistema
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="h-8 w-8 text-blue-200" />
                    </div>
                    <div className="text-2xl font-bold">
                      {rolesFiltrados.length}
                    </div>
                    <div className="text-blue-200">Roles Activos</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center mb-2">
                      <Lock className="h-8 w-8 text-green-200" />
                    </div>
                    <div className="text-2xl font-bold">Seguro</div>
                    <div className="text-blue-200">Sistema</div>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-8 w-8 text-yellow-200" />
                    </div>
                    <div className="text-2xl font-bold">Control</div>
                    <div className="text-blue-200">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar rol..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">Solo lectura</span>
                </div>
              </div>
            </div>

            {/* Roles Grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">
                  Roles del Sistema ({rolesFiltrados.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Roles y permisos disponibles en la aplicación
                </p>
              </div>

              {rolesFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {rolesFiltrados.map((rol) => (
                    <div
                      key={rol.id}
                      className="rounded-lg border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full">
                              {getRoleIcon(rol.nombre)}
                            </div>
                            <div className="ml-3">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {rol.nombre}
                              </h4>
                              <p className="text-sm text-gray-600">
                                ID: {rol.id}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {rol.descripcion}
                          </p>
                        </div>

                        {/* Role Badge */}
                        <div className="pt-4 border-t border-gray-100">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getRoleColor(
                              rol.nombre
                            )}`}
                          >
                            <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                            Rol Activo
                          </span>
                        </div>

                        {/* Permissions Hint */}
                        <div className="mt-3 flex items-center text-xs text-gray-500">
                          <Lock className="h-3 w-3 mr-1" />
                          Permisos configurados
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                    <Shield className="h-full w-full" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay roles
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? "No se encontraron roles con el término de búsqueda"
                      : "No hay roles configurados en el sistema"}
                  </p>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    Información sobre Roles
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Los roles determinan los permisos y accesos que tienen los
                    usuarios en el sistema. Cada rol está configurado con
                    permisos específicos para garantizar la seguridad y el
                    control de acceso adecuado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ListaRolesComponentes;

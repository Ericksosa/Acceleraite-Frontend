import {Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: "Inicio", to: "/" },
    { label: "Roles", to: "/roles"},
    { label: "Tipo Vehículos", to: "/tipo-vehiculos"},
    { label: "Empleados", to: "/empleados" },
    { label: "Tipo Combustible", to: "/tipo-combustible" },
    { label: "Usuarios", to: "/usuarios" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white text-black shadow-md border-b-0.5 border border-blue-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Accelerilate
            </h1>
          </Link>
          <div className="space-x-6 text-sm sm:text-base">
            <Link to="/" className="hover:text-blue-600 transition-colors duration-300">
              Inicio
            </Link>
            <Link to="/roles" className="hover:text-blue-600 transition-colors duration-300">
              Roles
            </Link>
            <Link to="/usuarios" className="hover:text-blue-600 transition-colors duration-300">
              Usuarios
            </Link>
            <Link to="/tipo-vehiculos" className="hover:text-blue-600 transition-colors duration-300">
              Tipo Vehículos
            </Link>
            <Link to="/empleados" className="hover:text-blue-600 transition-colors duration-300">
              Empleados
            </Link>
            <Link to="/tipo-combustible" className="hover:text-blue-600 transition-colors duration-300">
              Tipo Combustible
            </Link>
            <Link to="/marcas" className="hover:text-blue-600 transition-colors duration-300">
              Marcas
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="border-t px-4 py-3">
              <button className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded">Iniciar Sesión</button>
              <button className="block w-full text-left px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2">
                Registrarse
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-200 text-sm">
        © 2025 Accelerilate. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default Layout;
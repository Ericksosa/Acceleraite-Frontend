import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", to: "/" },
    { label: "Roles", to: "/roles" },
    { label: "Tipo Vehículos", to: "/tipo-vehiculos" },
    { label: "Empleados", to: "/empleados" },
    { label: "Tipo Combustible", to: "/tipo-combustible" },
    { label: "Usuarios", to: "/usuarios" },
    { label: "Marcas", to: "/marcas" },
    { label: "Modelos", to: "/modelos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="ml-4 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <img
                  src="/1.png"
                  alt="Accelerilate"
                  className="h-16 w-auto mr-2"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="hover:underline">
                <button className="text-sm px-4 py-2 rounded hover:bg-gray-100 transition">
                  Iniciar Sesión
                </button>
              </Link>

              <Link to="/register" className="hover:underline">
                <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                  Registrarse
                </button>
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
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
              <button className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded">
                Iniciar Sesión
              </button>
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
  );
};

export default Layout;
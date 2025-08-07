import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    setUsuarioAutenticado(!!usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuarioAutenticado(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Inicio", to: "/" },
    { label: "Roles", to: "/roles" },
    { label: "Tipo Vehículos", to: "/tipo-vehiculos" },
    { label: "Empleados", to: "/empleados" },
    { label: "Tipo Combustible", to: "/tipo-combustible" },
    { label: "Usuarios", to: "/usuarios" },
    { label: "Marcas", to: "/marcas" },
    { label: "Modelos", to: "/modelos" },
    { label: "Vehiculos", to: "/vehiculos" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img
                src="/1.png"
                alt="Accelerilate"
                className="h-16 w-auto mr-2"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
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

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!usuarioAutenticado ? (
                <>
                  <Link to="/login">
                    <button className="text-sm px-4 py-2 rounded hover:bg-gray-100 transition">
                      Iniciar Sesión
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                      Registrarse
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white shadow">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={handleLinkClick}
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="border-t px-4 py-3">
              {!usuarioAutenticado ? (
                <>
                  <Link to="/login" onClick={handleLinkClick}>
                    <button className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded">
                      Iniciar Sesión
                    </button>
                  </Link>
                  <Link to="/register" onClick={handleLinkClick}>
                    <button className="w-full text-left px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2">
                      Registrarse
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLinkClick();
                    handleLogout();
                  }}
                  className="w-full text-left px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Contenido */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-200 text-sm">
        © 2025 Accelerilate. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Layout;
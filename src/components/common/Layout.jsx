import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
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

  // Rutas agrupadas por "tipo"
  const navGroups = [
    {
      title: "Principal",
      links: [{ label: "Inicio", to: "/" }],
    },
    {
      title: "Gestión de Usuarios",
      links: [
        { label: "Empleados", to: "/empleados" },
        { label: "Usuarios", to: "/usuarios" },
        { label: "Roles", to: "/roles" },
        { label: "Reservas", to: "/reservas" },
      ],
    },
    {
      title: "Gestion de Vehículos",
      links: [
        { label: "Tipo Vehículos", to: "/tipo-vehiculos" },
        { label: "Tipo Combustible", to: "/tipo-combustible" },
        { label: "Marcas", to: "/marcas" },
        { label: "Modelos", to: "/modelos" },
        { label: "Vehículos", to: "/vehiculos" },
      ],
    },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar de Escritorio */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/1.png"
                alt="Accelerilate"
                className="h-12 w-auto mr-3"
              />
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navGroups.map((group) => (
                <div key={group.title} className="relative">
                  {group.links.length > 1 ? (
                    <>
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center"
                      >
                        {group.title}
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform ${
                            openGroups[group.title] ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {openGroups[group.title] && (
                        <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-48 border">
                          {group.links.map(({ label, to }) => (
                            <NavLink
                              key={label}
                              to={to}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                              onClick={handleLinkClick}
                            >
                              {label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={group.links[0].to}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                      {group.links[0].label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Botones de Autenticación */}
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
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-200 text-sm">
        © {new Date().getFullYear()} Accelerilate. Todos los derechos
        reservados.
      </footer>
    </div>
  );
};

export default Layout;

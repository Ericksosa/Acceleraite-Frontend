import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(null);
  const [openGroups, setOpenGroups] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) {
      setUsuarioAutenticado(false);
      setRolUsuario(null);
      navigate("/", { replace: true });
      return;
    }

    try {
      const userObj = JSON.parse(usuarioStr);
      const roleVal = userObj?.rolNombre || userObj?.rol || userObj?.role || "";
      setUsuarioAutenticado(true);
      setRolUsuario(roleVal);

      const roleNormalized = String(roleVal).toLowerCase();
      const isAdmin =
        roleNormalized.includes("admin") ||
        roleNormalized.includes("administrador") ||
        roleNormalized.includes("administrator");

      if (!isAdmin) {
        // si no es admin, lo mandamos al home público (cliente)
        navigate("/", { replace: true });
      }
    } catch (error) {
      setUsuarioAutenticado(false);
      setRolUsuario(null);
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuarioAutenticado(false);
    setRolUsuario(null);
    navigate("/", { replace: true });
  };

  const navGroups = [
    {
      title: "Principal",
      links: [{ label: "Inicio", to: "/admin/dashboard" }],
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

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/admin/dashboard" className="flex items-center">
              <img src="/1.png" alt="Accelerilate" className="h-12 w-auto mr-3" />
            </Link>

            {/* Botón móvil */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((s) => !s)}
                aria-label="Abrir menú"
                className="p-2 rounded-md"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {openGroups[group.title] && (
                        <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-48 border">
                          {group.links.map(({ label, to }) => (
                            <NavLink
                              key={label}
                              to={to}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm ${isActive ? "bg-blue-50" : "text-gray-700"}`
                              }
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
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-700"}`
                      }
                    >
                      {group.links[0].label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Botones Auth (desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {!usuarioAutenticado ? (
                <>
                  <Link to="/login">
                    <button className="text-sm px-4 py-2 rounded hover:bg-gray-100 transition">Iniciar Sesión</button>
                  </Link>
                  <Link to="/register">
                    <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                      Registrarse
                    </button>
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menú móvil (drawer) */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-1">
              {navGroups.map((group) =>
                group.links.map(({ label, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? "bg-blue-50" : "text-gray-700"}`}
                    onClick={handleLinkClick}
                  >
                    {label}
                  </NavLink>
                ))
              )}

              <div className="pt-2">
                {!usuarioAutenticado ? (
                  <>
                    <Link to="/login">
                      <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Iniciar Sesión</button>
                    </Link>
                    <Link to="/register">
                      <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Registrarse</button>
                    </Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded bg-red-600 text-white">
                    Cerrar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-200 text-sm">
        © {new Date().getFullYear()} Accelerilate. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Layout;
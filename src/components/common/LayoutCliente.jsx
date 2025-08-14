import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const LayoutCliente = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [rolUsuario, setRolUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Si está en /sobre-nosotros no hacemos validación de login ni rol
    if (currentPath === "/sobre-nosotros") {
      return;
    }

    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) {
      setUsuarioAutenticado(false);
      setRolUsuario(null);
      navigate("/", { replace: true });
      return;
    }

    try {
      const userObj = JSON.parse(usuarioStr);
      const roleVal =
        userObj?.rolNombre || userObj?.rol || userObj?.role || "";
      setUsuarioAutenticado(true);
      setRolUsuario(roleVal);

      if (
        roleVal !== "cliente" &&
        roleVal !== "Cliente" &&
        roleVal !== 2 &&
        roleVal !== "2"
      ) {
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
      title: "Secundaria",
      links: [{ label: "Inicio", to: "/" }],
    },
    {
      links: [{ label: "Sobre nosotros", to: "/sobre-nosotros" }],
    },
    {
      title: "Servicios",
      links: [{ label: "Servicios", to: "/Servicios" }],
    },
  ];

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
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
              {navGroups.map((group) =>
                group.links.map(({ label, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-700"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))
              )}
            </nav>

            {/* Botones Auth (desktop) */}
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

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-3">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs uppercase font-semibold text-gray-500 px-3">
                    {group.title}
                  </h3>
                  {group.links.length > 0 ? (
                    group.links.map(({ label, to }) => (
                      <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded ${
                            isActive ? "bg-blue-50" : "text-gray-700"
                          }`
                        }
                        onClick={handleLinkClick}
                      >
                        {label}
                      </NavLink>
                    ))
                  ) : (
                    <p className="px-3 py-1 text-gray-400 text-sm">Próximamente</p>
                  )}
                </div>
              ))}

              <div className="pt-2">
                {!usuarioAutenticado ? (
                  <>
                    <Link to="/login">
                      <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                        Iniciar Sesión
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                        Registrarse
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded bg-red-600 text-white"
                  >
                    Cerrar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      <footer className="bg-white text-gray-700 text-center py-4 border-t border-blue-200 text-sm">
        © {new Date().getFullYear()} Accelerilate. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default LayoutCliente;
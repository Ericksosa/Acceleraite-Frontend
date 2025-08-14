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
    <div className="min-h-screen relative isolate flex flex-col bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Decorative background (sutil y no intrusivo) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -right-24 w-72 h-72 rounded-full bg-sky-300/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-300/15 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-cyan-300/15 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Navbar de Escritorio */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl ring-1 ring-white/60 shadow-lg shadow-sky-100/40">
        {/* Divider inferior con gradiente suave */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/1.png"
                alt="Accelerilate"
                className="h-12 w-auto mr-3 transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              {navGroups.map((group) => (
                <div key={group.title} className="relative">
                  {group.links.length > 1 ? (
                    <>
                      <button
                        onClick={() => toggleGroup(group.title)}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition flex items-center"
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
                        <div className="absolute mt-2 right-0 bg-white/90 backdrop-blur-xl shadow-xl rounded-xl py-2 w-52 border border-slate-200/60 ring-1 ring-white/60">
                          {group.links.map(({ label, to }) => (
                            <NavLink
                              key={label}
                              to={to}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition rounded-md"
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
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition"
                    >
                      {group.links[0].label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Botones de Autenticación */}
            <div className="hidden md:flex items-center space-x-3">
              {!usuarioAutenticado ? (
                <>
                  <Link to="/login">
                    <button className="text-sm px-4 py-2 rounded-lg text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition ring-1 ring-slate-200">
                      Iniciar Sesión
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="text-sm text-white px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition">
                      Registrarse
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm text-white px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 shadow-sm hover:shadow transition"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow">
        {/* Contenedor con padding coherente al hero */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/70 backdrop-blur-xl text-slate-700 text-center py-4 ring-1 ring-white/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
        <p className="text-sm">
          © {new Date().getFullYear()} Accelerilate. Todos los derechos reservados.
        </p>
      </footer>

      {/* Animaciones */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(24px, -30px) scale(1.04); }
          66% { transform: translate(-18px, 22px) scale(0.96); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob { animation: blob 14s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Layout;
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
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
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-white text-black text-center py-4 border-t border-blue-200">
        © 2025 Accelerilate
      </footer>
    </div>
  );
};

export default Layout;
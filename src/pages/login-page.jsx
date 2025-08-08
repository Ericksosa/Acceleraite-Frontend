import  React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../services/UsuariosServices";


const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const usuario = await loginUsuario(formData.correo, formData.password);
      console.log("Usuario autenticado:", usuario);

      // Guarda la sesión (opcional)
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirige al dashboard (o la vista que tú tengas)
      navigate("/"); // Cambia esta ruta si es diferente
    } catch (error) {
      alert("Correo o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isLoading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-600 text-sm">¿No tienes cuenta?</span>{" "}
          <Link to="/register" className="text-blue-500 hover:underline text-sm">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );




};

export default LoginPage;
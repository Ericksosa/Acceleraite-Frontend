import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../services/UsuariosServices";
import { Mail, Lock, Eye, EyeOff, Car, ArrowLeft, Loader2 } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const usuario = await loginUsuario(formData.correo, formData.password);
      console.log("Usuario autenticado:", usuario);

      // Guarda la sesión (opcional)
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirige al dashboard (o la vista que tú tengas)
      navigate("/"); // Cambia esta ruta si es diferente
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-700 text-white min-h-screen flex items-center justify-center px-6">
      {/* Figuras decorativas */}

      <header className="absolute top-0 left-0 w-full bg-transparent p-4 flex justify-between items-center z-10">
        <Link
          to="/"
          className="flex items-center text-white hover:text-sky-200 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al inicio
        </Link>
      </header>
      
      <div className="absolute -right-20 -top-20 opacity-20 w-96 h-96 rounded-full bg-white blur-3xl rotate-45" />
      <div className="absolute -left-32 bottom-0 opacity-10 w-72 h-72 rounded-full bg-white blur-2xl" />

      {/* Card del login */}
      <div className="relative bg-white/95 text-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-700 to-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Inicia sesión para continuar con tu experiencia
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                name="correo"
                type="email"
                value={formData.correo || ""}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Tu contraseña"
                required
                className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition"
                aria-label="Mostrar contraseña"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          <div className="text-sm text-center text-slate-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-sky-700 font-medium hover:underline"
            >
              Crear cuenta
            </Link>
          </div>

          <div className="text-xs text-center text-slate-500 mt-2">
            Al iniciar sesión aceptas nuestros{" "}
            <Link to="/terms" className="text-sky-700 underline">
              Términos
            </Link>{" "}
            y{" "}
            <Link to="/privacy" className="text-sky-700 underline">
              Política de privacidad
            </Link>
            .
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

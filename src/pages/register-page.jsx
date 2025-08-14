import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Register attempt:", formData);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-700 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full bg-transparent p-4 flex justify-between items-center z-10">
        <Link
          to="/"
          className="flex items-center text-white hover:text-sky-200 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al inicio
        </Link>
      </header>

      {/* Figuras decorativas */}
      <div className="absolute -right-20 -top-20 opacity-20 w-96 h-96 rounded-full bg-white blur-3xl rotate-45" />
      <div className="absolute -left-32 bottom-0 opacity-10 w-72 h-72 rounded-full bg-white blur-2xl" />

      {/* Contenido */}
      <div className="flex-grow flex items-center justify-center px-6 pt-20">
        <div className="relative bg-white/95 text-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md w-full max-w-md">
          {/* Encabezado */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-700 to-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Crear Cuenta</h1>
            <p className="text-sm text-slate-600 mt-1">
              Únete a RentCar y comienza tu aventura
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Juan"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full py-3 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Pérez"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="+1 (555) 123-4567"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Repite tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
                <label className="text-sm text-slate-600 leading-5">
                  Acepto los{" "}
                  <Link to="/terms" className="text-sky-700 hover:underline">
                    Términos de Servicio
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-sky-700 hover:underline">
                    Política de Privacidad
                  </Link>
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="acceptMarketing"
                  checked={formData.acceptMarketing}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <label className="text-sm text-slate-600 leading-5">
                  Quiero recibir ofertas especiales y promociones por email
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow disabled:opacity-50"
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            <div className="text-sm text-center text-slate-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-sky-700 font-medium hover:underline"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;

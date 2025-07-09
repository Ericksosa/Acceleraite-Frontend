import FormularioUsuario from "../../components/FormularioUsuario";
import { crearUsuario } from "../../services/UsuariosServices";
import { useNavigate } from "react-router-dom";

const CrearUsuario = () => {
  const navigate = useNavigate();

  const handleSubmit = async (usuario) => {
    await crearUsuario(usuario);
    navigate("/usuarios");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Crear Usuario</h2>
        <FormularioUsuario onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CrearUsuario;
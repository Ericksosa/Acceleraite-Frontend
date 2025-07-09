import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editarUsuario, obtenerUsuarios } from "../../services/UsuariosServices";
import FormularioUsuario from "../../components/FormularioUsuario";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const usuario = await obtenerUsuarios();
      const encontrado = usuario.find((e) => e.id === parseInt(id));
      setUsuario(encontrado);
    };
    cargar();
  }, [id]);

  const handleSubmit = async (datosActualizados) => {
    await editarUsuario(id, datosActualizados);
    navigate("/usuarios");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Editar Usuario</h2>
        {usuario ? (
          <FormularioUsuario usuarioInicial={usuario} onSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Cargando datos del usuario...</p>
        )}
      </div>
    </div>
  );
};

export default EditarUsuario;
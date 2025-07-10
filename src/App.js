import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaRolesComponentes from './pages/ListaRolesComponentes';
import TemporalHome from './components/Home';
import ListaTipoVehiculosComponentes from './pages/ListaTipoVehiculosComponentes';
import ListaMarcasComponentes from './pages/ListaMarcasComponentes';
import ListaEmpleadosComponentes from './pages/ListaEmpleadosComponentes';
import ListaTipoCombustibleComponentes   from './pages/ListaRolesComponentes';
import ListaUsuarioComponentes from './pages/ListaUsuarioComponentes';
import CrearEmpleado from './pages/empleados/CrearEmpleado';
import EditarEmpleado from './pages/empleados/EditarEmpleado';
import CrearUsuario from './pages/usuario/CrearUsuario';
import EditarUsuario from './pages/usuario/EditarUsuario';
import CrearTipoVehiculo from './pages/tipovehiculos/CrearTipoVehiculo';
import EditarTipoVehiculo from './pages/tipovehiculos/EditarTipoVehiculo';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import CrearMarca from './pages/marcas/CrearMarca';
import EditarMarca from './pages/marcas/EditarMarca';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemporalHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/roles" element={<ListaRolesComponentes />} />
        <Route path="/tipo-vehiculos" element={<ListaTipoVehiculosComponentes />} />
        <Route path="/marcas" element={<ListaMarcasComponentes />} />
        <Route path="/tipo-vehiculos/crear" element={<CrearTipoVehiculo />} />
        <Route path="/tipo-vehiculos/editar/:id" element={<EditarTipoVehiculo />} />
        <Route path="/marcas/crear" element={<CrearMarca />} />
        <Route path="/marcas/editar/:id" element={<EditarMarca />} />
        <Route path="/empleados" element={<ListaEmpleadosComponentes />} />
        <Route path="/empleados/crear" element={<CrearEmpleado />} />
        <Route path="/empleados/editar/:id" element={<EditarEmpleado />} />
        <Route path="/tipo-combustible" element={<ListaTipoCombustibleComponentes />} />
        <Route path="/usuarios" element={<ListaUsuarioComponentes />} />
        <Route path="/usuarios/crear" element={<CrearUsuario />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;

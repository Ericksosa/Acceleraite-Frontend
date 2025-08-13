import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaRolesComponentes from './pages/ListaRolesComponentes';
import TemporalHome from './components/Home.jsx';
import ListaTipoVehiculosComponentes from './pages/ListaTipoVehiculosComponentes';
import ListaMarcasComponentes from './pages/ListaMarcasComponentes';
import ListaModelosComponentes from './pages/ListaModelosComponentes';
import ListaEmpleadosComponentes from './pages/ListaEmpleadosComponentes';
import ListaTipoCombustibleComponentes from './pages/ListaTipoCombustibleComponentes';
import CrearTipoCombustible from './pages/tipo-combustible/CrearTipoCombustible';
import EditarTipoCombustible from './pages/tipo-combustible/EditarTipoCombustible';
import ListaUsuarioComponentes from './pages/ListaUsuarioComponentes';
import ListaVehiculosComponentes from './pages/ListaVehiculosComponentes';
import ListaReservasComponentes from './pages/ListaReservasComponentes';
import CrearEmpleado from './pages/empleados/CrearEmpleado';
import EditarEmpleado from './pages/empleados/EditarEmpleado';
import CrearUsuario from './pages/usuario/CrearUsuario';
import EditarUsuario from './pages/usuario/EditarUsuario';
import CrearTipoVehiculo from './pages/tipo-vehiculos/CrearTipoVehiculo';
import EditarTipoVehiculo from './pages/tipo-vehiculos/EditarTipoVehiculo';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import CrearMarca from './pages/marcas/CrearMarca';
import EditarMarca from './pages/marcas/EditarMarca';
import CrearModelos from './pages/modelos/CrearModelos';
import EditarModelos from './pages/modelos/EditarModelos';
import CrearVehiculo from './pages/vehiculos/CrearVehiculo';
import EditarVehiculo from './pages/vehiculos/EditarVehiculo';
import CrearReserva from './pages/reservas/CrearReserva';
import EditarReserva from './pages/reservas/EditarReserva';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeCliente />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/roles" element={<ListaRolesComponentes />} />
        <Route path="/tipo-vehiculos" element={<ListaTipoVehiculosComponentes />} />
        <Route path="/marcas" element={<ListaMarcasComponentes />} />
        <Route path="/modelos" element={<ListaModelosComponentes />} />
        <Route path="/tipo-vehiculos/crear" element={<CrearTipoVehiculo />} />
        <Route path="/tipo-vehiculos/editar/:id" element={<EditarTipoVehiculo />} />
        <Route path="/marcas/crear" element={<CrearMarca />} />
        <Route path="/marcas/editar/:id" element={<EditarMarca />} />
        <Route path="/modelos/crear" element={<CrearModelos />} />
        <Route path="/modelos/editar/:id" element={<EditarModelos />} />
        <Route path="/empleados" element={<ListaEmpleadosComponentes />} />
        <Route path="/empleados/crear" element={<CrearEmpleado />} />
        <Route path="/empleados/editar/:id" element={<EditarEmpleado />} />
        <Route path="/tipo-combustible" element={<ListaTipoCombustibleComponentes />} />
        <Route path="/tipo-combustible/crear" element={<CrearTipoCombustible />} />
        <Route path="/tipo-combustible/editar/:id" element={<EditarTipoCombustible />} />
        <Route path="/usuarios" element={<ListaUsuarioComponentes />} />
        <Route path="/usuarios/crear" element={<CrearUsuario />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
        <Route path="/vehiculos" element={<ListaVehiculosComponentes />} />
        <Route path="/vehiculos/crear" element={<CrearVehiculo />} />
        <Route path="/vehiculos/editar/:id" element={<EditarVehiculo />} />
        <Route path="/admin/dashboard" element={<TemporalHome />} />
        <Route path="/reservas" element={<ListaReservasComponentes />} />
        <Route path="/reservas/crear" element={<CrearReserva />} />
        <Route path="/reservas/editar/:id" element={<EditarReserva />} />

      </Routes>
    </Router>
  );
}

export default App;

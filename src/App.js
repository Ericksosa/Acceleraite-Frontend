import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaRolesComponentes from './pages/ListaRolesComponentes';
import TemporalHome from './components/Home';
import ListaTipoVehiculosComponentes from './pages/ListaTipoVehiculosComponentes';
import ListaEmpleadosComponentes from './pages/ListaEmpleadosComponentes';
import ListaTipoCombustibleComponentes   from './pages/ListaRolesComponentes';
import ListaUsuarioComponentes from './pages/ListaUsuarioComponentes';
import CrearEmpleado from './pages/empleados/CrearEmpleado';
import EditarEmpleado from './pages/empleados/EditarEmpleado';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemporalHome />} />
        <Route path="/roles" element={<ListaRolesComponentes />} />
        <Route path="/tipo-vehiculos" element={<ListaTipoVehiculosComponentes />} />
        <Route path="/empleados" element={<ListaEmpleadosComponentes />} />
        <Route path="/empleados/crear" element={<CrearEmpleado />} />
        <Route path="/empleados/editar/:id" element={<EditarEmpleado />} />
        <Route path="/tipo-combustible" element={<ListaTipoCombustibleComponentes />} />
        <Route path="/usuarios" element={<ListaUsuarioComponentes />} />
      </Routes>
    </Router>
  );
}

export default App;

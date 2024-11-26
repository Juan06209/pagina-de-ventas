import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CatalogoPrendas from './components/CatalogoPrendas'; // Importa el componente del catálogo
import Home from './components/Home';
import Promociones from './components/Promociones';
import MetodoPago from './components/MetodoPago'; // Asegúrate de importar el componente
import ListadoCompras from './administrador/ListadoCompras';
import EditarCompra from './administrador/EditarCompra';
import HomeAdministrador from './administrador/HomeAdministrador';
import AgregarCompra from './administrador/AgregarCompra';
import ListadoPrendas from './administrador/ListadoPrendas';
import EditarPrenda from './administrador/EditarPrenda';
import AgregarPrenda from './administrador/AgregarPrenda';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/catalogo" element={<CatalogoPrendas />} />
        <Route path="/metodos-pago" element={<MetodoPago />} /> {/* Agrega esta línea */}
        <Route path="/listado" element={<ListadoCompras />} />
        <Route exact path="/editar/:id" element={<EditarCompra/>} />
        <Route exact path="/homeadmin" element={<HomeAdministrador/>} />
        <Route exact path="/agregar" element={<AgregarCompra/>} />
        <Route exact path="/listadoprenda" element={<ListadoPrendas/>} />
        <Route exact path="/editarprenda/:id" element={<EditarPrenda/>} />
        <Route exact path="/agregarprenda" element={<AgregarPrenda/>} />
        {/* Otras rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;

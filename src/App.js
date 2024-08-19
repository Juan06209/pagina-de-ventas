import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CatalogoPrendas from './components/CatalogoPrendas'; // Importa el componente del catálogo
import Home from './components/Home';
import Promociones from './components/Promociones';
import MetodoPago from './components/MetodoPago'; // Asegúrate de importar el componente

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
        {/* Otras rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './HomeAdministrador.css'; // Importa la hoja de estilos

export default function HomeAdministrador() {
    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#f0f0f0' }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/homeadmin">Avanfitt</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/listado">Compras</Link>
                            </li>
                            <li className="nav-item"> {/* Nueva etiqueta <li> para agregar el enlace en fila */}
                                <Link className="nav-link" to="/agregar">Agregar Compra</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/listadoprenda">Prendas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/agregarprenda">Agregar Prendas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Cerrar seción</Link>
                            </li>
                            {/* Agrega más enlaces aquí si es necesario */}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container my-4 text-white p-4 rounded text-center">
                <div className="bg-dark text-white p-4 rounded text-center">
                    <h2>Bienvenido, Administrador</h2>
                    <p>Desde aquí puedes gestionar las compras y realizar un seguimiento de las operaciones de la tienda.</p>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CatalogoPrendas.css';

function CatalogoPrendas() {
    const [prendas, setPrendas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/Avanfitt/Prendas')
            .then(response => {
                setPrendas(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las prendas:', error);
            });
    }, []);

    const handleBuyClick = () => {
        navigate('/metodos-pago');
    };

    const filteredPrendas = prendas.filter(prenda =>
        prenda.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prenda.precio.toString().includes(searchTerm)
    );

    return (
        <div className="catalogo-background">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Avanfitt</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Aquí podrías añadir más enlaces si lo necesitas */}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/promociones">Promociones</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={() => {
                                    // Lógica para cerrar sesión
                                }}>
                                    Cerrar sesión
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="catalogo-container">
                <h2>Catálogo de Prendas</h2>
                <input
                    type="text"
                    placeholder="Buscar por descripción o precio..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="catalogo-grid">
                    {filteredPrendas.length > 0 ? (
                        filteredPrendas.map((prenda) => (
                            <div key={prenda.idPrenda} className="catalogo-item">
                                <img src={prenda.imagen} alt={prenda.descripcion} />
                                <h3>{prenda.descripcion}</h3>
                                <p>Precio: ${prenda.precio}</p>
                                <p>Disponibilidad: {prenda.disponibilidad ? 'Disponible' : 'No disponible'}</p>
                                <div className="buy-container">
                                    <button className="buy-button" onClick={handleBuyClick}>Comprar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay prendas disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CatalogoPrendas;

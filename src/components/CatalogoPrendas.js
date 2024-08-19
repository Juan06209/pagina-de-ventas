import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Cambia useHistory a useNavigate
import './CatalogoPrendas.css';

function CatalogoPrendas() {
    const [prendas, setPrendas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Usa useNavigate

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
        navigate('/metodos-pago'); // Redirige a la página de métodos de pago
    };

    // Filtra las prendas según el término de búsqueda
    const filteredPrendas = prendas.filter(prenda =>
        prenda.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prenda.precio.toString().includes(searchTerm)
    );

    return (
        <div className="catalogo-background">
            <div className="catalogo-container">
                <div className="header">
                    <Link to="/" className="back-to-home">Volver al inicio</Link>
                    <h2>Catálogo de Prendas</h2>
                </div>
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
                                <img src={`http://localhost:8080/Avanfitt/Prendas/${prenda.idPrenda}/imagen`} alt={prenda.descripcion} />
                                <h3>{prenda.descripcion}</h3>
                                <p>Precio: ${prenda.precio}</p>
                                <p>Disponibilidad: {prenda.disponibilidad ? 'Disponible' : 'No disponible'}</p>
                                <button className="buy-button" onClick={handleBuyClick}>Comprar</button> {/* Agrega la función handleBuyClick */}
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

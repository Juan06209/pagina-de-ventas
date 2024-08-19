import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MetodoPago.css'; // Importa el archivo CSS aquí
import { Link } from 'react-router-dom';

function MetodoPago() {
    const [metodosDePago, setMetodosDePago] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/Avanfitt/metodoDePago')
    .then(response => {
        console.log(response.data); // Verifica la estructura de los datos
        setMetodosDePago(response.data);
    })
    .catch(error => {
        console.error('Hubo un error al obtener los métodos de pago:', error);
    });

    }, []);

    const handleSelect = (metodo) => {
        // Lógica para seleccionar el método de pago
        console.log('Método de pago seleccionado:', metodo);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand ms-3" href="/">Avanfitt</a>
                <div className="ms-auto me-3">
                    <Link className="btn btn-light" to="/catalogo">Volver al Catálogo</Link>
                </div>
            </nav>
            <div className="metodo-pago-background">
                <div className="metodo-pago-container">
                    <h2>Métodos de Pago</h2>
                    {metodosDePago.length > 0 ? (
                        <table className="table metodo-pago-table">
                            <thead>
                                <tr>
                                    <th>Tipo de Cuenta</th>
                                    <th>Número de Cuenta</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metodosDePago.map((metodo) => (
                                    <tr key={metodo.idMetodoDePago}>
                                        <td>{metodo.tiPoDeCuenta}</td>
                                        <td>{metodo.ncuenta}</td>
                                        <td>
                                            <button 
                                                className="btn btn-dark" 
                                                onClick={() => handleSelect(metodo)}
                                            >
                                                Seleccionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay métodos de pago disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MetodoPago;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Promociones.css'; 
import { useNavigate } from 'react-router-dom';

function Promociones() {
    const [promociones, setPromociones] = useState([]);
    const navigate = useNavigate(); // Hook para redirección

    useEffect(() => {
        axios.get('http://localhost:8080/Avanfitt/promociones')
            .then(response => {
                setPromociones(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las promociones:', error);
            });
    }, []);

    const getPrendasRequeridas = (tipoDeDescuento) => {
        switch (tipoDeDescuento) {
            case 10:
                return '5 prendas';
            case 17:
                return '8 prendas';
            case 20:
                return '10 prendas';
            case 25:
                return '15 prendas';
            case 30:
                return '20 prendas';
            default:
                return 'Desconocido';
        }
    };

    return (
        <div className="promociones-background">
            <div className="container mt-5 promociones-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button className="btn btn-link volver-btn" onClick={() => navigate('/catalogo')}>Volver al catálogo</button>
                    <h2 className="text-center m-0">Promociones Disponibles</h2>
                </div>
                {promociones.length > 0 ? (
                    <table className="table table-dark table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Tipo de Descuento</th>
                                <th>Prendas Necesarias</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promociones.map((promocion) => (
                                <tr key={promocion.idPromocion}>
                                    <td>{promocion.tipoDeDescuento}%</td>
                                    <td>{getPrendasRequeridas(promocion.tipoDeDescuento)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay promociones disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default Promociones;

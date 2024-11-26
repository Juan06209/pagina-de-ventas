import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [direccion, setDireccion] = useState('');
    const [tel, setTel] = useState('');
    const [cc, setCc] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [inputError, setInputError] = useState(''); 
    const navigate = useNavigate(); // Hook para redirección

    // Función para validar solo números en los campos de Cédula y Teléfono
    const handleNumberInput = (e, setState) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Expresión regular para validar solo números
            setState(value);
            setInputError(''); // Limpiar mensaje de error si la entrada es válida
        } else {
            setInputError('No puedes ingresar ese tipo de caracteres. Solo se permiten números.'); // Mostrar mensaje de error
            
            // Desaparecer el mensaje de error después de 5 segundos
            setTimeout(() => {
                setInputError('');
            }, 5000);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar campos del formulario
        if (!nombre || !contraseña || !direccion || !tel || !cc) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const nuevoComprador = {
            nombre,
            contraseña,
            direccion,
            tel,
            cc
        };

        axios.post('http://localhost:8080/Avanfitt/Compradores', nuevoComprador)
            .then(response => {
                console.log('Registro exitoso:', response.data);
                setSuccessMessage('Registro realizado con éxito'); // Mensaje de éxito
                setTimeout(() => {
                    navigate('/catalogo'); // Redirigir a la página de inicio después de 2 segundos
                }, 2000);
            })
            .catch(error => {
                console.error('Hubo un error registrando al comprador:', error);
                setErrorMessage('Error al registrar al comprador. Inténtalo de nuevo.'); // Mensaje de error
            });
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="signup-form">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button className="btn btn-link volver-btn" onClick={() => navigate('/')}>Volver al Inicio</button>
                    <h2 className="text-center m-0">Registrarse</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input
                            id="contraseña"
                            type="password"
                            className="form-control"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            id="direccion"
                            type="text"
                            className="form-control"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="tel">Teléfono</label>
                        <input
                            id="tel"
                            type="text"
                            className="form-control"
                            value={tel}
                            onChange={(e) => handleNumberInput(e, setTel)} // Validar solo números
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="cc">Cédula</label>
                        <input
                            id="cc"
                            type="text"
                            className="form-control"
                            value={cc}
                            onChange={(e) => handleNumberInput(e, setCc)} // Validar solo números
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Registrarse</button>
                </form>
                {inputError && <div className="alert alert-danger mt-3">{inputError}</div>}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default Signup;

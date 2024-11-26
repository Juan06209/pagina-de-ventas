import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para redirección

    const handleSubmit = (event) => {
        event.preventDefault();

        if (nombre === 'Admin' && contraseña === 'Admin11991') {
            // Redirigir a la página de administrador si las credenciales son las del admin
            navigate('/homeadmin');
        } else {
            const loginData = {
                nombre,
                contraseña
            };

            axios.post('http://localhost:8080/Avanfitt/login', loginData)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Login exitoso:', response.data);
                        navigate('/catalogo'); // Redirige a la página del catálogo
                    }
                })
                .catch(error => {
                    console.error('Hubo un error en el login:', error);
                    setErrorMessage('Nombre o contraseña inválidos.'); // Mensaje de error
                });
        }
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center min-vh-100">
            <div className="login-form bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <button className="btn btn-link volver-btn" onClick={() => navigate('/')}>Volver al Inicio</button>
                    <h2 className="text-center m-0">Iniciar Sesión</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Nombre</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={contraseña} 
                            onChange={(e) => setContraseña(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Iniciar Sesión</button>
                </form>
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default Login;

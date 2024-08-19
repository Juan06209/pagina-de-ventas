import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Home.css'; // Importa el archivo CSS para estilos adicionales

function Home() {
    return (
        <div className="home-background">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Avanfitt</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/promociones">Promociones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogo">Catálogo</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container text-center text-light mt-5">
            <h1>Bienvenidos a Avanfitt</h1>
                <p>
                    En <strong>Avanfitt</strong>, transformamos tu pasión por el deporte en un estilo de vida. Somos tu destino de confianza para ropa deportiva de alta calidad que no solo te hace lucir bien, sino que también te ofrece el máximo rendimiento. Desde prendas elegantes para entrenamientos intensos hasta atuendos cómodos para tus días de descanso, tenemos todo lo que necesitas para destacar en cada ocasión.
                </p>
                <p>
                    ¿Por qué elegir Avanfitt? Aquí te dejamos algunas razones:
                </p>
                <ul className="list-unstyled">
                    <li>🌟 **Calidad Superior**: Solo trabajamos con materiales de primera que garantizan durabilidad y confort.</li>
                    <li>🎯 **Diseño Innovador**: Nuestras prendas combinan funcionalidad con estilo, perfectas para cualquier actividad física.</li>
                    <li>🚀 **Entrega Rápida**: Nos aseguramos de que recibas tu pedido en el menor tiempo posible para que no pierdas ni un minuto en tu rutina.</li>
                    <li>💬 **Atención Personalizada**: Nuestro equipo está siempre listo para ayudarte con cualquier consulta o recomendación que necesites.</li>
                </ul>
                <p>
                    Explora nuestro <Link to="/catalogo" className="footer-link">Catálogo</Link> y descubre cómo Avanfitt puede ser tu aliado en cada paso hacia una vida activa y saludable. ¡Te esperamos con los brazos abiertos!
                </p>
            </div>

            <footer className="footer bg-dark text-light mt-5">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-md-4">
                            <h5>Enlaces Rápidos</h5>
                            <ul className="list-unstyled">
                                <li><Link className="footer-link" to="/catalogo">Catálogo</Link></li>
                                <li><Link className="footer-link" to="/promociones">Promociones</Link></li>
                                <li><Link className="footer-link" to="/login">Login</Link></li>
                                <li><Link className="footer-link" to="/signup">Sign Up</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contacto</h5>
                            <p>Juan Camilo Hernández Gómez</p>
                            <p>Email: juancamilohernandezgome1@gmail.com</p>
                            <p>Teléfono: +57 3015061515</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <p>&copy; {new Date().getFullYear()} Avanfitt. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;

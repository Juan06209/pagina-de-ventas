import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarPrenda() {
    let navegacion = useNavigate();

    const [prenda, setPrenda] = useState({
        descripcion: "",
        precio: "",
        disponibilidad: "",
        imagen: "",
    });

    const { descripcion, precio, disponibilidad, imagen } = prenda;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setPrenda({ ...prenda, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/Avanfitt/Prendas";
        await axios.post(urlBase, prenda);
        navegacion("/listadoprenda");
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3 style={{ color: "white" }}>Registrar Prenda</h3> {/* Título en blanco */}
            </div>

            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="precio"
                        name="precio"
                        value={precio}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="disponibilidad" className="form-label">Disponibilidad</label>
                    <input
                        type="text"
                        className="form-control"
                        id="disponibilidad"
                        name="disponibilidad"
                        value={disponibilidad}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">URL de Imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imagen"
                        name="imagen"
                        value={imagen}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="container text-center">
                    <button type="submit" className="btn btn-primary me-3">Registrar</button>
                    <a href="/listadoprenda" className="btn btn-danger">Volver</a>
                </div>
            </form>
        </div>
    );
}

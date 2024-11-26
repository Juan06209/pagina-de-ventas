import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarPrenda() {
    const urlBase = "http://localhost:8080/Avanfitt/Prendas";
    const navegacion = useNavigate();
    const { id } = useParams();

    const [prenda, setPrenda] = useState({
        descripcion: "",
        precio: "",
        disponibilidad: "",
        imagen: "",
    });

    const { descripcion, precio, disponibilidad, imagen } = prenda;

    // Función para cargar los datos de la prenda
    const cargarPrenda = useCallback(async () => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`);
            setPrenda(resultado.data);
        } catch (error) {
            console.error("Error al cargar prenda:", error);
        }
    }, [id]);

    useEffect(() => {
        cargarPrenda();
    }, [cargarPrenda]);

    // Manejo de cambios en el formulario
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setPrenda({ ...prenda, [name]: value });
    };

    // Manejo del envío del formulario
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                descripcion: prenda.descripcion,
                precio: prenda.precio,
                disponibilidad: prenda.disponibilidad,
                imagen: prenda.imagen
            };
            console.log("Payload:", payload);
            const response = await axios.put(`${urlBase}/${id}`, payload);
            console.log("Response:", response.data);
            alert("Prenda actualizada con éxito");
            navegacion("/listadoprenda");
        } catch (error) {
            console.error("Error al actualizar prenda:", error);
            alert("Error al actualizar la prenda");
        }
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3 style={{ color: "white" }}>Editar prenda</h3>
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
                    <label htmlFor="imagen" className="form-label">Imagen (URL)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imagen"
                        name="imagen"
                        value={imagen}
                        onChange={onInputChange}
                    />
                </div>

                <div className="container text-center">
                    <button type="submit" className="btn btn-primary me-3">Guardar</button>
                    <a href="/listadoprenda" className="btn btn-danger">Volver</a>
                </div>
            </form>
        </div>
    );
}

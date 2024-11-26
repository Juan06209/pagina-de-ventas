import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoPrendas() {
    const urlBase = "http://localhost:8080/Avanfitt/Prendas";
    const [prendas, setPrendas] = useState([]);

    const cargarPrendas = async () => {
        try {
            const resultado = await axios.get(urlBase);
            console.log("Datos recibidos:", resultado.data);
            setPrendas(resultado.data);
        } catch (error) {
            console.error("Error al cargar prendas:", error);
        }
    };

    const eliminarPrenda = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarPrendas();
    };

    useEffect(() => {
        cargarPrendas();
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center" style={{ margin: "30px" }}>
                <Link to="/homeadmin" className="btn btn-dark">Volver</Link> {/* Cambiado a btn-dark */}
                <h3 className="text-white">Prendas</h3>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Disponibilidad</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prendas.map((prenda) => (
                        <tr key={prenda.idPrenda}>
                            <th scope="row">{prenda.idPrenda}</th>
                            <td>{prenda.descripcion}</td>
                            <td>
                                <NumericFormat
                                    value={prenda.precio}
                                    displayType={"text"}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix={"$"}
                                    decimalScale={0}
                                    fixedDecimalScale
                                />
                            </td>
                            <td>{prenda.disponibilidad}</td>
                            <td>
                                <img src={prenda.imagen} alt={prenda.descripcion} style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>
                                <div>
                                    <Link
                                        to={`/editarprenda/${prenda.idPrenda}`}
                                        className="btn btn-warning btn-sm me-3"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => eliminarPrenda(prenda.idPrenda)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

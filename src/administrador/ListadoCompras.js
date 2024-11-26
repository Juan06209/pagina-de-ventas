import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoCompras() {
    const urlBase = "http://localhost:8080/Avanfitt/compras";
    const [compras, setCompras] = useState([]);

    const cargarCompras = async () => {
        try {
            const resultado = await axios.get(urlBase);
            console.log("Datos recibidos:", resultado.data); 
            setCompras(resultado.data);
        } catch (error) {
            console.error("Error al cargar compras:", error);
        }
    };

    const eliminarCompra = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarCompras();
    };

    useEffect(() => {
        cargarCompras();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f0f0f0" }}>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between" style={{ margin: "30px 0" }}>
                    <Link to="/homeadmin" className="btn btn-dark" style={{ marginRight: "15px" }}>
                        Volver
                    </Link>
                    <h3 className="text-white">Compras</h3>
                </div>

                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Comprador</th>
                            <th scope="col">Método de Pago</th>
                            <th scope="col">Promoción</th>
                            <th scope="col">Acciones</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map((compra, indice) => (
                            <tr key={indice}>
                                <th scope="row">{compra.idCompra}</th>
                                <td>
                                    <NumericFormat
                                        value={compra.precio}
                                        displayType={"text"}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix={"$"}
                                        decimalScale={0}
                                        fixedDecimalScale
                                    />
                                </td>
                                <td>{compra.cantidad}</td>
                                <td>{compra.comprador ? compra.comprador.nombre : "Sin asignar"}</td> 
                                <td>{compra.metododepago ? compra.metododepago.tiPoDeCuenta : "Sin asignar"}</td>
                                <td>{compra.promocion ? compra.promocion.tipoDeDescuento : "Sin asignar"}</td>
                                <td>
                                    <div>
                                        <Link
                                            to={`/editar/${compra.idCompra}`}
                                            className="btn btn-warning btn-sm me-3"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => eliminarCompra(compra.idCompra)}
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
        </div>
    );
}

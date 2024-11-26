import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarCompra() {
    const urlBase = "http://localhost:8080/Avanfitt/compras";
    const urlMetodosDePago = "http://localhost:8080/Avanfitt/metodoDePago";
    const urlCompradores = "http://localhost:8080/Avanfitt/compradores";
    const urlPromociones = "http://localhost:8080/Avanfitt/promociones";
    const navegacion = useNavigate();
    const { id } = useParams();

    const [compra, setCompra] = useState({
        cantidad: "",
        precio: "",
        metododepago: "",
        comprador: "",
        promocion: "",
    });

    const [metodosdepago, setMetodosDePago] = useState([]);
    const [compradores, setCompradores] = useState([]);
    const [promociones, setPromociones] = useState([]);

    const { cantidad, precio, metododepago, comprador, promocion } = compra;

    const cargarCompra = useCallback(async () => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`);
            setCompra({
                ...resultado.data,
                metododepago: resultado.data.metododepago.idMetodoDePago,
                comprador: resultado.data.comprador.idComprador,
                promocion: resultado.data.promocion.idPromocion,
            });
        } catch (error) {
            console.error("Error al cargar compra:", error);
        }
    }, [id]);

    const cargarMetodoDePago = useCallback(async () => {
        try {
            const resultado = await axios.get(urlMetodosDePago);
            setMetodosDePago(resultado.data);
        } catch (error) {
            console.error("Error al cargar metodos de pago:", error);
        }
    }, []);

    const cargarComprador = useCallback(async () => {
        try {
            const resultado = await axios.get(urlCompradores);
            setCompradores(resultado.data);
        } catch (error) {
            console.error("Error al cargar compradores:", error);
        }
    }, []);

    const cargarPromocion = useCallback(async () => {
        try {
            const resultado = await axios.get(urlPromociones);
            setPromociones(resultado.data);
        } catch (error) {
            console.error("Error al cargar promociones:", error);
        }
    }, []);

    useEffect(() => {
        cargarCompra();
        cargarMetodoDePago();
        cargarComprador();
        cargarPromocion();
    }, [cargarCompra, cargarMetodoDePago, cargarComprador, cargarPromocion]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCompra({ ...compra, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                cantidad: compra.cantidad,
                precio: compra.precio,
                metododepago: { idMetodoDePago: compra.metododepago },
                comprador: { idComprador: compra.comprador },
                promocion: { idPromocion: compra.promocion }
            };
            console.log("Payload:", payload);
            const response = await axios.put(`${urlBase}/${id}`, payload);
            console.log("Response:", response.data);
            alert("Compra actualizada con éxito");
            navegacion("/listado");
        } catch (error) {
            console.error("Error al guardar compra:", error);
            alert("Error al actualizar la compra");
        }
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3 style={{ color: "white" }}>Editar compra</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="cantidad"
                        name="cantidad"
                        value={cantidad}
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
                    <label htmlFor="metododepago" className="form-label">Metodo De Pago</label>
                    <select
                        className="form-select"
                        id="metododepago"
                        name="metododepago"
                        value={metododepago}
                        onChange={onInputChange}
                        required
                    >
                        <option value="" disabled>Seleccione un Metodo De Pago</option>
                        {metodosdepago.map((dep) => (
                            <option key={dep.idMetodoDePago} value={dep.idMetodoDePago}>
                                {dep.tiPoDeCuenta}-{dep.idMetodoDePago}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="comprador" className="form-label">Comprador</label>
                    <select
                        className="form-select"
                        id="comprador"
                        name="comprador"
                        value={comprador}
                        onChange={onInputChange}
                        required
                    >
                        <option value="" disabled>Seleccione un Comprador</option>
                        {compradores.map((dep) => (
                            <option key={dep.idComprador} value={dep.idComprador}>
                                {dep.nombre}-{dep.idComprador}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="promocion" className="form-label">Promocion</label>
                    <select
                        className="form-select"
                        id="promocion"
                        name="promocion"
                        value={promocion}
                        onChange={onInputChange}
                        required
                    >
                        <option value="" disabled>Seleccione una Promocion</option>
                        {promociones.map((dep) => (
                            <option key={dep.idPromocion} value={dep.idPromocion}>
                                {dep.tipoDeDescuento}-{dep.idPromocion}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="container text-center">
                    <button type="submit" className="btn btn-primary me-3">Guardar</button>
                    <a href="/listado" className="btn btn-danger">Volver</a>
                </div>
            </form>
        </div>
    );
}

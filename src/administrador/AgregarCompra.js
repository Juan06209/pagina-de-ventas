import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarCompra() {
    let navegacion = useNavigate();

    const [compra, setCompra] = useState({
        cantidad: "",
        precio: "",
        metododepago: null,
        comprador: null,
        promocion: null,
    });

    const [metodosdepago, setMetodosDePago] = useState([]);
    const [compradores, setCompradores] = useState([]);
    const [promociones, setPromociones] = useState([]);

    const { cantidad, precio, metododepago, comprador, promocion } = compra;

    useEffect(() => {
        const cargarMetodosDePago = async () => {
            const urlMetodosDePago = "http://localhost:8080/Avanfitt/metodoDePago";
            const resultado = await axios.get(urlMetodosDePago);
            setMetodosDePago(resultado.data);
        };
        cargarMetodosDePago();
    }, []);

    useEffect(() => {
        const cargarCompradores = async () => {
            const urlCompradores = "http://localhost:8080/Avanfitt/compradores";
            const resultado = await axios.get(urlCompradores);
            setCompradores(resultado.data);
        };
        cargarCompradores();
    }, []);

    useEffect(() => {
        const cargarPromociones = async () => {
            const urlPromociones = "http://localhost:8080/Avanfitt/promociones";
            const resultado = await axios.get(urlPromociones);
            setPromociones(resultado.data);
        };
        cargarPromociones();
    }, []);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCompra({ ...compra, [name]: value });
    };

    const onSelectMetodoDePagoChange = (e) => {
        const metodoDePagoId = e.target.value;
        const MetodoDePagoSeleccionado = metodosdepago.find(dep => dep.idMetodoDePago.toString() === metodoDePagoId);
        setCompra({ ...compra, metododepago: MetodoDePagoSeleccionado });
    };

    const onSelectCompradorChange = (e) => {
        const compradorId = e.target.value;
        const CompradorSeleccionado = compradores.find(dep => dep.idComprador.toString() === compradorId);
        setCompra({ ...compra, comprador: CompradorSeleccionado });
    };

    const onSelectPromocionChange = (e) => {
        const promocionId = e.target.value;
        const PromocionSeleccionado = promociones.find(dep => dep.idPromocion.toString() === promocionId);
        setCompra({ ...compra, promocion: PromocionSeleccionado });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/Avanfitt/compras";
        await axios.post(urlBase, compra);
        navegacion("/listado");
    };

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3 style={{ color: "white" }}>Registrar Compra</h3> {/* Título en blanco */}
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
                        value={metododepago ? metododepago.idMetodoDePago : ""}
                        onChange={onSelectMetodoDePagoChange}
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
                        value={comprador ? comprador.idComprador : ""}
                        onChange={onSelectCompradorChange}
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
                        value={promocion ? promocion.idPromocion : ""}
                        onChange={onSelectPromocionChange}
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
                    <button type="submit" className="btn btn-primary me-3">Registrar</button>
                    <a href="/listado" className="btn btn-danger">Volver</a>
                </div>
            </form>
        </div>
    );
}

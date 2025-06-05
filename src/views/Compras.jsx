import React, { useState, useEffect } from 'react';
import TablaCompras from '../components/compras/TablaCompras';
import ModalActualizacionCompra from '../components/compras/ModalActualizacionCompra';
import ModalDetallesCompra from '../components/detalles_compras/ModalDetallesCompra';
import ModalEliminacionCompra from '../components/compras/ModalEliminacionCompra';
import ModalRegistroCompra from '../components/compras/ModalRegistroCompra';
import { Container, Button, Row, Col, Pagination } from 'react-bootstrap';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import "bootstrap-icons/font/bootstrap-icons.css";

const Compras = () => {
  const [listaCompras, setListaCompras] = useState([]);
  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [detallesCompra, setDetallesCompra] = useState([]);
  const [cargandoDetalles, setCargandoDetalles] = useState(false);
  const [errorDetalles, setErrorDetalles] = useState(null);

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [compraAEliminar, setCompraAEliminar] = useState(null);

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    id_empleado: '',
    fecha_compra: new Date(),
    total_compra: 0
  });
  const [detallesNuevos, setDetallesNuevos] = useState([]);

  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
  const [compraAEditar, setCompraAEditar] = useState(null);
  const [detallesEditados, setDetallesEditados] = useState([]);

  const indiceUltimo = paginaActual * elementosPorPagina;
  const indicePrimero = indiceUltimo - elementosPorPagina;
  const comprasActuales = comprasFiltradas.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(comprasFiltradas.length / elementosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const items = [];
  for (let numero = 1; numero <= totalPaginas; numero++) {
    items.push(
      <Pagination.Item
        key={numero}
        active={numero === paginaActual}
        onClick={() => cambiarPagina(numero)}
      >
        {numero}
      </Pagination.Item>
    );
  }

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    setPaginaActual(1);

    const filtradas = listaCompras.filter(compra =>
      compra.nombre_empleado.toLowerCase().includes(texto) ||
      compra.id_compra.toString().includes(texto)
    );
    setComprasFiltradas(filtradas);
  };

  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/obtenercompras');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las compras');
      }
      const datos = await respuesta.json();
      setListaCompras(datos);
      setComprasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) throw new Error('Error al cargar los empleados');
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerCompras();
    obtenerEmpleados();
    obtenerProductos();
  }, []);

  const obtenerDetalles = async (id_compra) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallescompra/${id_compra}`);
      if (!respuesta.ok) throw new Error('Error al cargar los detalles de la compra');
      const datos = await respuesta.json();
      setDetallesCompra(datos);
      setCargandoDetalles(false);
      setMostrarModal(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const eliminarCompra = async () => {
    if (!compraAEliminar) return;
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarcompra/${compraAEliminar.id_compra}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar la compra');
      setMostrarModalEliminacion(false);
      await obtenerCompras();
      setCompraAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (compra) => {
    setCompraAEliminar(compra);
    setMostrarModalEliminacion(true);
  };

  const agregarDetalle = (detalle) => {
    setDetallesNuevos(prev => [...prev, detalle]);
    setNuevaCompra(prev => ({
      ...prev,
      total_compra: prev.total_compra + (detalle.cantidad * detalle.precio_unitario)
    }));
  };

  const agregarCompra = async () => {
    if (!nuevaCompra.id_empleado || !nuevaCompra.fecha_compra || detallesNuevos.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
    try {
      const compraData = {
        id_empleado: nuevaCompra.id_empleado,
        fecha_compra: nuevaCompra.fecha_compra.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_compra: detallesNuevos.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles: detallesNuevos
      };
      const respuesta = await fetch('http://localhost:3000/api/registrarcompra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compraData)
      });
      if (!respuesta.ok) throw new Error('Error al registrar la compra');
      await obtenerCompras();
      setNuevaCompra({ id_empleado: '', fecha_compra: new Date(), total_compra: 0 });
      setDetallesNuevos([]);
      setMostrarModalRegistro(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalActualizacion = async (compra) => {
    setCargandoDetalles(true);
    try {
      const respuestacompra = await fetch(`http://localhost:3000/api/obtenercompraporid/${compra.id_compra}`);
      if (!respuestacompra.ok) throw new Error('Error al cargar la compra');
      const datoscompra = await respuestacompra.json();

      const datoscompletos = {
        id_compra: datoscompra.id_compra,
        id_empleado: datoscompra.id_empleado,
        fecha_compra: datoscompra.fecha_compra,
        total_compra: datoscompra.total_compra,
        nombre_empleado: compra.nombre_empleado
      };

      setCompraAEditar(datoscompletos);

      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallescompra/${compra.id_compra}`);
      if (!respuesta.ok) throw new Error('Error al cargar los detalles de la compra');
      const datos = await respuesta.json();
      setDetallesEditados(datos);

      setCargandoDetalles(false);
      setMostrarModalActualizacion(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const actualizarCompra = async (compraActualizada, detalles) => {
    if (!compraActualizada.id_empleado || !compraActualizada.fecha_compra || detalles.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
    try {
      const compraData = {
        id_compra: compraActualizada.id_compra,
        id_empleado: compraActualizada.id_empleado,
        fecha_compra: compraActualizada.fecha_compra.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_compra: detalles.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles
      };
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcompra/${compraActualizada.id_compra}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compraData)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar la compra');
      await obtenerCompras();
      setMostrarModalActualizacion(false);
      setCompraAEditar(null);
      setDetallesEditados([]);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Compras con Detalles</h4>
        <Row className="mb-3">
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button 
              variant="primary" 
              onClick={() => setMostrarModalRegistro(true)} 
              style={{ width: "100%" }}
            >
              Nueva Compra
            </Button>
          </Col>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
              placeholder="Buscar por empleado o ID..."
            />
          </Col>
        </Row>

        <TablaCompras
          compras={comprasActuales}
          cargando={cargando}
          error={errorCarga}
          obtenerDetalles={obtenerDetalles}
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalActualizacion={abrirModalActualizacion}
        />

        {!cargando && !errorCarga && comprasFiltradas.length > 0 && (
          <Row className="mt-3">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  Mostrando {indicePrimero + 1} a {Math.min(indiceUltimo, comprasFiltradas.length)} de {comprasFiltradas.length} compras
                </div>
                {totalPaginas > 1 && (
                  <Pagination className="mb-0">
                    <Pagination.First 
                      onClick={() => cambiarPagina(1)} 
                      disabled={paginaActual === 1}
                    />
                    <Pagination.Prev 
                      onClick={() => cambiarPagina(Math.max(paginaActual - 1, 1))} 
                      disabled={paginaActual === 1}
                    />
                    {items}
                    <Pagination.Next 
                      onClick={() => cambiarPagina(Math.min(paginaActual + 1, totalPaginas))} 
                      disabled={paginaActual === totalPaginas}
                    />
                    <Pagination.Last 
                      onClick={() => cambiarPagina(totalPaginas)} 
                      disabled={paginaActual === totalPaginas}
                    />
                  </Pagination>
                )}
              </div>
            </Col>
          </Row>
        )}

        <ModalDetallesCompra
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          detalles={detallesCompra}
          cargandoDetalles={cargandoDetalles}
          errorDetalles={errorDetalles}
        />

        <ModalEliminacionCompra
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarCompra={eliminarCompra}
        />

        <ModalRegistroCompra
          mostrarModal={mostrarModalRegistro}
          setMostrarModal={setMostrarModalRegistro}
          nuevaCompra={nuevaCompra}
          setNuevaCompra={setNuevaCompra}
          detallesCompra={detallesNuevos}
          setDetallesCompra={setDetallesNuevos}
          agregarCompra={agregarCompra}
          errorCarga={errorCarga}
          empleados={empleados}
          productos={productos}
        />

        <ModalActualizacionCompra
          mostrarModal={mostrarModalActualizacion}
          setMostrarModal={setMostrarModalActualizacion}
          compra={compraAEditar}
          detallesCompra={detallesEditados}
          setDetallesCompra={setDetallesEditados}
          actualizarCompra={actualizarCompra}
          errorCarga={errorCarga}
          empleados={empleados}
          productos={productos}
        />
      </Container>
    </>
  );
};

export default Compras;
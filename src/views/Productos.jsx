import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import ModalEliminacionProducto from '../components/producto/ModalEliminacionProducto';
import ModalEdicionProducto from '../components/producto/ModalEdicionProducto';
import TablaProductos from '../components/producto/TablaProductos';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

const Productos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3;
  const [productoEditado, setProductoEditado] = useState(null);

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const obtenerProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setCategorias(datos);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);

    const filtrados = listaProductos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        (producto.descripcion_producto && producto.descripcion_producto.toLowerCase().includes(texto)) ||
        producto.precio_unitario.toString().includes(texto)
    );
    setProductosFiltrados(filtrados);
  };

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setMostrarModalEdicion(true);
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Productos</h4>

      <Row className="mb-3">
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nuevo Producto
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={7}>
          <CuadroBusquedas
            placeholder="Buscar productos..."
            value={textoBusqueda}
            onChange={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <br />

      <TablaProductos
        productos={productosPaginados}
        cargando={cargando}
        error={errorCarga}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalEdicion={abrirModalEdicion}
        totalElementos={productosFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroProducto
        mostrar={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        actualizarListaProductos={obtenerProductos}
      />

      <ModalEliminacionProducto
        mostrar={mostrarModalEliminacion}
        handleClose={() => setMostrarModalEliminacion(false)}
        producto={productoAEliminar}
        actualizarListaProductos={obtenerProductos}
      />

      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditado={productoEditado}
        actualizarListaProductos={obtenerProductos}
        categorias={categorias}
      />
    </Container>
  );
};

export default Productos;
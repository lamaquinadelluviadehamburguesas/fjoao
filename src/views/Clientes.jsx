import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente';
import ModalEliminacionCliente from '../components/clientes/ModalEliminacionCliente';
import ModalEdicionCliente from '../components/clientes/ModalEdicionCliente';
import TablaClientes from '../components/clientes/TablaClientes';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

const Clientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3;
  const [clienteEditado, setClienteEditado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    direccion: '',
    cedula: ''
  });

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) throw new Error('Error al cargar los clientes');
      const datos = await respuesta.json();
      setListaClientes(datos);
      setClientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);

    const filtrados = listaClientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        (cliente.segundo_nombre && cliente.segundo_nombre.toLowerCase().includes(texto)) ||
        cliente.primer_apellido.toLowerCase().includes(texto) ||
        (cliente.segundo_apellido && cliente.segundo_apellido.toLowerCase().includes(texto)) ||
        cliente.celular.toLowerCase().includes(texto) ||
        (cliente.direccion && cliente.direccion.toLowerCase().includes(texto)) ||
        cliente.cedula.toLowerCase().includes(texto)
    );
    setClientesFiltrados(filtrados);
  };

  const clientesPaginados = clientesFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminacion(true);
  };

  const abrirModalEdicion = (cliente) => {
    setClienteEditado(cliente);
    setMostrarModalEdicion(true);
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarCliente = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente)
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el cliente');
      }

      await obtenerClientes();
      setMostrarModal(false);
      setNuevoCliente({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        direccion: '',
        cedula: ''
      });
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Clientes</h4>

      <Row className="mb-3">
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nuevo Cliente
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={7}>
          <CuadroBusquedas
            placeholder="Buscar clientes..."
            value={textoBusqueda}
            onChange={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <br />

      <TablaClientes
        clientes={clientesPaginados}
        cargando={cargando}
        error={errorCarga}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalEdicion={abrirModalEdicion}
        totalElementos={clientesFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
        errorCarga={errorCarga}
      />

      <ModalEliminacionCliente
        mostrar={mostrarModalEliminacion}
        handleClose={() => setMostrarModalEliminacion(false)}
        cliente={clienteAEliminar}
        actualizarListaClientes={obtenerClientes}
      />

      <ModalEdicionCliente
        mostrar={mostrarModalEdicion}
        handleClose={() => setMostrarModalEdicion(false)}
        cliente={clienteEditado}
        actualizarListaClientes={obtenerClientes}
      />
    </Container>
  );
};

export default Clientes;
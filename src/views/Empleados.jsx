import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado';
import ModalEliminacionEmpleado from '../components/empleados/ModalEliminacionEmpleado';
import ModalEdicionEmpleado from '../components/empleados/ModalEdicionEmpleado';
import TablaEmpleados from '../components/empleados/TablaEmpleados';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

const Empleados = () => {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3;
  const [empleadoEditado, setEmpleadoEditado] = useState(null);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) throw new Error('Error al cargar los empleados');
      const datos = await respuesta.json();
      setListaEmpleados(datos);
      setEmpleadosFiltrados(datos);
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

    const filtrados = listaEmpleados.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        (empleado.segundo_nombre && empleado.segundo_nombre.toLowerCase().includes(texto)) ||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        (empleado.segundo_apellido && empleado.segundo_apellido.toLowerCase().includes(texto)) ||
        empleado.celular.toLowerCase().includes(texto) ||
        (empleado.direccion && empleado.direccion.toLowerCase().includes(texto)) ||
        empleado.cedula.toLowerCase().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
  };

  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const abrirModalEliminacion = (empleado) => {
    setEmpleadoAEliminar(empleado);
    setMostrarModalEliminacion(true);
  };

  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditado(empleado);
    setMostrarModalEdicion(true);
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Empleados</h4>

      <Row className="mb-3">
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nuevo Empleado
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={7}>
          <CuadroBusquedas
            placeholder="Buscar empleados..."
            value={textoBusqueda}
            onChange={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <br />

      <TablaEmpleados
        empleados={empleadosPaginados}
        cargando={cargando}
        error={errorCarga}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalEdicion={abrirModalEdicion}
        totalElementos={empleadosFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroEmpleado
        mostrar={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        actualizarListaEmpleados={obtenerEmpleados}
      />

      <ModalEliminacionEmpleado
        mostrar={mostrarModalEliminacion}
        handleClose={() => setMostrarModalEliminacion(false)}
        empleado={empleadoAEliminar}
        actualizarListaEmpleados={obtenerEmpleados}
      />

      <ModalEdicionEmpleado
        mostrar={mostrarModalEdicion}
        handleClose={() => setMostrarModalEdicion(false)}
        empleado={empleadoEditado}
        actualizarListaEmpleados={obtenerEmpleados}
      />
    </Container>
  );
};

export default Empleados;
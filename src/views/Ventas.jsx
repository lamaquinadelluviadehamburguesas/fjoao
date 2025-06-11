// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaVentas from '../components/ventas/TablaVentas';
import ModalDetallesVenta from '../components/detalles_ventas/ModalDetallesVentas';
import ModalActualizacionVenta from '../components/ventas/ModalActualizacionVenta';
import ModalEliminacionVenta from '../components/ventas/ModalEliminacionVenta';
import ModalRegistroVenta from '../components/ventas/ModalRegistroVenta';
import { Container, Button, Row, Col, Table } from "react-bootstrap";
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

// Declaración del componente Ventas
const Ventas = () => {
  // Estados para manejar los datos, carga y errores
  const [listaVentas, setListaVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [ventasPorPagina] = useState(10);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [detallesVenta, setDetallesVenta] = useState([]);
  const [cargandoDetalles, setCargandoDetalles] = useState(false);
  const [errorDetalles, setErrorDetalles] = useState(null);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [ventaEditada, setVentaEditada] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: '',
    id_empleado: '',
    fecha_venta: new Date(),
    total_venta: 0
  });
  const [detallesNuevos, setDetallesNuevos] = useState([]);
  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
  const [detallesEditados, setDetallesEditados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const abrirModalActualizacion = async (venta) => {
    setCargandoDetalles(true);
    try {
      const respuestaventa = await fetch(`http://localhost:3000/api/obtenerventaporid/${venta.id_venta}`);
      if (!respuestaventa.ok) throw new Error('Error al cargar la venta');
      const datosventa = await respuestaventa.json();

      
      const datoscompletos = {
        id_venta: datosventa.id_venta,
        id_cliente: datosventa.id_cliente,
        id_empleado: datosventa.id_empleado,
        fecha_venta: datosventa.fecha_venta,
        total_venta: datosventa.total_venta,
        nombre_cliente: venta.nombre_cliente,
        nombre_empleado: venta.nombre_empleado
      };
      
      setVentaEditada(datoscompletos);

      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${venta.id_venta}`);
      if (!respuesta.ok) throw new Error('Error al cargar los detalles de la venta');
      const datos = await respuesta.json();
      setDetallesEditados(datos);

      setCargandoDetalles(false);
      setMostrarModalActualizacion(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const actualizarVenta = async (ventaActualizada, detalles) => {

    if (!ventaActualizada.id_cliente || !ventaActualizada.id_empleado || !ventaActualizada.fecha_venta || detalles.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
    try {      
      const ventaData = {
        id_venta: ventaActualizada.id_venta,
        id_cliente: ventaActualizada.id_cliente,
        id_empleado: ventaActualizada.id_empleado,
        fecha_venta: ventaActualizada.fecha_venta.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_venta: detalles.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles
      };
      console.log(`Enviando ID venta: ${ventaActualizada.id_venta}`, JSON.stringify(ventaData));
      const respuesta = await fetch(`http://localhost:3000/api/actualizarventa/${ventaActualizada.id_venta}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ventaData)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar la venta');
      await obtenerVentas();
      setMostrarModalActualizacion(false);
      setVentaEditada(null);
      setDetallesEditados([]);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarVenta = async () => {
    if (!ventaAEliminar) return;
  
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarventa/${ventaAEliminar.id_venta}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al eliminar la venta');
      }
      
      setMostrarModalEliminacion(false);
      await obtenerVentas();
      setVentaAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };
  
  const abrirModalEliminacion = (venta) => {
    setVentaAEliminar(venta);
    setMostrarModalEliminacion(true);
  };
  
  const agregarDetalle = (detalle) => {
    setDetallesNuevos(prev => [...prev, detalle]);
    setNuevaVenta(prev => ({
      ...prev,
      total_venta: prev.total_venta + (detalle.cantidad * detalle.precio_unitario)
    }));
  };
  
  const agregarVenta = async () => {
    if (!nuevaVenta.id_cliente || !nuevaVenta.id_empleado || !nuevaVenta.fecha_venta || detallesNuevos.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
  
    try {
      const ventaData = {
        id_cliente: nuevaVenta.id_cliente,
        id_empleado: nuevaVenta.id_empleado,
        fecha_venta: nuevaVenta.fecha_venta.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_venta: detallesNuevos.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles: detallesNuevos
      };
  
      const respuesta = await fetch('http://localhost:3000/api/registrarventa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ventaData)
      });
  
      if (!respuesta.ok) throw new Error('Error al registrar la venta');
  
      await obtenerVentas();
      setNuevaVenta({ id_cliente: '', id_empleado: '', fecha_venta: new Date(), total_venta: 0 });
      setDetallesNuevos([]);
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) throw new Error('Error al cargar los clientes');
      const datos = await respuesta.json();
      setClientes(datos);
    } catch (error) {
      setErrorCarga(error.message);
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
  // Función para obtener detalles de una venta
  const obtenerDetalles = async (id_venta) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${id_venta}`);
      if (!respuesta.ok) {
        throw new Error('Error al cargar los detalles de la venta');
      }
      const datos = await respuesta.json();
      setDetallesVenta(datos);
      setCargandoDetalles(false);
      setMostrarModal(true); // Abre el modal
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const obtenerVentas = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3000/api/ventas');
      if (!respuesta.ok) throw new Error('Error al cargar las ventas');
      const datos = await respuesta.json();
      setListaVentas(datos);
      setVentasFiltradas(datos);
      setTotalPaginas(Math.ceil(datos.length / ventasPorPagina)); // Calcula el total de páginas
      setCargando(false);       // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);       // Termina la carga aunque haya error
    }
  };
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerVentas();            // Ejecuta la función al montar el componente
    obtenerClientes();
    obtenerEmpleados();
    obtenerProductos();
  }, []);                       // Array vacío para que solo se ejecute una vez

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // Calcular el índice inicial y final de los elementos a mostrar
  const indexOfLastVenta = paginaActual * ventasPorPagina;
  const indexOfFirstVenta = indexOfLastVenta - ventasPorPagina;
  const ventasActuales = listaVentas.slice(indexOfFirstVenta, indexOfLastVenta);

  // Función para filtrar ventas
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    setPaginaActual(1);

    const filtradas = listaVentas.filter(venta =>
      venta.id_venta.toString().includes(texto) ||
      venta.nombre_cliente.toLowerCase().includes(texto) ||
      venta.nombre_empleado.toLowerCase().includes(texto) ||
      venta.fecha_venta.toLowerCase().includes(texto) ||
      venta.total_venta.toString().includes(texto)
    );
    setVentasFiltradas(filtradas);
  };

  const ventasPaginadas = ventasFiltradas.slice(
    (paginaActual - 1) * ventasPorPagina,
    paginaActual * ventasPorPagina
  );

  // Renderizado de la vista
  return (
    <Container className="mt-5">
      <br />
      <h4>Ventas</h4>

      <Row className="mb-3">
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nueva Venta
          </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={7}>
          <CuadroBusquedas
            placeholder="Buscar ventas..."
            value={textoBusqueda}
            onChange={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <br />

      <TablaVentas
        ventas={ventasPaginadas}
        cargando={cargando}
        error={errorCarga}
        obtenerDetalles={obtenerDetalles}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalActualizacion={abrirModalActualizacion}
        totalElementos={ventasFiltradas.length}
        elementosPorPagina={ventasPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />

      <ModalDetallesVenta
        mostrar={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        detalles={detallesVenta}
        cargando={cargandoDetalles}
        error={errorDetalles}
      />

      <ModalRegistroVenta
        mostrar={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        nuevaVenta={nuevaVenta}
        setNuevaVenta={setNuevaVenta}
        detallesNuevos={detallesNuevos}
        setDetallesNuevos={setDetallesNuevos}
        agregarVenta={agregarVenta}
        errorCarga={errorCarga}
        clientes={clientes}
        empleados={empleados}
        productos={productos}
      />

      <ModalEliminacionVenta
        mostrar={mostrarModalEliminacion}
        handleClose={() => setMostrarModalEliminacion(false)}
        venta={ventaAEliminar}
        eliminarVenta={eliminarVenta}
      />

      <ModalActualizacionVenta
        mostrar={mostrarModalActualizacion}
        handleClose={() => setMostrarModalActualizacion(false)}
        venta={ventaEditada}
        detalles={detallesEditados}
        clientes={clientes}
        empleados={empleados}
        productos={productos}
        actualizarVenta={actualizarVenta}
        errorCarga={errorCarga}
      />
    </Container>
  );
};

// Exportación del componente
export default Ventas;
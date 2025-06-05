//ModalRegistroCompra.jsx

import React, { useState, useRef } from 'react';
import { Modal, Form, Button, Table, Row, Col, FormControl } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalRegistroCompra = ({
  mostrarModal,
  setMostrarModal,
  nuevaCompra,
  setNuevaCompra,
  detallesCompra,
  setDetallesCompra,
  agregarDetalle,
  agregarCompra,
  errorCarga,
  empleados,
  productos
}) => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ id_producto: '', cantidad: '', precio_unitario: '' });

  // Referencias para navegación
  const empleadoRef = useRef(null);
  const fechaRef = useRef(null);
  const productoRef = useRef(null);
  const cantidadRef = useRef(null);
  const precioRef = useRef(null);
  const agregarProductoRef = useRef(null);
  const guardarCompraRef = useRef(null);

  const totalCompra = detallesCompra.reduce((sum, detalle) => sum + (detalle.cantidad * detalle.precio_unitario), 0);

  const validacionFormulario = () => {
    return (
      nuevaCompra.id_empleado && // Empleado seleccionado
      nuevaCompra.fecha_compra && // Fecha seleccionada
      detallesCompra.length > 0 // Al menos un detalle agregado
    );
  };

  const validacionDetalle = () => {
    return (
      nuevoDetalle.id_producto && // Producto seleccionado
      nuevoDetalle.cantidad && // Cantidad ingresada
      nuevoDetalle.cantidad > 0 && // Cantidad positiva
      nuevoDetalle.precio_unitario && // Precio ingresado
      nuevoDetalle.precio_unitario > 0 // Precio positivo
    );
  };

  const manejarKeyDown = (e, siguienteCampo) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (siguienteCampo) {
        siguienteCampo.current?.focus();
      }
    }
  };

  const cargarEmpleados = (inputValue, callback) => {
    const filtrados = empleados.filter(empleado =>
      `${empleado.primer_nombre} ${empleado.primer_apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(empleado => ({
      value: empleado.id_empleado,
      label: `${empleado.primer_nombre} ${empleado.primer_apellido}`
    })));
  };

  const cargarProductos = (inputValue, callback) => {
    const filtrados = productos.filter(producto =>
      producto.nombre_producto.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(producto => ({
      value: producto.id_producto,
      label: producto.nombre_producto,
      precio: producto.precio_unitario
    })));
  };

  const manejarCambioEmpleado = (seleccionado) => {
    setEmpleadoSeleccionado(seleccionado);
    setNuevaCompra(prev => ({ ...prev, id_empleado: seleccionado ? seleccionado.value : '' }));
    if (seleccionado) fechaRef.current?.focus();
  };

  const manejarCambioProducto = (seleccionado) => {
    setProductoSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      id_producto: seleccionado ? seleccionado.value : '',
      precio_unitario: seleccionado ? seleccionado.precio : ''
    }));
    if (seleccionado) cantidadRef.current?.focus();
  };

  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    if (value < 0) return; // No permitir valores negativos
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  const manejarAgregarDetalle = () => {
    if (!validacionDetalle()) {
      alert('Por favor, completa todos los campos del detalle correctamente.');
      return;
    }

    agregarDetalle({
      id_producto: nuevoDetalle.id_producto,
      nombre_producto: productoSeleccionado.label,
      cantidad: parseInt(nuevoDetalle.cantidad),
      precio_unitario: parseFloat(nuevoDetalle.precio_unitario)
    });
    setNuevoDetalle({ id_producto: '', cantidad: '', precio_unitario: '' });
    setProductoSeleccionado(null);
    productoRef.current?.focus();
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formEmpleado">
                <Form.Label>Empleado <span className="text-danger">*</span></Form.Label>
                <AsyncSelect
                  ref={empleadoRef}
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarEmpleados}
                  onChange={manejarCambioEmpleado}
                  value={empleadoSeleccionado}
                  placeholder="Buscar empleado..."
                  isClearable
                  onKeyDown={(e) => manejarKeyDown(e, fechaRef)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formFechaCompra">
                <Form.Label>Fecha de Compra <span className="text-danger">*</span></Form.Label>
                <br />
                <DatePicker
                  ref={fechaRef}
                  selected={nuevaCompra.fecha_compra}
                  onChange={(date) => {
                    setNuevaCompra(prev => ({ ...prev, fecha_compra: date }));
                    productoRef.current?.focus();
                  }}
                  className="form-control"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  onKeyDown={(e) => manejarKeyDown(e, productoRef)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h5>Agregar Detalle de Compra</h5>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formProducto">
                <Form.Label>Producto <span className="text-danger">*</span></Form.Label>
                <AsyncSelect
                  ref={productoRef}
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarProductos}
                  onChange={manejarCambioProducto}
                  value={productoSeleccionado}
                  placeholder="Buscar producto..."
                  isClearable
                  onKeyDown={(e) => manejarKeyDown(e, cantidadRef)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formCantidad">
                <Form.Label>Cantidad <span className="text-danger">*</span></Form.Label>
                <FormControl
                  ref={cantidadRef}
                  type="number"
                  name="cantidad"
                  value={nuevoDetalle.cantidad}
                  onChange={manejarCambioDetalle}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && validacionDetalle()) {
                      e.preventDefault();
                      manejarAgregarDetalle();
                    } else {
                      manejarKeyDown(e, precioRef);
                    }
                  }}
                  placeholder="Cantidad"
                  min="1"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={7} sm={8} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formPrecioUnitario">
                <Form.Label>Precio Unitario <span className="text-danger">*</span></Form.Label>
                <FormControl
                  ref={precioRef}
                  type="number"
                  name="precio_unitario"
                  value={nuevoDetalle.precio_unitario}
                  onChange={manejarCambioDetalle}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && validacionDetalle()) {
                      e.preventDefault();
                      manejarAgregarDetalle();
                    }
                  }}
                  placeholder="Precio"
                  min="0.01"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={5} sm={4} md={2} lg={2} className="d-flex align-items-center mt-3">
              <Button 
                ref={agregarProductoRef}
                style={{ width: '100%' }} 
                variant="success" 
                onClick={manejarAgregarDetalle}
                disabled={!validacionDetalle()}
              >
                Agregar Producto
              </Button>
            </Col>
          </Row>
          {detallesCompra.length > 0 && (
            <>
              <h5 className="mt-4">Detalles Agregados</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesCompra.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombre_producto}</td>
                      <td>{detalle.cantidad}</td>
                      <td>{detalle.precio_unitario.toFixed(2)}</td>
                      <td>{(detalle.cantidad * detalle.precio_unitario).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                    <td><strong>{totalCompra.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
          {errorCarga && <div className="text-danger mt-2">{errorCarga}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button 
          ref={guardarCompraRef}
          variant="primary" 
          onClick={agregarCompra}
          disabled={!validacionFormulario()}
        >
          Guardar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Container, Pagination } from 'react-bootstrap';

const ModalDetallesVenta = ({ mostrarModal, setMostrarModal, detalles, cargandoDetalles, errorDetalles }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Calcular índices para la paginación
  const indiceUltimo = paginaActual * elementosPorPagina;
  const indicePrimero = indiceUltimo - elementosPorPagina;
  const detallesActuales = detalles.slice(indicePrimero, indiceUltimo);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(detalles.length / elementosPorPagina);

  // Generar items de paginación
  const items = [];
  for (let numero = 1; numero <= totalPaginas; numero++) {
    items.push(
      <Pagination.Item 
        key={numero} 
        active={numero === paginaActual}
        onClick={() => setPaginaActual(numero)}
      >
        {numero}
      </Pagination.Item>
    );
  }

  // Calcular total de la venta
  const totalVenta = detalles.reduce((sum, detalle) => sum + (detalle.cantidad * detalle.precio_unitario), 0);

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      fullscreen={true}
      aria-labelledby="detalles-venta-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="detalles-venta-modal">Detalles de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cargandoDetalles && <div>Cargando detalles...</div>}
        {!cargandoDetalles && !errorDetalles && detalles.length > 0 && (
          <Container>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID Detalle</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detallesActuales.map((detalle) => (
                  <tr key={detalle.id_detalle_venta}>
                    <td>{detalle.id_detalle_venta}</td>
                    <td>{detalle.nombre_producto}</td>
                    <td>{detalle.descripcion_producto}</td>
                    <td>{detalle.cantidad}</td>
                    <td>C$ {detalle.precio_unitario.toFixed(2)}</td>
                    <td>C$ {detalle.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="text-end"><strong>Total de la Venta:</strong></td>
                  <td><strong>C$ {totalVenta.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </Table>
            {totalPaginas > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  <Pagination.First onClick={() => setPaginaActual(1)} disabled={paginaActual === 1} />
                  <Pagination.Prev onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))} disabled={paginaActual === 1} />
                  {items}
                  <Pagination.Next onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))} disabled={paginaActual === totalPaginas} />
                  <Pagination.Last onClick={() => setPaginaActual(totalPaginas)} disabled={paginaActual === totalPaginas} />
                </Pagination>
              </div>
            )}
          </Container>
        )}
        {!cargandoDetalles && !errorDetalles && detalles.length === 0 && (
          <div>No hay detalles para esta venta.</div>
        )}
        {errorDetalles && (
          <div className="text-danger">Error: {errorDetalles}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesVenta;
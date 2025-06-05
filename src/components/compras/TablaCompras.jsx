//TablaCompras.jsx

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TablaCompras = ({ compras, cargando, error, obtenerDetalles, abrirModalEliminacion, abrirModalActualizacion }) => {
  // Función para formatear la fecha
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (cargando) {
    return <div>Cargando compras...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (compras.length === 0) {
    return <div>No hay compras para mostrar.</div>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Compra</th>
          <th>Fecha Compra</th>
          <th>Empleado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <tr key={compra.id_compra}>
            <td>{compra.id_compra}</td>
            <td>{formatearFecha(compra.fecha_compra)}</td>
            <td>{compra.nombre_empleado}</td>
            <td>C$ {compra.total_compra.toFixed(2)}</td>
            <td className="text-center">
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => obtenerDetalles(compra.id_compra)}
                title="Ver detalles"
              >
                <i className="bi bi-list-ul"></i>
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => abrirModalActualizacion(compra)}
                title="Editar compra"
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(compra)}
                title="Eliminar compra"
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaCompras;
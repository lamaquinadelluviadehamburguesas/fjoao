// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TablaVentas = ({ 
  ventas, 
  cargando, 
  error, 
  obtenerDetalles, 
  abrirModalEliminacion, 
  abrirModalActualizacion,
  paginaActual,
  totalPaginas,
  onChangePagina
}) => {
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

  // Función para formatear el total de venta con manejo de errores y depuración
  const formatearTotal = (total) => {
    console.log('Processing total:', total); // Log the value being processed
    if (total == null || total === undefined || isNaN(Number(total))) {
      console.log('Invalid or missing total:', total);
      return 'C$ 0.00';
    }
    return `C$ ${Number(total).toFixed(2)}`;
  };

  // Log the incoming ventas data for debugging
  React.useEffect(() => {
    console.log('Ventas data received:', ventas);
  }, [ventas]);

  if (cargando) {
    return <div>Cargando ventas...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  if (ventas.length === 0) {
    return <div>No hay ventas para mostrar.</div>;
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha Venta</th>
            <th>Cliente</th>
            <th>Empleado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{formatearFecha(venta.fecha_venta)}</td>
              <td>{venta.nombre_cliente || 'N/A'}</td>
              <td>{venta.nombre_empleado || 'N/A'}</td>
              <td>{formatearTotal(venta.total_venta)}</td>
              <td className="text-center">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => obtenerDetalles(venta.id_venta)}
                  title="Ver detalles"
                >
                  <i className="bi bi-list-ul"></i>
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalActualizacion(venta)}
                  title="Editar venta"
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(venta)}
                  title="Eliminar venta"
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.First 
            onClick={() => onChangePagina(1)} 
            disabled={paginaActual === 1}
          />
          <Pagination.Prev 
            onClick={() => onChangePagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          />
          
          {[...Array(totalPaginas)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === paginaActual}
              onClick={() => onChangePagina(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          
          <Pagination.Next 
            onClick={() => onChangePagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          />
          <Pagination.Last 
            onClick={() => onChangePagina(totalPaginas)}
            disabled={paginaActual === totalPaginas}
          />
        </Pagination>
      </div>
    </div>
  );
};

// Exportación del componente
export default TablaVentas;
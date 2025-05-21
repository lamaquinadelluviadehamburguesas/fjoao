import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';

const Estadisticas = () => {
  // Declare state variables for chart data
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const cargaVentas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorMes');
        const data = await response.json();
        setMeses(data.map(item => item.mes));
        setTotalesPorMes(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas:', error);
        alert('Error al cargar ventas: ' + error.message);
      }
    };
    cargaVentas();
  }, []);

  // Render the VentasPorMes component with fetched data
  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
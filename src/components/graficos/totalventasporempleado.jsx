
import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalVentasPorEmpleado = ({ empleados, ventas_totales }) => {
  // Validación de datos
  if (
    !Array.isArray(empleados) ||
    !Array.isArray(ventas_totales) ||
    empleados.length === 0 ||
    ventas_totales.length === 0 ||
    empleados.length !== ventas_totales.length
  ) {
    return <div>Cargando...</div>;
  }

  // Datos del gráfico
  const data = {
    labels: empleados,
    datasets: [
      {
        label: 'Total de Ventas por Empleado',
        data: ventas_totales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Total de Ventas por Empleado',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Total Ventas' },
      },
      x: {
        title: { display: true, text: 'Empleados' },
      },
    },
  };

  // Renderizado
  return (
    <Card>
      <Card.Body>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorEmpleado;

import React from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalVentasPorAnio = ({ anios = [], total_ventas = [] }) => {
  // Validar datos
  if (
    !Array.isArray(anios) ||
    !Array.isArray(total_ventas) ||
    anios.length === 0 ||
    total_ventas.length === 0 ||
    anios.length !== total_ventas.length
  ) {
    return <div>Cargando datos de ventas por año...</div>;
  }

  // Datos para el gráfico Line
  const data = {
    labels: anios,
    datasets: [
      {
        label: 'Total Ventas por Año',
        data: total_ventas,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Ventas por Año',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Ventas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Años',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorAnio;

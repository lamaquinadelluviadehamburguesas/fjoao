import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const TotalVentasPorMes = ({ meses, totales }) => {
  // meses: ['Enero', 'Febrero', ...]
  // totales: [1000, 2000, ...]

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Total Ventas (C$)',
        data: totales,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(30, 90, 180)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total de Ventas por Mes' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Ventas (C$)' },
      },
      x: {
        title: { display: true, text: 'Meses' },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Total Ventas por Mes</Card.Title>
        <div style={{ height: 350 }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorMes;

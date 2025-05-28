import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const TotalVentasPorMesBar = ({ meses, totales }) => {
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
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Ventas por Mes (Bar)' } },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Ventas (C$)' } },
      x: { title: { display: true, text: 'Meses' } },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Total Ventas por Mes - Barra</Card.Title>
        <div style={{ height: 350 }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorMesBar;

import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasProductosPorMes = ({
  meses = [],
  ventas = [],
  altura = 350,
  tituloPersonalizado = 'Ventas de Productos por Mes',
}) => {
  const mesesValidos = Array.isArray(meses) ? meses : [];
  const ventasValidas = Array.isArray(ventas) ? ventas : [];

  if (mesesValidos.length === 0 || ventasValidas.length === 0) {
    return <div className="text-center p-4">Cargando datos de ventas por mes...</div>;
  }

  const data = {
    labels: mesesValidos,
    datasets: [
      {
        label: 'Ventas de Productos (C$)',
        data: ventasValidas,
        backgroundColor: 'hsl(180, 70%, 65%)',
        borderColor: 'hsl(180, 90%, 30%)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: tituloPersonalizado,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `C$${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ventas (Córdobas C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{tituloPersonalizado}</Card.Title>
        <div style={{ height: altura }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasProductosPorMes;

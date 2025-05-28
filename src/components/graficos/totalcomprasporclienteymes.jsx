import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalComprasPorClienteYMes = ({ meses = [], compras_por_cliente = [] }) => {
  // Validar datos
  if (
    !Array.isArray(meses) ||
    !Array.isArray(compras_por_cliente) ||
    meses.length === 0 ||
    compras_por_cliente.length === 0
  ) {
    return <div>Cargando datos de compras por cliente y mes...</div>;
  }

  // Construir datasets para el gráfico
  const data = {
    labels: meses,
    datasets: compras_por_cliente.map((cliente, index) => ({
      label: cliente.label || `Cliente ${index + 1}`,
      data: Array.isArray(cliente.data) ? cliente.data : [],
      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)`,
      borderColor: `hsl(${(index * 60) % 360}, 70%, 40%)`,
      borderWidth: 1,
    })),
  };

  // Opciones para barra agrupada
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Total Compras por Cliente y Mes',
      },
    },
    scales: {
      x: {
        stacked: false,
        title: { display: true, text: 'Meses' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Total Compras' },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default TotalComprasPorClienteYMes;

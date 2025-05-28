import React from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalVentasPorCategoria = ({ categorias = [], total_ventas = [] }) => {
  // Validar datos
  if (
    !Array.isArray(categorias) ||
    !Array.isArray(total_ventas) ||
    categorias.length === 0 ||
    total_ventas.length === 0 ||
    categorias.length !== total_ventas.length
  ) {
    return <div>Cargando datos de ventas por categoría...</div>;
  }

  // Datos para Doughnut
  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Ventas por Categoría',
        data: total_ventas,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Total Ventas por Categoría (Doughnut)',
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Doughnut data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorCategoria;

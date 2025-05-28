import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockPorCategoria = forwardRef(({ categorias = [], stock = [] }, ref) => {
  // Validar datos
  if (
    !Array.isArray(categorias) ||
    !Array.isArray(stock) ||
    categorias.length === 0 ||
    stock.length === 0 ||
    categorias.length !== stock.length
  ) {
    return <div>Cargando datos de stock por categoría...</div>;
  }

  // Datos para gráfico de barras
  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Stock Disponible',
        data: stock,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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
        text: 'Stock por Categoría',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad en Stock',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categorías',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Bar ref={ref} data={data} options={options} />
      </Card.Body>
    </Card>
  );
});

export default StockPorCategoria;
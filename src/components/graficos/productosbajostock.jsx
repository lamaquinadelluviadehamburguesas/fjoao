import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductosBajoStock = forwardRef(({ productos = [], stock = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(productos) ||
    !Array.isArray(stock) ||
    productos.length === 0 ||
    stock.length === 0 ||
    productos.length !== stock.length
  ) {
    return <div>Cargando datos de productos con bajo stock...</div>;
  }

  const data = {
    labels: productos,
    datasets: [
      {
        label: 'Cantidad en Stock',
        data: stock,
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Barra horizontal
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Productos con Bajo Stock',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad en Stock' },
      },
      y: {
        title: { display: true, text: 'Productos' },
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

export default ProductosBajoStock;
import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductosMayorRotacion = forwardRef(({ productos = [], cantidades = [] }, ref) => {
  // Validar datos
  if (
    !Array.isArray(productos) ||
    !Array.isArray(cantidades) ||
    productos.length === 0 ||
    cantidades.length === 0 ||
    productos.length !== cantidades.length
  ) {
    return <div>Cargando datos de productos con mayor rotación...</div>;
  }

  // Datos para gráfico
  const data = {
    labels: productos,
    datasets: [
      {
        label: 'Cantidad Vendida',
        data: cantidades,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
        text: 'Productos con Mayor Rotación',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad Vendida' },
      },
      x: {
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

export default ProductosMayorRotacion;
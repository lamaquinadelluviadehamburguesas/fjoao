import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductosMasVendidosPorValor = forwardRef(({ productos = [], valores = [] }, ref) => {
  // Validar datos
  if (
    !Array.isArray(productos) ||
    !Array.isArray(valores) ||
    productos.length === 0 ||
    valores.length === 0 ||
    productos.length !== valores.length
  ) {
    return <div>Cargando datos de productos más vendidos por valor...</div>;
  }

  const data = {
    labels: productos,
    datasets: [
      {
        label: 'Ventas en C$',
        data: valores,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Gráfico horizontal
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Productos Más Vendidos por Valor',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Ventas en C$' },
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

export default ProductosMasVendidosPorValor;
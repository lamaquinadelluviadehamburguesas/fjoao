import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductosMasCompradosPorCliente = forwardRef(({ clientes = [], cantidades = [] }, ref) => {
  // Validación básica de datos
  if (
    !Array.isArray(clientes) ||
    !Array.isArray(cantidades) ||
    clientes.length === 0 ||
    cantidades.length === 0 ||
    clientes.length !== cantidades.length
  ) {
    return <div>Cargando datos de productos más comprados por cliente...</div>;
  }

  const data = {
    labels: clientes,
    datasets: [
      {
        label: 'Cantidad Comprada',
        data: cantidades,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
        text: 'Productos Más Comprados Por Cliente',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad Comprada' },
      },
      x: {
        title: { display: true, text: 'Clientes' },
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

export default ProductosMasCompradosPorCliente;
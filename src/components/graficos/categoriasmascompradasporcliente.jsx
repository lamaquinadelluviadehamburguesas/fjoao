
import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoriasMasCompradasPorCliente = forwardRef(({ categorias = [], cantidades = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(categorias) ||
    !Array.isArray(cantidades) ||
    categorias.length === 0 ||
    cantidades.length === 0 ||
    categorias.length !== cantidades.length
  ) {
    return <div>Cargando datos de categorías más compradas por cliente...</div>;
  }

  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Cantidad Comprada',
        data: cantidades,
        backgroundColor: 'rgba(255, 159, 64, 0.7)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Esto hace que la barra sea horizontal
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Categorías Más Compradas por Cliente',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad' },
      },
      y: {
        title: { display: true, text: 'Categorías' },
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

export default CategoriasMasCompradasPorCliente;
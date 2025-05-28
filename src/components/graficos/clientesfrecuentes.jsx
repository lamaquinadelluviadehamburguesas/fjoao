import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClientesFrecuentes = forwardRef(({ clientes = [], frecuencias = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(clientes) ||
    !Array.isArray(frecuencias) ||
    clientes.length === 0 ||
    frecuencias.length === 0 ||
    clientes.length !== frecuencias.length
  ) {
    return <div>Cargando datos de clientes frecuentes...</div>;
  }

  const data = {
    labels: clientes,
    datasets: [
      {
        label: 'Frecuencia de Compras',
        data: frecuencias,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
        text: 'Clientes Frecuentes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Número de Compras' },
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

export default ClientesFrecuentes;
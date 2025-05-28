import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ClientesFrecuentesPorMes = forwardRef(({ meses = [], frecuencias = [] }, ref) => {
  // Validar datos
  if (
    !Array.isArray(meses) ||
    !Array.isArray(frecuencias) ||
    meses.length === 0 ||
    frecuencias.length === 0 ||
    meses.length !== frecuencias.length
  ) {
    return <div>Cargando datos de clientes frecuentes por mes...</div>;
  }

  const data = {
    labels: meses,
    datasets: [
      {
        label: 'Clientes Frecuentes',
        data: frecuencias,
        fill: false,
        borderColor: 'rgba(153, 102, 255, 0.8)',
        backgroundColor: 'rgba(153, 102, 255, 0.4)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Clientes Frecuentes por Mes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Número de Clientes' },
      },
      x: {
        title: { display: true, text: 'Meses' },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Line ref={ref} data={data} options={options} />
      </Card.Body>
    </Card>
  );
});

export default ClientesFrecuentesPorMes;
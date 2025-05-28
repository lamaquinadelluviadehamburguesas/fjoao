import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CategoriasMayorRotacion = forwardRef(({ categorias = [], rotacion = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(categorias) ||
    !Array.isArray(rotacion) ||
    categorias.length === 0 ||
    rotacion.length === 0 ||
    categorias.length !== rotacion.length
  ) {
    return <div>Cargando datos de categorías con mayor rotación...</div>;
  }

  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Rotación',
        data: rotacion,
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Categorías con Mayor Rotación',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Radar ref={ref} data={data} options={options} />
      </Card.Body>
    </Card>
  );
});

export default CategoriasMayorRotacion;
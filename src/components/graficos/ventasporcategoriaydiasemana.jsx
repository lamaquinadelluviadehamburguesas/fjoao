import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js necesarios
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const VentasPorCategoriaYDiaSemana = ({
  diasSemana = [],
  categorias = [],
  datos = {},
  altura = 400,
  mostrarLeyenda = true,
  tituloPersonalizado = 'Ventas por Categoría y Día de la Semana',
}) => {
  const datasets = categorias.map((categoria, i) => ({
    label: categoria,
    data: diasSemana.map(dia => datos?.[dia]?.[categoria] || 0),
    backgroundColor: `hsl(${(i * 60) % 360}, 70%, 60%)`,
  }));

  const data = {
    labels: diasSemana,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: mostrarLeyenda,
        position: 'top',
      },
      title: {
        display: true,
        text: tituloPersonalizado,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: C$${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ventas (C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Días de la Semana',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{tituloPersonalizado}</Card.Title>
        <div style={{ height: altura }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorCategoriaYDiaSemana;

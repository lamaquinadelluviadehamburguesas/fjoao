import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PromedioVentasPorEmpleado = forwardRef(({ empleados = [], promedios = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(empleados) ||
    !Array.isArray(promedios) ||
    empleados.length === 0 ||
    promedios.length === 0 ||
    empleados.length !== promedios.length
  ) {
    return <div>Cargando datos de promedio de ventas por empleado...</div>;
  }

  const data = {
    labels: empleados,
    datasets: [
      {
        label: 'Promedio Ventas',
        data: promedios,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Para gráfico horizontal
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Promedio de Ventas por Empleado',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Promedio Ventas',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Empleados',
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

export default PromedioVentasPorEmpleado;
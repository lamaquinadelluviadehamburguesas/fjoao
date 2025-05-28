import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CantidadVentasPorEmpleado = forwardRef(({ empleados = [], cantidad_ventas = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(empleados) ||
    !Array.isArray(cantidad_ventas) ||
    empleados.length === 0 ||
    cantidad_ventas.length === 0 ||
    empleados.length !== cantidad_ventas.length
  ) {
    return <div>Cargando datos de cantidad de ventas por empleado...</div>;
  }

  const data = {
    labels: empleados,
    datasets: [
      {
        label: 'Cantidad de Ventas',
        data: cantidad_ventas,
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
        text: 'Cantidad de Ventas por Empleado',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad de Ventas' },
      },
      x: {
        title: { display: true, text: 'Empleados' },
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

export default CantidadVentasPorEmpleado;
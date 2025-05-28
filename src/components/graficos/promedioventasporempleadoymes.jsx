import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PromedioVentasPorEmpleadoYMes = forwardRef(({ meses = [], promedios_por_empleado = [] }, ref) => {
  // Validar datos
  if (
    !Array.isArray(meses) ||
    !Array.isArray(promedios_por_empleado) ||
    meses.length === 0 ||
    promedios_por_empleado.length === 0
  ) {
    return <div>Cargando datos de promedio de ventas por empleado y mes...</div>;
  }

  // Crear datasets para cada empleado
  const data = {
    labels: meses,
    datasets: promedios_por_empleado.map((empleado, index) => ({
      label: empleado.label || `Empleado ${index + 1}`,
      data: Array.isArray(empleado.data) ? empleado.data : [],
      fill: false,
      borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 70%)`,
      tension: 0.2,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Promedio de Ventas por Empleado y Mes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Promedio Ventas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
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

export default PromedioVentasPorEmpleadoYMes;
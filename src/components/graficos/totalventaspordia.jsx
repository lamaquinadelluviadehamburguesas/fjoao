import React from 'react';
import { Card } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalVentasPorDiaRadar = ({ dias, total_ventas }) => {
  // Validación de datos
  if (
    !Array.isArray(dias) ||
    !Array.isArray(total_ventas) ||
    dias.length === 0 ||
    total_ventas.length === 0 ||
    dias.length !== total_ventas.length
  ) {
    return <div>Cargando...</div>;
  }

  // Datos del gráfico Radar
  const data = {
    labels: dias,
    datasets: [
      {
        label: 'Total de Ventas por Día',
        data: total_ventas,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  // Opciones del gráfico Radar
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total de Ventas por Día (Radar)',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Radar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorDiaRadar;

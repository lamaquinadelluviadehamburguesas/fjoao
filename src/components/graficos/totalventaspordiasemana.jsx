import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const TotalVentasPorDiaSemana = ({ diasSemana, totalVentas }) => {
  const data = {
    labels: diasSemana, // Ejemplo: ['Lunes', 'Martes', 'Miércoles', ...]
    datasets: [
      {
        label: 'Ventas por Día de la Semana',
        data: totalVentas,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Total Ventas por Día de la Semana',
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Total Ventas por Día de la Semana (Pastel)</Card.Title>
        <div style={{ height: 300 }}>
          <Pie data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorDiaSemana;

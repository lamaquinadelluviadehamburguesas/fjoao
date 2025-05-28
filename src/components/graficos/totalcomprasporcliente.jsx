import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const TotalComprasPorCliente = forwardRef(({ clientes = [], total_compras = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(clientes) ||
    !Array.isArray(total_compras) ||
    clientes.length === 0 ||
    total_compras.length === 0 ||
    clientes.length !== total_compras.length
  ) {
    return <div>Cargando datos de compras por cliente...</div>;
  }

  // Datos para Doughnut
  const data = {
    labels: clientes,
    datasets: [
      {
        label: 'Total Compras por Cliente',
        data: total_compras,
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
        borderWidth: 2,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Total Compras por Cliente',
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Doughnut ref={ref} data={data} options={options} />
      </Card.Body>
    </Card>
  );
});

export default TotalComprasPorCliente;
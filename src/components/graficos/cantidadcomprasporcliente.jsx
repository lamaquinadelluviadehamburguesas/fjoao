import React, { forwardRef } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CantidadComprasPorCliente = forwardRef(({ clientes = [], cantidad_compras = [] }, ref) => {
  // Validación de datos
  if (
    !Array.isArray(clientes) ||
    !Array.isArray(cantidad_compras) ||
    clientes.length === 0 ||
    cantidad_compras.length === 0 ||
    clientes.length !== cantidad_compras.length
  ) {
    return <div>Cargando datos de cantidad de compras por cliente...</div>;
  }

  const data = {
    labels: clientes,
    datasets: [
      {
        label: 'Cantidad de Compras',
        data: cantidad_compras,
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
        text: 'Cantidad de Compras por Cliente',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad de Compras' },
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

export default CantidadComprasPorCliente;
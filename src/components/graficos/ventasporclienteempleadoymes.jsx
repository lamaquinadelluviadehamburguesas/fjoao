import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorClienteEmpleadoYMes = ({
  meses = [],
  ventas_por_cliente_empleado = [],
  altura = 400,
  tituloPersonalizado = 'Ventas por Cliente, Empleado y Mes',
}) => {
  const mesesValidos = Array.isArray(meses) ? meses : [];
  const ventasValidas = Array.isArray(ventas_por_cliente_empleado) ? ventas_por_cliente_empleado : [];

  if (mesesValidos.length === 0 || ventasValidas.length === 0) {
    return <div className="text-center p-4">Cargando datos de ventas por cliente, empleado y mes...</div>;
  }

  const data = {
    labels: mesesValidos,
    datasets: ventasValidas.map((item, index) => ({
      label: item.label || `Cliente-Empleado ${index + 1}`,
      data: Array.isArray(item.data) ? item.data : [],
      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 70%)`,
      borderColor: `hsl(${(index * 60) % 360}, 70%, 40%)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
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
        title: { display: true, text: 'Total Ventas (C$)' },
      },
      x: {
        title: { display: true, text: 'Meses' },
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

export default VentasPorClienteEmpleadoYMes;

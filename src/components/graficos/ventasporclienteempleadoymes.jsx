import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorClienteEmpleadoMes = ({ data: ventasData = [] }) => {
  // Verificar si hay datos
  if (!ventasData || ventasData.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Ventas por Cliente, Empleado y Mes</Card.Title>
          <div style={{ height: "400px", justifyContent: "center", alignItems: "center", display: "flex" }}>
            <p>No hay datos disponibles para mostrar</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Preparar datos para el gráfico
  const data = {
    labels: ventasData.map(item => `${item.cliente} - ${item.empleado} (${item.mes})`),
    datasets: [
      {
        label: 'Ventas(C$)',
        data: ventasData.map(item => item.total_venta),
        backgroundColor: 'rgba(190, 192, 75, 0.2)',
        borderColor: 'rgb(192, 124, 75)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const item = ventasData[context.dataIndex];
            return [
              `Cliente: ${item.cliente}`,
              `Empleado: ${item.empleado}`,
              `Mes: ${item.mes}`,
              `Venta: C$${item.total_venta.toLocaleString()}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Córdobas (C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Cliente - Empleado - Mes',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Ventas por Cliente, Empleado y Mes</Card.Title>
        <div style={{ height: "400px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorClienteEmpleadoMes;

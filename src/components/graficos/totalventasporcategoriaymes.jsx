import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TotalVentasPorCategoriaYMes = ({
  meses = [],
  ventas_por_categoria = [],
}) => {
  // Normalizar datos para evitar errores
  const mesesData = Array.isArray(meses) ? meses : [];
  const ventasData = Array.isArray(ventas_por_categoria) ? ventas_por_categoria : [];

  // Mostrar mensaje si no hay datos disponibles
  if (mesesData.length === 0 || ventasData.length === 0) {
    return <div>Cargando datos de ventas por categoría y mes...</div>;
  }

  // Definir datos para la gráfica
  const data = {
    labels: mesesData,
    datasets: ventasData.map((item, index) => ({
      label: item.label || `Categoría ${index + 1}`,
      data: Array.isArray(item.data) ? item.data : [],
      backgroundColor: `hsl(${(index * 60) % 360}, 70%, 60%)`,  // colores variados
      borderColor: `hsl(${(index * 60) % 360}, 70%, 40%)`,
      borderWidth: 1,
    })),
  };

  // Opciones para barra apilada
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Total de Ventas por Categoría y Mes (Barra Apilada)',
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Meses' },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: 'Total Ventas' },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorCategoriaYMes;

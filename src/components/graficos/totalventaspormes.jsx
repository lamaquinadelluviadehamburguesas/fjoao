import React, { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TotalVentasPorMes = ({ meses, total_ventas }) => {
  const chartRef = useRef(null);

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Reporte de Ventas Mensuales", 14, 20);

    // Add chart image
    const chart = chartRef.current;
    if (chart) {
      const canvas = chart.canvas;
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 30, 190, 100);
    }

    // Add table
    autoTable(doc, {
      startY: 140,
      head: [['Mes', 'Ventas (C$)']],
      body: meses.map((mes, index) => [mes, total_ventas[index]?.toFixed(2) || '0.00']),
    });

    doc.save('ventas_mensuales.pdf');
  };

  // Validate inputs
  const validMeses = Array.isArray(meses) && meses.length > 0 ? meses : ['Sin datos'];
  const validTotales = Array.isArray(total_ventas) && total_ventas.length > 0
    ? total_ventas.map(val => (typeof val === 'number' && val >= 0 ? val : 0))
    : [0];

  // Ensure lengths match
  const maxLength = Math.min(validMeses.length, validTotales.length);
  const labels = validMeses.slice(0, maxLength);
  const dataValues = validTotales.slice(0, maxLength);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Ventas (C$)',
        data: dataValues,
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4ECDC4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4,
        callbacks: {
          label: (context) => `Ventas: C$${context.raw.toFixed(2)}`,
        },
      },
      datalabels: {
        color: '#333',
        anchor: 'end',
        align: 'top',
        offset: 10,
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: (value) => `C$${value.toFixed(0)}`,
        display: (context) => context.dataset.data[context.dataIndex] > 0,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: (value) => `C$${value}`,
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: '15px', background: '#f8f9fa' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4" style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>
          Ventas Mensuales
        </Card.Title>
        {validMeses[0] === 'Sin datos' || dataValues.every(val => val === 0) ? (
          <div className="text-center text-muted" style={{ fontSize: '1.2rem', padding: '20px' }}>
            No hay datos disponibles
          </div>
        ) : (
          <div style={{ height: '350px', maxWidth: '900px', margin: '0 auto' }}>
            <Line data={data} options={options} ref={chartRef} />
            <Button
              variant="primary"
              onClick={generatePDF}
              style={{ marginTop: '15px', width: '100%' }}
            >
              Generar PDF
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TotalVentasPorMes;

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ChatIA from '../components/chat/ChatIA';

// Importa todos los componentes de gráficos
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import VentasProductosPorMes from '../components/graficos/ventasproductospormes';
import VentasPorClienteEmpleadoYMes from '../components/graficos/ventasporclienteempleadoymes';
import TotalVentasPorMes from '../components/graficos/TotalVentasPorMes';
import TotalVentasPorEmpleadoYMes from '../components/graficos/TotalVentasPorEmpleadoYMes';
import TotalVentasPorEmpleado from '../components/graficos/TotalVentasPorEmpleado';
import TotalVentasPorDiaSemana from '../components/graficos/TotalVentasPorDiaSemana';
import TotalVentasPorDia from '../components/graficos/TotalVentasPorDia';
import TotalVentasPorCategoriaYMes from '../components/graficos/TotalVentasPorCategoriaYMes';
import TotalVentasPorCategoria from '../components/graficos/TotalVentasPorCategoria';
import TotalVentasPorAnio from '../components/graficos/TotalVentasPorAnio';
import TotalComprasPorClienteYMes from '../components/graficos/TotalComprasPorClienteYMes';
import TotalComprasPorCliente from '../components/graficos/TotalComprasPorCliente';
import StockPorCategoria from '../components/graficos/StockPorCategoria';
import PromedioVentasPorEmpleadoYMes from '../components/graficos/PromedioVentasPorEmpleadoYMes';
import PromedioVentasPorEmpleado from '../components/graficos/PromedioVentasPorEmpleado';
import ProductosMayorRotacion from '../components/graficos/ProductosMayorRotacion';
import ProductosMasVendidosPorValor from '../components/graficos/ProductosMasVendidosPorValor';
import ProductosMasCompradosPorCliente from '../components/graficos/ProductosMasCompradosPorCliente';
import ProductosBajoStock from '../components/graficos/ProductosBajoStock';
import ClientesFrecuentesPorMes from '../components/graficos/ClientesFrecuentesPorMes';
import ClientesFrecuentes from '../components/graficos/ClientesFrecuentes';
import CategoriasMayorRotacion from '../components/graficos/CategoriasMayorRotacion';
import CategoriasMasCompradasPorCliente from '../components/graficos/CategoriasMasCompradasPorCliente';
import CantidadVentasPorEmpleado from '../components/graficos/CantidadVentasPorEmpleado';
import CantidadComprasPorCliente from '../components/graficos/CantidadComprasPorCliente';
import VentasPorCategoriaYDiaSemana from '../components/graficos/VentasPorCategoriaYDiaSemana';

const Estadisticas = () => {
  // Estado para controlar la visibilidad del modal del chat
  const [mostrarChatModal, setMostrarChatModal] = useState(false);

  // Estados para todos los gráficos
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalVentas, setTotalVentas] = useState([]);
  const [mesesProductos, setMesesProductos] = useState([]);
  const [ventasPorProducto, setVentasPorProducto] = useState([]);
  const [mesesClienteEmpleado, setMesesClienteEmpleado] = useState([]);
  const [ventasPorClienteEmpleado, setVentasPorClienteEmpleado] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [ventasPorCategoriaDia, setVentasPorCategoriaDia] = useState([]);
  const [mesesTotalVentas, setMesesTotalVentas] = useState([]);
  const [totalVentasPorMes, setTotalVentasPorMes] = useState([]);
  const [mesesEmpleadoVentas, setMesesEmpleadoVentas] = useState([]);
  const [totalVentasPorEmpleado, setTotalVentasPorEmpleado] = useState([]);
  const [empleadosTotalVentas, setEmpleadosTotalVentas] = useState([]);
  const [totalVentasPorEmp, setTotalVentasPorEmp] = useState([]);
  const [diasSemanaVentas, setDiasSemanaVentas] = useState([]);
  const [totalVentasPorDiaSemana, setTotalVentasPorDiaSemana] = useState([]);
  const [dias, setDias] = useState([]);
  const [totalVentasPorDia, setTotalVentasPorDia] = useState([]);
  const [mesesCategoriaVentas, setMesesCategoriaVentas] = useState([]);
  const [totalVentasPorCategoria, setTotalVentasPorCategoria] = useState([]);
  const [categoriasVentas, setCategoriasVentas] = useState([]);
  const [totalVentasPorCat, setTotalVentasPorCat] = useState([]);
  const [anios, setAnios] = useState([]);
  const [totalVentasPorAnio, setTotalVentasPorAnio] = useState([]);
  const [mesesComprasCliente, setMesesComprasCliente] = useState([]);
  const [comprasPorCliente, setComprasPorCliente] = useState([]);
  const [clientesCompras, setClientesCompras] = useState([]);
  const [totalComprasPorCliente, setTotalComprasPorCliente] = useState([]);
  const [categoriasStock, setCategoriasStock] = useState([]);
  const [stockTotal, setStockTotal] = useState([]);
  const [mesesPromedioEmpleado, setMesesPromedioEmpleado] = useState([]);
  const [promedioVentasPorEmpleadoMes, setPromedioVentasPorEmpleadoMes] = useState([]);
  const [empleadosPromedio, setEmpleadosPromedio] = useState([]);
  const [promedioVentasPorEmp, setPromedioVentasPorEmp] = useState([]);
  const [productosRotacion, setProductosRotacion] = useState([]);
  const [rotacionTotalProductos, setRotacionTotalProductos] = useState([]);
  const [productosValor, setProductosValor] = useState([]);
  const [valorVentasProductos, setValorVentasProductos] = useState([]);
  const [productosComprados, setProductosComprados] = useState([]);
  const [comprasPorClienteProducto, setComprasPorClienteProducto] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [stockActual, setStockActual] = useState([]);
  const [mesesFrecuencia, setMesesFrecuencia] = useState([]);
  const [frecuenciaPorClienteMes, setFrecuenciaPorClienteMes] = useState([]);
  const [clientesFrecuentes, setClientesFrecuentes] = useState([]);
  const [frecuenciaTotalClientes, setFrecuenciaTotalClientes] = useState([]);
  const [categoriasRotacion, setCategoriasRotacion] = useState([]);
  const [rotacionTotalCategorias, setRotacionTotalCategorias] = useState([]);
  const [categoriasCompradas, setCategoriasCompradas] = useState([]);
  const [comprasPorClienteCategoria, setComprasPorClienteCategoria] = useState([]);
  const [empleadosCantidadVentas, setEmpleadosCantidadVentas] = useState([]);
  const [cantidadVentasPorEmp, setCantidadVentasPorEmp] = useState([]);
  const [clientesCantidadCompras, setClientesCantidadCompras] = useState([]);
  const [cantidadComprasPorCliente, setCantidadComprasPorCliente] = useState([]);

  // Referencias para todos los gráficos
  const chartRefVentasPorMes = useRef(null);
  const chartRefVentasPorEmpleado = useRef(null);
  const chartRefVentasProductosPorMes = useRef(null);
  const chartRefVentasPorClienteEmpleadoYMes = useRef(null);
  const chartRefVentasPorCategoriaYDiaSemana = useRef(null);
  const chartRefTotalVentasPorMes = useRef(null);
  const chartRefTotalVentasPorEmpleadoYMes = useRef(null);
  const chartRefTotalVentasPorEmpleado = useRef(null);
  const chartRefTotalVentasPorDiaSemana = useRef(null);
  const chartRefTotalVentasPorDia = useRef(null);
  const chartRefTotalVentasPorCategoriaYMes = useRef(null);
  const chartRefTotalVentasPorCategoria = useRef(null);
  const chartRefTotalVentasPorAnio = useRef(null);
  const chartRefTotalComprasPorClienteYMes = useRef(null);
  const chartRefTotalComprasPorCliente = useRef(null);
  const chartRefStockPorCategoria = useRef(null);
  const chartRefPromedioVentasPorEmpleadoYMes = useRef(null);
  const chartRefPromedioVentasPorEmpleado = useRef(null);
  const chartRefProductosMayorRotacion = useRef(null);
  const chartRefProductosMasVendidosPorValor = useRef(null);
  const chartRefProductosMasCompradosPorCliente = useRef(null);
  const chartRefProductosBajoStock = useRef(null);
  const chartRefClientesFrecuentesPorMes = useRef(null);
  const chartRefClientesFrecuentes = useRef(null);
  const chartRefCategoriasMayorRotacion = useRef(null);
  const chartRefCategoriasMasCompradasPorCliente = useRef(null);
  const chartRefCantidadVentasPorEmpleado = useRef(null);
  const chartRefCantidadComprasPorCliente = useRef(null);

  // Funciones de generación de PDF para cada gráfico
  const generarReporteVentasPorMes = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Ventas por Mes', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Mes', 'Total Ventas']],
      body: meses.map((mes, index) => [mes, totalesPorMes[index]]),
    });
    const canvas = chartRefVentasPorMes.current?.canvas;
    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 28;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 14, doc.lastAutoTable.finalY + 10, pdfWidth, pdfHeight);
    }
    doc.save('Reporte_VentasPorMes.pdf');
  };

  const generarReporteVentasPorEmpleado = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Ventas por Empleado', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Empleado', 'Total Ventas']],
      body: empleados.map((emp, index) => [emp, totalVentas[index]]),
    });
    const canvas = chartRefVentasPorEmpleado.current?.canvas;
    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 28;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 14, doc.lastAutoTable.finalY + 10, pdfWidth, pdfHeight);
    }
    doc.save('Reporte_VentasPorEmpleado.pdf');
  };

  const generarReporteVentasProductosPorMes = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Ventas de Productos por Mes', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Mes', 'Producto', 'Ventas']],
      body: mesesProductos.flatMap((mes, i) =>
        ventasPorProducto[i]?.map((venta, j) => [mes, `Producto ${j + 1}`, venta]) || []
      ),
    });
    const canvas = chartRefVentasProductosPorMes.current?.canvas;
    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 28;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 14, doc.lastAutoTable.finalY + 10, pdfWidth, pdfHeight);
    }
    doc.save('Reporte_VentasProductosPorMes.pdf');
  };

  const generarReporteVentasPorCategoriaYDiaSemana = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Ventas por Categoría y Día de la Semana', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Día de la Semana', 'Categoría', 'Ventas']],
      body: diasSemana.flatMap((dia, i) =>
        ventasPorCategoriaDia[i]?.map((venta, j) => [dia, `Categoría ${j + 1}`, venta]) || []
      ),
    });
    const canvas = chartRefVentasPorCategoriaYDiaSemana.current?.canvas;
    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 28;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 14, doc.lastAutoTable.finalY + 10, pdfWidth, pdfHeight);
    }
    doc.save('Reporte_VentasPorCategoriaYDiaSemana.pdf');
  };

  const generarReporteTotalVentasPorCategoria = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Total Ventas por Categoría', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Categoría', 'Total Ventas']],
      body: categoriasVentas.map((cat, index) => [cat, totalVentasPorCat[index]]),
    });
    const canvas = chartRefTotalVentasPorCategoria.current?.canvas;
    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 28;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 14, doc.lastAutoTable.finalY + 10, pdfWidth, pdfHeight);
    }
    doc.save('Reporte_TotalVentasPorCategoria.pdf');
  };

  // Fetch data on component mount
  useEffect(() => {
    const cargaVentasPorMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorMes');
        const data = await response.json();
        setMeses(data.map(item => item.mes));
        setTotalesPorMes(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas por mes:', error);
        alert('Error al cargar ventas por mes: ' + error.message);
      }
    };

    const cargaVentasPorEmpleado = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorEmpleado');
        const data = await response.json();
        setEmpleados(data.map(item => item.primer_nombre + " " + item.primer_apellido));
        setTotalVentas(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar ventas por empleado:', error);
        alert('Error al cargar ventas por empleado: ' + error.message);
      }
    };

    const cargaVentasProductosPorMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/ventasProductosPorMes');
        const data = await response.json();
        setMesesProductos(data.meses);
        setVentasPorProducto(data.ventas_por_producto);
      } catch (error) {
        console.error('Error al cargar ventas productos por mes:', error);
        alert('Error al cargar ventas productos por mes: ' + error.message);
      }
    };

    const cargaVentasPorClienteEmpleadoYMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/ventasPorClienteEmpleadoYMes');
        const data = await response.json();
        setMesesClienteEmpleado(data.meses);
        setVentasPorClienteEmpleado(data.ventas_por_cliente_empleado);
      } catch (error) {
        console.error('Error al cargar ventas por cliente empleado y mes:', error);
        alert('Error al cargar ventas por cliente empleado y mes: ' + error.message);
      }
    };

    const cargaVentasPorCategoriaYDiaSemana = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/ventasPorCategoriaYDiaSemana');
        const data = await response.json();
        setDiasSemana(data.dias_semana);
        setVentasPorCategoriaDia(data.ventas_por_categoria);
      } catch (error) {
        console.error('Error al cargar ventas por categoría y día semana:', error);
        alert('Error al cargar ventas por categoría y día semana: ' + error.message);
      }
    };

    const cargaTotalVentasPorMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorMes');
        const data = await response.json();
        setMesesTotalVentas(data.map(item => item.mes));
        setTotalVentasPorMes(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar total ventas por mes:', error);
        alert('Error al cargar total ventas por mes: ' + error.message);
      }
    };

    const cargaTotalVentasPorEmpleadoYMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorEmpleadoYMes');
        const data = await response.json();
        setMesesEmpleadoVentas(data.meses);
        setTotalVentasPorEmpleado(data.total_ventas_por_empleado);
      } catch (error) {
        console.error('Error al cargar total ventas por empleado y mes:', error);
        alert('Error al cargar total ventas por empleado y mes: ' + error.message);
      }
    };

    const cargaTotalVentasPorEmp = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorEmpleado');
        const data = await response.json();
        setEmpleadosTotalVentas(data.map(item => item.primer_nombre + " " + item.primer_apellido));
        setTotalVentasPorEmp(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar total ventas por empleado:', error);
        alert('Error al cargar total ventas por empleado: ' + error.message);
      }
    };

    const cargaTotalVentasPorDiaSemana = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorDiaSemana');
        const data = await response.json();
        setDiasSemanaVentas(data.map(item => item.dia_semana));
        setTotalVentasPorDiaSemana(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar total ventas por día semana:', error);
        alert('Error al cargar total ventas por día semana: ' + error.message);
      }
    };

    const cargaTotalVentasPorDia = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorDia');
        const data = await response.json();
        setDias(data.map(item => item.dia));
        setTotalVentasPorDia(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar total ventas por día:', error);
        alert('Error al cargar total ventas por día: ' + error.message);
      }
    };

    const cargaTotalVentasPorCategoriaYMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorCategoriaYMes');
        const data = await response.json();
        setMesesCategoriaVentas(data.meses);
        setTotalVentasPorCategoria(data.ventas_por_categoria);
      } catch (error) {
        console.error('Error al cargar total ventas por categoría y mes:', error);
        alert('Error al cargar total ventas por categoría y mes: ' + error.message);
      }
    };

    const cargaTotalVentasPorCategoria = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorCategoria');
        const data = await response.json();
        setCategoriasVentas(data.map(item => item.categoria));
        setTotalVentasPorCat(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar total ventas por categoría:', error);
        alert('Error al cargar total ventas por categoría: ' + error.message);
      }
    };

    const cargaTotalVentasPorAnio = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorAnio');
        const data = await response.json();
        setAnios(data.map(item => item.anio));
        setTotalVentasPorAnio(data.map(item => item.total_ventas));
      } catch (error) {
        console.error('Error al cargar total ventas por año:', error);
        alert('Error al cargar total ventas por año: ' + error.message);
      }
    };

    const cargaTotalComprasPorClienteYMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalComprasPorClienteYMes');
        const data = await response.json();
        setMesesComprasCliente(data.meses);
        setComprasPorCliente(data.compras_por_cliente);
      } catch (error) {
        console.error('Error al cargar total compras por cliente y mes:', error);
        alert('Error al cargar total compras por cliente y mes: ' + error.message);
      }
    };

    const cargaTotalComprasPorCliente = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalComprasPorCliente');
        const data = await response.json();
        setClientesCompras(data.map(item => item.cliente));
        setTotalComprasPorCliente(data.map(item => item.total_compras));
      } catch (error) {
        console.error('Error al cargar total compras por cliente:', error);
        alert('Error al cargar total compras por cliente: ' + error.message);
      }
    };

    const cargaStockPorCategoria = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stockPorCategoria');
        const data = await response.json();
        setCategoriasStock(data.map(item => item.categoria));
        setStockTotal(data.map(item => item.stock_total));
      } catch (error) {
        console.error('Error al cargar stock por categoría:', error);
        alert('Error al cargar stock por categoría: ' + error.message);
      }
    };

    const cargaPromedioVentasPorEmpleadoYMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/promedioVentasPorEmpleadoYMes');
        const data = await response.json();
        setMesesPromedioEmpleado(data.meses);
        setPromedioVentasPorEmpleadoMes(data.promedio_ventas_por_empleado);
      } catch (error) {
        console.error('Error al cargar promedio ventas por empleado y mes:', error);
        alert('Error al cargar promedio ventas por empleado y mes: ' + error.message);
      }
    };

    const cargaPromedioVentasPorEmpleado = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/promedioVentasPorEmpleado');
        const data = await response.json();
        setEmpleadosPromedio(data.map(item => item.primer_nombre + " " + item.primer_apellido));
        setPromedioVentasPorEmp(data.map(item => item.promedio_ventas));
      } catch (error) {
        console.error('Error al cargar promedio ventas por empleado:', error);
        alert('Error al cargar promedio ventas por empleado: ' + error.message);
      }
    };

    const cargaProductosMayorRotacion = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productosMayorRotacion');
        const data = await response.json();
        setProductosRotacion(data.map(item => item.producto));
        setRotacionTotalProductos(data.map(item => item.rotacion_total));
      } catch (error) {
        console.error('Error al cargar productos mayor rotación:', error);
        alert('Error al cargar productos mayor rotación: ' + error.message);
      }
    };

    const cargaProductosMasVendidosPorValor = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productosMasVendidosPorValor');
        const data = await response.json();
        setProductosValor(data.map(item => item.producto));
        setValorVentasProductos(data.map(item => item.valor_ventas));
      } catch (error) {
        console.error('Error al cargar productos más vendidos por valor:', error);
        alert('Error al cargar productos más vendidos por valor: ' + error.message);
      }
    };

    const cargaProductosMasCompradosPorCliente = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productosMasCompradosPorCliente');
        const data = await response.json();
        setProductosComprados(data.productos);
        setComprasPorClienteProducto(data.compras_por_cliente);
      } catch (error) {
        console.error('Error al cargar productos más comprados por cliente:', error);
        alert('Error al cargar productos más comprados por cliente: ' + error.message);
      }
    };

    const cargaProductosBajoStock = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productosBajoStock');
        const data = await response.json();
        setProductosBajoStock(data.map(item => item.producto));
        setStockActual(data.map(item => item.stock_actual));
      } catch (error) {
        console.error('Error al cargar productos bajo stock:', error);
        alert('Error al cargar productos bajo stock: ' + error.message);
      }
    };

    const cargaClientesFrecuentesPorMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clientesFrecuentesPorMes');
        const data = await response.json();
        setMesesFrecuencia(data.meses);
        setFrecuenciaPorClienteMes(data.frecuencia_por_cliente);
      } catch (error) {
        console.error('Error al cargar clientes frecuentes por mes:', error);
        alert('Error al cargar clientes frecuentes por mes: ' + error.message);
      }
    };

    const cargaClientesFrecuentes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clientesFrecuentes');
        const data = await response.json();
        setClientesFrecuentes(data.map(item => item.cliente));
        setFrecuenciaTotalClientes(data.map(item => item.frecuencia_total));
      } catch (error) {
        console.error('Error al cargar clientes frecuentes:', error);
        alert('Error al cargar clientes frecuentes: ' + error.message);
      }
    };

    const cargaCategoriasMayorRotacion = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categoriasMayorRotacion');
        const data = await response.json();
        setCategoriasRotacion(data.map(item => item.categoria));
        setRotacionTotalCategorias(data.map(item => item.rotacion_total));
      } catch (error) {
        console.error('Error al cargar categorías mayor rotación:', error);
        alert('Error al cargar categorías mayor rotación: ' + error.message);
      }
    };

    const cargaCategoriasMasCompradasPorCliente = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categoriasMasCompradasPorCliente');
        const data = await response.json();
        setCategoriasCompradas(data.categorias);
        setComprasPorClienteCategoria(data.compras_por_cliente);
      } catch (error) {
        console.error('Error al cargar categorías más compradas por cliente:', error);
        alert('Error al cargar categorías más compradas por cliente: ' + error.message);
      }
    };

    const cargaCantidadVentasPorEmpleado = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cantidadVentasPorEmpleado');
        const data = await response.json();
        setEmpleadosCantidadVentas(data.map(item => item.primer_nombre + " " + item.primer_apellido));
        setCantidadVentasPorEmp(data.map(item => item.cantidad_ventas));
      } catch (error) {
        console.error('Error al cargar cantidad ventas por empleado:', error);
        alert('Error al cargar cantidad ventas por empleado: ' + error.message);
      }
    };

    const cargaCantidadComprasPorCliente = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cantidadComprasPorCliente');
        const data = await response.json();
        setClientesCantidadCompras(data.map(item => item.cliente));
        setCantidadComprasPorCliente(data.map(item => item.cantidad_compras));
      } catch (error) {
        console.error('Error al cargar cantidad compras por cliente:', error);
        alert('Error al cargar cantidad compras por cliente: ' + error.message);
      }
    };

    // Ejecuta todas las funciones de carga
    cargaVentasPorMes();
    cargaVentasPorEmpleado();
    cargaVentasProductosPorMes();
    cargaVentasPorClienteEmpleadoYMes();
    cargaVentasPorCategoriaYDiaSemana();
    cargaTotalVentasPorMes();
    cargaTotalVentasPorEmpleadoYMes();
    cargaTotalVentasPorEmp();
    cargaTotalVentasPorDiaSemana();
    cargaTotalVentasPorDia();
    cargaTotalVentasPorCategoriaYMes();
    cargaTotalVentasPorCategoria();
    cargaTotalVentasPorAnio();
    cargaTotalComprasPorClienteYMes();
    cargaTotalComprasPorCliente();
    cargaStockPorCategoria();
    cargaPromedioVentasPorEmpleadoYMes();
    cargaPromedioVentasPorEmpleado();
    cargaProductosMayorRotacion();
    cargaProductosMasVendidosPorValor();
    cargaProductosMasCompradosPorCliente();
    cargaProductosBajoStock();
    cargaClientesFrecuentesPorMes();
    cargaClientesFrecuentes();
    cargaCategoriasMayorRotacion();
    cargaCategoriasMasCompradasPorCliente();
    cargaCantidadVentasPorEmpleado();
    cargaCantidadComprasPorCliente();
  }, []);

  // Renderiza todos los componentes con los datos obtenidos
  return (
    <Container fluid className="mt-4">
      <h4>Estadísticas</h4>
      
      <Button 
        variant="primary" 
        className="mb-4"
        onClick={() => setMostrarChatModal(true)}
      >
        Consultar con IA
      </Button>

      <ChatIA 
        mostrarChatModal={mostrarChatModal} 
        setMostrarChatModal={setMostrarChatModal} 
      />

      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} ref={chartRefVentasPorMes} />
          <Button variant="primary" onClick={generarReporteVentasPorMes} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorEmpleado empleados={empleados} total_ventas={totalVentas} ref={chartRefVentasPorEmpleado} />
          <Button variant="primary" onClick={generarReporteVentasPorEmpleado} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasProductosPorMes meses={mesesProductos} ventas_por_producto={ventasPorProducto} ref={chartRefVentasProductosPorMes} />
          <Button variant="primary" onClick={generarReporteVentasProductosPorMes} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorClienteEmpleadoYMes meses={mesesClienteEmpleado} ventas_por_cliente_empleado={ventasPorClienteEmpleado} ref={chartRefVentasPorClienteEmpleadoYMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorCategoriaYDiaSemana dias_semana={diasSemana} ventas_por_categoria={ventasPorCategoriaDia} ref={chartRefVentasPorCategoriaYDiaSemana} />
          <Button variant="primary" onClick={generarReporteVentasPorCategoriaYDiaSemana} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorMes meses={mesesTotalVentas} totales_por_mes={totalVentasPorMes} ref={chartRefTotalVentasPorMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorEmpleadoYMes meses={mesesEmpleadoVentas} total_ventas_por_empleado={totalVentasPorEmpleado} ref={chartRefTotalVentasPorEmpleadoYMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorEmpleado empleados={empleadosTotalVentas} total_ventas={totalVentasPorEmp} ref={chartRefTotalVentasPorEmpleado} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorDiaSemana dias_semana={diasSemanaVentas} total_ventas={totalVentasPorDiaSemana} ref={chartRefTotalVentasPorDiaSemana} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorDia dias={dias} total_ventas={totalVentasPorDia} ref={chartRefTotalVentasPorDia} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorCategoriaYMes meses={mesesCategoriaVentas} ventas_por_categoria={totalVentasPorCategoria} ref={chartRefTotalVentasPorCategoriaYMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorCategoria categorias={categoriasVentas} total_ventas={totalVentasPorCat} ref={chartRefTotalVentasPorCategoria} />
          <Button variant="primary" onClick={generarReporteTotalVentasPorCategoria} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalVentasPorAnio anios={anios} total_ventas={totalVentasPorAnio} ref={chartRefTotalVentasPorAnio} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalComprasPorClienteYMes meses={mesesComprasCliente} compras_por_cliente={comprasPorCliente} ref={chartRefTotalComprasPorClienteYMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <TotalComprasPorCliente clientes={clientesCompras} total_compras={totalComprasPorCliente} ref={chartRefTotalComprasPorCliente} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <StockPorCategoria categorias={categoriasStock} stock_total={stockTotal} ref={chartRefStockPorCategoria} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <PromedioVentasPorEmpleadoYMes meses={mesesPromedioEmpleado} promedio_ventas_por_empleado={promedioVentasPorEmpleadoMes} ref={chartRefPromedioVentasPorEmpleadoYMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <PromedioVentasPorEmpleado empleados={empleadosPromedio} promedio_ventas={promedioVentasPorEmp} ref={chartRefPromedioVentasPorEmpleado} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ProductosMayorRotacion productos={productosRotacion} rotacion_total={rotacionTotalProductos} ref={chartRefProductosMayorRotacion} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ProductosMasVendidosPorValor productos={productosValor} valor_ventas={valorVentasProductos} ref={chartRefProductosMasVendidosPorValor} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ProductosMasCompradosPorCliente productos={productosComprados} compras_por_cliente={comprasPorClienteProducto} ref={chartRefProductosMasCompradosPorCliente} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ProductosBajoStock productos={productosBajoStock} stock_actual={stockActual} ref={chartRefProductosBajoStock} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ClientesFrecuentesPorMes meses={mesesFrecuencia} frecuencia_por_cliente={frecuenciaPorClienteMes} ref={chartRefClientesFrecuentesPorMes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ClientesFrecuentes clientes={clientesFrecuentes} frecuencia_total={frecuenciaTotalClientes} ref={chartRefClientesFrecuentes} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <CategoriasMayorRotacion categorias={categoriasRotacion} rotacion_total={rotacionTotalCategorias} ref={chartRefCategoriasMayorRotacion} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <CategoriasMasCompradasPorCliente categorias={categoriasCompradas} compras_por_cliente={comprasPorClienteCategoria} ref={chartRefCategoriasMasCompradasPorCliente} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <CantidadVentasPorEmpleado empleados={empleadosCantidadVentas} cantidad_ventas={cantidadVentasPorEmp} ref={chartRefCantidadVentasPorEmpleado} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <CantidadComprasPorCliente clientes={clientesCantidadCompras} cantidad_compras={cantidadComprasPorCliente} ref={chartRefCantidadComprasPorCliente} />
          <Button variant="primary" onClick={() => {/* Agregar función */}} className="mt-2">
            Generar Reporte PDF
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
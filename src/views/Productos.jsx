import React, { useState, useEffect } from 'react';
import TablaProductos from '../components/producto/TablaProductos';
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import ModalEliminacionProducto from '../components/producto/ModalEliminacionProducto';
import ModalEdicionProducto from '../components/producto/ModalEdicionProducto';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Button, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Productos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });

  const obtenerProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setListaCategorias(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.id_categoria ||
        !nuevoProducto.precio_unitario || !nuevoProducto.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproductos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      await obtenerProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproducto/${productoAEliminar.id_producto}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar el producto');

      await obtenerProductos();
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1);
      setProductoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setMostrarModalEdicion(true);
  };

  const actualizarProducto = async () => {
    if (!productoEditado?.nombre_producto || !productoEditado?.id_categoria ||
        !productoEditado?.precio_unitario || !productoEditado?.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarproducto/${productoEditado.id_producto}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado),
      });
      if (!respuesta.ok) throw new Error('Error al actualizar el producto');

      await obtenerProductos();
      setMostrarModalEdicion(false);
      setProductoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);

    const filtrados = listaProductos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        (producto.descripcion_producto && producto.descripcion_producto.toLowerCase().includes(texto)) ||
        (producto.precio_unitario && producto.precio_unitario.toString().includes(texto))
    );
    setProductosFiltrados(filtrados);
  };

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // PDF Report Generation for All Products
  const generarPDFProductos = () => {
    const doc = new jsPDF();
    
    // Set header background
    doc.setFillColor(0, 123, 255);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Set title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text('Reporte de Productos', 105, 20, { align: 'center' });

    // Define table columns and data
    const columnas = ['ID', 'Nombre', 'Descripción', 'Categoría', 'Precio', 'Stock'];
    const datos = listaProductos.map(producto => [
      producto.id_producto,
      producto.nombre_producto,
      producto.descripcion_producto || 'N/A',
      producto.id_categoria,
      producto.precio_unitario,
      producto.stock
    ]);

    // Add table
    autoTable(doc, {
      head: [columnas],
      body: datos,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [0, 123, 255] },
      margin: { top: 40 }
    });

    // Add page number marker
    const totalPaginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(`Página ${i} de ${totalPaginas}`, 190, 290, { align: 'right' });
    }

    // Save the document
    const fecha = new Date().toISOString().slice(0, 10);
    doc.save(`Productos_${fecha}.pdf`);
  };

  // PDF Report Generation for a Single Product (Centered Layout)
  const generarPDFDetalleProducto = (producto) => {
    const doc = new jsPDF();
    
    // Page dimensions (A4 size in mm: 210mm wide, 297mm tall)
    const pageWidth = 210; // Width in mm
    const margin = 20; // Margin on each side
    const contentWidth = pageWidth - 2 * margin; // Usable width for content

    // Set header background
    doc.setFillColor(0, 123, 255);
    doc.rect(0, 0, pageWidth, 30, 'F');
    
    // Set title (already centered)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text(`Detalles del Producto: ${producto.nombre_producto}`, pageWidth / 2, 20, { align: 'center' });

    // Add product details (centered)
    let y = 40;
    doc.setTextColor(0);
    doc.setFontSize(12);

    // Helper function to center text
    const centerText = (text, yPos) => {
      doc.text(text, pageWidth / 2, yPos, { align: 'center' });
    };

    centerText(`ID: ${producto.id_producto}`, y);
    y += 10;
    centerText(`Nombre: ${producto.nombre_producto}`, y);
    y += 10;
    centerText(`Descripción: ${producto.descripcion_producto || 'N/A'}`, y);
    y += 10;
    centerText(`Categoría: ${producto.id_categoria}`, y);
    y += 10;
    centerText(`Precio: ${producto.precio_unitario}`, y);
    y += 10;
    centerText(`Stock: ${producto.stock}`, y);

    // Add image if available (centered)
    if (producto.imagen) {
      try {
        const imgWidth = 50; // Image width in mm
        const imgHeight = 50; // Image height in mm
        const imgX = (pageWidth - imgWidth) / 2; // Center the image horizontally
        doc.addImage(`data:image/png;base64,${producto.imagen}`, 'PNG', imgX, y + 10, imgWidth, imgHeight);
      } catch (error) {
        console.error('Error al agregar la imagen al PDF:', error);
      }
    }

    // Save the document
    const fecha = new Date().toISOString().slice(0, 10);
    doc.save(`Producto_${producto.id_producto}_${fecha}.pdf`);
  };

  // Excel Report Generation
  const exportarExcelProductos = () => {
    // Define data structure
    const datos = listaProductos.map(producto => ({
      ID: producto.id_producto,
      Nombre: producto.nombre_producto,
      Descripción: producto.descripcion_producto || 'N/A',
      Categoría: producto.id_categoria,
      Precio: producto.precio_unitario,
      Stock: producto.stock
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const nombreArchivo = `Productos_${new Date().toISOString().slice(0, 10)}.xlsx`;
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, nombreArchivo);
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Productos</h4>

      <Row>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
            Nuevo Producto
          </Button>
        </Col>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={generarPDFProductos}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar reporte PDF
          </Button>
        </Col>
        <Col lg={2} md={4} sm={4} xs={5}>
          <Button
            className="mb-3"
            onClick={exportarExcelProductos}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar Excel
          </Button>
        </Col>
        <Col lg={2} md={4} sm={4} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <br /><br />

      <TablaProductos
        productos={productosPaginados}
        cargando={cargando}
        error={errorCarga}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalEdicion={abrirModalEdicion}
        generarPDFDetalleProducto={generarPDFDetalleProducto}
        totalElementos={listaProductos.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />

      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarProducto={eliminarProducto}
      />

      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditado={productoEditado}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarProducto={actualizarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />
    </Container>
  );
};

export default Productos;
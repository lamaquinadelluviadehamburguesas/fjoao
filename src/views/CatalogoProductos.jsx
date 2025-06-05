import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Carousel } from 'react-bootstrap';
import Tarjeta from '../components/catalogo/Tarjeta';
import CarouselProductImage from '../components/carousel/CarouselProductImage';
import './CatalogoProductos.css';

const CatalogoProductos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      console.log('Datos de productos recibidos:', datos[0]); // Debug
      setListaProductos(datos);
      
      // Simulamos productos más vendidos (los primeros 3)
      const masVendidos = datos.slice(0, 3);
      console.log('Productos más vendidos:', masVendidos[0]); // Debug
      setProductosMasVendidos(masVendidos);
      
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Obtener categorías
  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setCategorias(datos);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  // Filtrar productos basado en la búsqueda y categoría
  const productosFiltrados = listaProductos.filter(producto => {
    const coincideBusqueda = producto.nombre_producto.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === 'todas' || producto.id_categoria === parseInt(categoriaSeleccionada);
    return coincideBusqueda && coincideCategoria;
  });

  // Determinar si se debe mostrar el carrusel
  const mostrarCarrusel = busqueda === '' && categoriaSeleccionada === 'todas';

  if (cargando) return <div>Cargando...</div>;
  if (errorCarga) return <div>Error: {errorCarga}</div>;

  return (
    <Container className="mt-5">
      <h4>Catálogo de Productos</h4>
      <div className="mb-4">
        <h5>Categorías</h5>
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <button 
            className={`btn ${categoriaSeleccionada === 'todas' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSeleccionada('todas')}
          >
            Todas
          </button>
          {categorias.map(categoria => (
            <button
              key={categoria.id_categoria}
              className={`btn ${categoriaSeleccionada === categoria.id_categoria.toString() ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setCategoriaSeleccionada(categoria.id_categoria.toString())}
            >
              {categoria.nombre_categoria}
            </button>
          ))}
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre del producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Form.Group>

      {/* Carrusel de productos más vendidos - solo se muestra cuando no hay búsqueda ni categoría seleccionada */}
      {mostrarCarrusel && (
        <div className="mb-5">
          <h5 className="mb-3">Productos más vendidos</h5>
          <div className="carousel-container">
            {productosMasVendidos.length > 0 ? (
              <Carousel 
                interval={3000} 
                className="product-carousel"
                indicators={true}
                controls={true}
              >
                {productosMasVendidos.map((producto) => (
                  <Carousel.Item key={producto.id_producto}>
                    <CarouselProductImage 
                      imagen={producto.imagen} 
                      nombre={producto.nombre_producto}
                    />
                    <Carousel.Caption>
                      <h3>{producto.nombre_producto}</h3>
                      <p>{producto.descripcion_producto}</p>
                      <p className="price text-warning fw-bold">
                        Precio: ${producto.precio_unitario}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div className="text-center p-4">No hay productos destacados disponibles</div>
            )}
          </div>
        </div>
      )}

      <Row>
        {productosFiltrados.map((producto, indice) => (
          <Tarjeta
            key={producto.id_producto}
            indice={indice}
            nombre_producto={producto.nombre_producto}
            descripcion_producto={producto.descripcion_producto}
            precio_unitario={producto.precio_unitario}
            stock={producto.stock}
            id_categoria={producto.id_categoria}
            imagen={producto.imagen}
          />
        ))}
      </Row>
    </Container>
  );
};

export default CatalogoProductos;
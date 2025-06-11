import React, { useState, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { resizeImage } from '../../utils/imageUtils';

const ModalRegistroProducto = ({
  mostrar,
  handleClose,
  actualizarListaProductos
}) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });
  const [errorCarga, setErrorCarga] = useState(null);
  const [categorias, setCategorias] = useState([]);

  // Referencias para los campos
  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);
  const categoriaRef = useRef(null);
  const precioRef = useRef(null);
  const stockRef = useRef(null);
  const imagenRef = useRef(null);

  React.useEffect(() => {
    if (mostrar) {
      obtenerCategorias();
    }
  }, [mostrar]);

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setCategorias(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarKeyDown = (e, siguienteCampo) => {
    const charCode = e.which ? e.which : e.keyCode;
    
    // Si presiona Enter
    if (charCode === 13) {
      e.preventDefault();
      
      // Si hay un siguiente campo, mover el foco a él
      if (siguienteCampo) {
        siguienteCampo.current.focus();
      } else {
        // Si es el último campo y el formulario es válido, guardar
        if (validacionFormulario()) {
          agregarProducto();
        }
      }
    }
  };

  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return; // Permitir Enter

    if (
      (charCode < 65 || charCode > 90) && // Letras mayúsculas
      (charCode < 97 || charCode > 122) && // Letras minúsculas
      charCode !== 8 && // Retroceso
      charCode !== 46 && // Borrar
      charCode !== 9 && // Tab
      charCode !== 32 && // Espacio
      (charCode < 48 || charCode > 57) // Números
    ) {
      e.preventDefault();
    }
  };

  const validarNumeroPositivo = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return; // Permitir Enter

    const input = e.target;
    const value = input.value;
    const decimalCount = value.split('.').length - 1;
    const hasDecimal = value.includes('.');
    
    // Permitir punto decimal solo una vez y solo para precio
    if (charCode === 46 && input.name === 'precio_unitario') {
      if (hasDecimal || decimalCount >= 1) {
        e.preventDefault();
        return;
      }
    }

    // No permitir punto decimal para stock
    if (charCode === 46 && input.name === 'stock') {
      e.preventDefault();
      return;
    }

    // Permitir solo números y teclas de control
    if (
      (charCode < 48 || charCode > 57) && // Números (0-9)
      charCode !== 8 && // Retroceso
      charCode !== 46 && // Punto decimal
      charCode !== 9 // Tab
    ) {
      e.preventDefault();
    }

    // Validar que no sea negativo
    if (charCode === 45) { // Signo menos
      e.preventDefault();
    }

    // Para precio, validar máximo dos decimales
    if (input.name === 'precio_unitario' && hasDecimal) {
      const decimals = value.split('.')[1];
      if (decimals && decimals.length >= 2 && charCode !== 8 && charCode !== 46) {
        e.preventDefault();
      }
    }
  };

  const validarValorPositivo = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
      e.target.value = "0";
      manejarCambioInput(e);
    }
  };

  const manejarCambioImagen = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Redimensionar la imagen a un máximo de 800x800 píxeles
        const base64Image = await resizeImage(file, 800, 800);
        manejarCambioInput({
          target: { name: 'imagen', value: base64Image }
        });
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
      }
    }
  };

  const validacionFormulario = () => {
    return (
      nuevoProducto.nombre_producto.trim() !== "" &&
      nuevoProducto.id_categoria !== "" &&
      parseFloat(nuevoProducto.precio_unitario) > 0 &&
      parseInt(nuevoProducto.stock) >= 0
    );
  };

  const agregarProducto = async () => {
    if (!validacionFormulario()) {
      setErrorCarga("Por favor, completa todos los campos requeridos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproductos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el producto');
      }

      await actualizarListaProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      handleClose();
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorCarga && (
          <div className="alert alert-danger" role="alert">
            {errorCarga}
          </div>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProducto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              ref={nombreRef}
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarLetras(e);
                manejarKeyDown(e, descripcionRef);
              }}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              ref={descripcionRef}
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejarCambioInput}
              onKeyDown={(e) => manejarKeyDown(e, categoriaRef)}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              ref={categoriaRef}
              name="id_categoria"
              value={nuevoProducto.id_categoria}
              onChange={manejarCambioInput}
              onKeyDown={(e) => manejarKeyDown(e, precioRef)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre_categoria}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrecioProducto">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              ref={precioRef}
              type="text"
              name="precio_unitario"
              value={nuevoProducto.precio_unitario}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarNumeroPositivo(e);
                manejarKeyDown(e, stockRef);
              }}
              onBlur={validarValorPositivo}
              placeholder="Ingresa el precio"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStockProducto">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              ref={stockRef}
              type="text"
              name="stock"
              value={nuevoProducto.stock}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarNumeroPositivo(e);
                manejarKeyDown(e, imagenRef);
              }}
              onBlur={validarValorPositivo}
              placeholder="Ingresa el stock"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagenProducto">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              ref={imagenRef}
              type="file"
              accept="image/*"
              onChange={manejarCambioImagen}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarProducto}
          disabled={!validacionFormulario()}
        >
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;
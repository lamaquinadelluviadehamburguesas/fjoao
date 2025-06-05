import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { resizeImage } from '../../utils/imageUtils';

const ModalEdicionProducto = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  productoEditado,
  manejarCambioInputEdicion,
  actualizarProducto,
  errorCarga,
  categorias
}) => {
  const manejarCambioImagen = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Redimensionar la imagen a un máximo de 800x800 píxeles
        const base64Image = await resizeImage(file, 800, 800);
        manejarCambioInputEdicion({
          target: { name: 'imagen', value: base64Image }
        });
      } catch (error) {
        console.error('Error al procesar la imagen:', error);
      }
    }
  };

  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProducto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={productoEditado?.nombre_producto || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Nombre del producto (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={productoEditado?.descripcion_producto || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Descripción del producto (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="id_categoria"
              value={productoEditado?.id_categoria || ""}
              onChange={manejarCambioInputEdicion}
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
          <Form.Group className="mb-3" controlId="formPrecioUnitario">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              name="precio_unitario"
              value={productoEditado?.precio_unitario || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Precio unitario"
              step="0.01"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productoEditado?.stock || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Cantidad en stock"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImagenProducto">
            <Form.Label>Imagen del Producto</Form.Label>
            {productoEditado?.imagen && (
              <div className="mb-2">
                <img
                  src={`data:image/jpeg;base64,${productoEditado.imagen}`}
                  alt="Imagen actual"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              name="imagen"
              accept="image/*"
              onChange={manejarCambioImagen}
            />
            <Form.Text className="text-muted">
              La imagen será redimensionada automáticamente a un tamaño óptimo.
              {productoEditado?.imagen && " Si no seleccionas una nueva imagen, se mantendrá la imagen actual."}
            </Form.Text>
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarProducto}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;

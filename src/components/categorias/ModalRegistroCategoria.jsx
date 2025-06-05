// ModalRegistroCategoria.jsx
import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCategoria = ({
  mostrarModal,
  setMostrarModal,
  nuevaCategoria,
  manejarCambioInput,
  agregarCategoria,
  errorCarga,
}) => {
  // Referencias para los campos
  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);

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
          agregarCategoria();
        }
      }
    }
  };

  const validarSoloLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return; // Permitir Enter

    // Solo permitir letras, espacios y teclas de control
    if (
      (charCode < 65 || charCode > 90) && // Letras mayúsculas
      (charCode < 97 || charCode > 122) && // Letras minúsculas
      charCode !== 8 && // Retroceso
      charCode !== 46 && // Borrar
      charCode !== 9 && // Tab
      charCode !== 32 && // Espacio
      charCode !== 209 && // Ñ mayúscula
      charCode !== 241 // ñ minúscula
    ) {
      e.preventDefault(); // Evita que se escriba el carácter
    }

    // Evitar espacios consecutivos
    if (charCode === 32) { // Si es espacio
      const value = e.target.value;
      if (value.endsWith(' ')) {
        e.preventDefault();
      }
    }
  };

  const validacionFormulario = () => {
    return (
      nuevaCategoria.nombre_categoria.trim() !== ""
    );
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCategoria">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              ref={nombreRef}
              type="text"
              name="nombre_categoria"
              value={nuevaCategoria.nombre_categoria}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarSoloLetras(e);
                manejarKeyDown(e, descripcionRef);
              }}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcionCategoria">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              ref={descripcionRef}
              as="textarea"
              rows={3}
              name="descripcion_categoria"
              value={nuevaCategoria.descripcion_categoria}
              onChange={manejarCambioInput}
              onKeyDown={(e) => manejarKeyDown(e, null)}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={agregarCategoria}
          disabled={!validacionFormulario()}
        >
          Guardar Categoría
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;
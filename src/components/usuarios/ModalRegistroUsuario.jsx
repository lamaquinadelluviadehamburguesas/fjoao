// ModalRegistroUsuario.jsx
import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
  errorCarga,
}) => {
  // Referencias para los campos
  const usuarioRef = useRef(null);
  const contraseñaRef = useRef(null);

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
          agregarUsuario();
        }
      }
    }
  };

  const validarAlfanumerico = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return; // Permitir Enter

    // Permitir letras, números y algunos caracteres especiales
    if (
      !(
        (charCode >= 48 && charCode <= 57) || // Números
        (charCode >= 65 && charCode <= 90) || // Letras mayúsculas
        (charCode >= 97 && charCode <= 122) || // Letras minúsculas
        charCode === 8 || // Retroceso
        charCode === 46 || // Borrar
        charCode === 9 || // Tab
        charCode === 95 || // Guión bajo
        charCode === 45 // Guión medio
      )
    ) {
      e.preventDefault();
    }
  };

  const validacionFormulario = () => {
    return (
      nuevoUsuario.usuario.trim() !== "" &&
      nuevoUsuario.contraseña.trim() !== ""
    );
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              ref={usuarioRef}
              type="text"
              name="usuario"
              value={nuevoUsuario.usuario}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarAlfanumerico(e);
                manejarKeyDown(e, contraseñaRef);
              }}
              placeholder="Ingresa el usuario (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContraseña">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              ref={contraseñaRef}
              type="password"
              name="contraseña"
              value={nuevoUsuario.contraseña}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarAlfanumerico(e);
                manejarKeyDown(e, null);
              }}
              placeholder="Ingresa la contraseña (máx. 20 caracteres)"
              maxLength={20}
              required
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
          onClick={agregarUsuario}
          disabled={!validacionFormulario()}
        >
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroUsuario;
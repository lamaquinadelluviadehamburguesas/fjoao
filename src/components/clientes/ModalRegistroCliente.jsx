// ModalRegistroCliente.jsx
import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,
}) => {
  // Referencias para los campos del formulario
  const primerNombreRef = useRef(null);
  const segundoNombreRef = useRef(null);
  const primerApellidoRef = useRef(null);
  const segundoApellidoRef = useRef(null);
  const celularRef = useRef(null);
  const direccionRef = useRef(null);
  const cedulaRef = useRef(null);

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
          agregarCliente();
        }
      }
    }
  };

  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode < 65 || charCode > 90) && // Letras mayúsculas
      (charCode < 97 || charCode > 122) && // Letras minúsculas
      charCode !== 32 && // Espacio
      charCode !== 8 && // Retroceso
      charCode !== 46 && // Borrar
      charCode !== 9 && // Tab
      charCode !== 13 // Enter
    ) {
      e.preventDefault(); // Evita que se escriba el carácter
    }
  };

  const validarCedula = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return; // Permitir Enter

    const input = e.target;
    const value = input.value;
    
    // Si no es el último carácter, solo permite números
    if (value.length < input.maxLength - 1) {
      if (
        (charCode < 48 || charCode > 57) && // Números (0-9)
        charCode !== 8 && // Retroceso
        charCode !== 46 && // Borrar
        charCode !== 9 // Tab
      ) {
        e.preventDefault();
      }
    } else {
      // En el último carácter, solo permite letras
      if (
        (charCode < 65 || charCode > 90) && // Letras mayúsculas
        (charCode < 97 || charCode > 122) && // Letras minúsculas
        charCode !== 8 && // Retroceso
        charCode !== 46 && // Borrar
        charCode !== 9 // Tab
      ) {
        e.preventDefault();
      }
    }
  };

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return; // Permitir Enter

    if (
      (charCode < 48 || charCode > 57) && // Números (0-9)
      charCode !== 8 && // Retroceso
      charCode !== 46 && // Borrar
      charCode !== 9 // Tab
    ) {
      e.preventDefault(); // Evita que se escriba el carácter
    }
  };

  const validacionFormulario = () => {
    return (
      nuevoCliente?.primer_nombre?.trim() !== "" &&
      nuevoCliente?.primer_apellido?.trim() !== "" &&
      nuevoCliente?.celular?.trim() !== "" &&
      nuevoCliente?.cedula?.trim() !== ""
    );
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              ref={primerNombreRef}
              type="text"
              name="primer_nombre"
              value={nuevoCliente?.primer_nombre || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarLetras(e);
                manejarKeyDown(e, segundoNombreRef);
              }}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSegundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              ref={segundoNombreRef}
              type="text"
              name="segundo_nombre"
              value={nuevoCliente?.segundo_nombre || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarLetras(e);
                manejarKeyDown(e, primerApellidoRef);
              }}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrimerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              ref={primerApellidoRef}
              type="text"
              name="primer_apellido"
              value={nuevoCliente?.primer_apellido || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarLetras(e);
                manejarKeyDown(e, segundoApellidoRef);
              }}
              placeholder="Ingresa el primer apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSegundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              ref={segundoApellidoRef}
              type="text"
              name="segundo_apellido"
              value={nuevoCliente?.segundo_apellido || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarLetras(e);
                manejarKeyDown(e, celularRef);
              }}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCelular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              ref={celularRef}
              type="text"
              name="celular"
              value={nuevoCliente?.celular || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarNumeros(e);
                manejarKeyDown(e, direccionRef);
              }}
              placeholder="Ingresa el número celular (8 dígitos)"
              maxLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              ref={direccionRef}
              type="text"
              name="direccion"
              value={nuevoCliente?.direccion || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => manejarKeyDown(e, cedulaRef)}
              placeholder="Ingresa la dirección (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              ref={cedulaRef}
              type="text"
              name="cedula"
              value={nuevoCliente?.cedula || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarCedula(e);
                manejarKeyDown(e, null);
              }}
              placeholder="Ingresa la cédula (10 caracteres)"
              maxLength={10}
              required
            />
          </Form.Group>

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={agregarCliente}
          disabled={!validacionFormulario()}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;
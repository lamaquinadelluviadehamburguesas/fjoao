import React, { useRef, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
  errorCarga,
}) => {
  const primerNombreRef = useRef(null);
  const segundoNombreRef = useRef(null);
  const primerApellidoRef = useRef(null);
  const segundoApellidoRef = useRef(null);
  const celularRef = useRef(null);
  const cargoRef = useRef(null);
  const fechaContratacionRef = useRef(null);

  useEffect(() => {
    if (mostrarModal && primerNombreRef.current) {
      primerNombreRef.current.focus();
    }
  }, [mostrarModal]);

  const manejarKeyDown = (e, siguienteCampo) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) {
      e.preventDefault();
      if (siguienteCampo) {
        siguienteCampo.current.focus();
      } else {
        if (validacionFormulario()) {
          agregarEmpleado();
        }
      }
    }
  };

  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return;
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122) &&
      charCode !== 8 &&
      charCode !== 46 &&
      charCode !== 9 &&
      charCode !== 32
    ) {
      e.preventDefault();
    }
  };

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 13) return;
    if (
      (charCode < 48 || charCode > 57) &&
      charCode !== 8 &&
      charCode !== 46 &&
      charCode !== 9
    ) {
      e.preventDefault();
    }
  };

  const validacionFormulario = () => {
    return (
      (nuevoEmpleado?.primer_nombre || "").trim() !== "" &&
      (nuevoEmpleado?.primer_apellido || "").trim() !== "" &&
      (nuevoEmpleado?.celular || "").trim() !== "" &&
      (nuevoEmpleado?.cargo || "").trim() !== "" &&
      (nuevoEmpleado?.fecha_contratacion || "").trim() !== ""
    );
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              ref={primerNombreRef}
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado?.primer_nombre || ""}
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
              value={nuevoEmpleado?.segundo_nombre || ""}
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
              value={nuevoEmpleado?.primer_apellido || ""}
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
              value={nuevoEmpleado?.segundo_apellido || ""}
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
              value={nuevoEmpleado?.celular || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarNumeros(e);
                manejarKeyDown(e, cargoRef);
              }}
              placeholder="Ingresa el número celular (máx. 12 caracteres)"
              maxLength={12}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              ref={cargoRef}
              type="text"
              name="cargo"
              value={nuevoEmpleado?.cargo || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => {
                validarLetras(e);
                manejarKeyDown(e, fechaContratacionRef);
              }}
              placeholder="Ingresa el cargo (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFechaContratacion">
            <Form.Label>Fecha de Contratación</Form.Label>
            <Form.Control
              ref={fechaContratacionRef}
              type="date"
              name="fecha_contratacion"
              value={nuevoEmpleado?.fecha_contratacion || ""}
              onChange={manejarCambioInput}
              onKeyDown={(e) => manejarKeyDown(e, null)}
              required
            />
          </Form.Group>
          {errorCarga && <div className="text-danger mt-2">{errorCarga}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={!validacionFormulario()}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;
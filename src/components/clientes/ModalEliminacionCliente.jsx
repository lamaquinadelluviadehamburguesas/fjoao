import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";

const ModalEliminacionCliente = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  eliminarCliente,
  errorCarga,
  setErrorCarga
}) => {
  const handleClose = () => {
    setMostrarModalEliminacion(false);
    if (errorCarga) {
      setErrorCarga(null);
    }
  };

  return (
    <Modal show={mostrarModalEliminacion} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {errorCarga ? 'No se puede eliminar' : 'Confirmar Eliminación'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorCarga ? (
          <Alert variant="danger">
            <p>{errorCarga}</p>
          </Alert>
        ) : (
          <p>¿Estás seguro de que deseas eliminar este cliente?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {errorCarga ? 'Entendido' : 'Cancelar'}
        </Button>
        {!errorCarga && (
        <Button variant="danger" onClick={eliminarCliente}>
          Eliminar
        </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCliente;
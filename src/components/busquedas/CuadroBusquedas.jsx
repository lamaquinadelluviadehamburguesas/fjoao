import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CuadroBusquedas = ({ textoBusqueda, manejarCambioBusqueda, placeholder = "Buscar..." }) => {
  return (
    <InputGroup>
      <InputGroup.Text>
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        type="text"
        value={textoBusqueda}
        onChange={manejarCambioBusqueda}
        placeholder={placeholder}
        aria-label="Búsqueda"
      />
    </InputGroup>
  );
};

export default CuadroBusquedas;
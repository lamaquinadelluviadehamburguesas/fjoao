import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from "/vite.svg"; // Importación del logo de la ferretería
import "bootstrap-icons/font/bootstrap-icons.css"; // Importación de íconos de Bootstrap
import "../../App.css";

const Encabezado = () => {
  const [estaColapsado, setEstaColapsado] = useState(false);
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const estaLogueado = !!localStorage.getItem("usuario") && !!localStorage.getItem("contraseña");

  const cerrarSesion = () => {
    setEstaColapsado(false);
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  const alternarColapso = () => setEstaColapsado(!estaColapsado);

  const navegarA = (ruta) => {
    navegar(ruta);
    setEstaColapsado(false);
  };

  return (
    <Navbar expand="sm" fixed="top" className="color-navbar">
      <Container>
        <Navbar.Brand
          onClick={() => navegarA("/inicio")}
          className="text-white"
          style={{ cursor: "pointer" }}
        >
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{" "}
          <strong>Ferretería Selva</strong>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-sm"
          onClick={alternarColapso}
        />

        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
          show={estaColapsado}
          onHide={() => setEstaColapsado(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-sm"
              className={estaColapsado ? "color-texto-marca" : "text-white"}
            >
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                onClick={() => navegarA("/inicio")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Inicio</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/categorias")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-list-ul me-2"></i> : null}
                <strong>Categorías</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/clientes")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-people-fill me-2"></i> : null}
                <strong>Clientes</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/CatalogoProductos")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-people-fill me-2"></i> : null}
                <strong>CatalogoProductos</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/ventas")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-cart-fill me-2"></i> : null}
                <strong>Ventas</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/compras")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-bag-fill me-2"></i> : null}
                <strong>Compras</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/productos")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-box-seam me-2"></i> : null}
                <strong>Productos</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/usuarios")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-person-fill me-2"></i> : null}
                <strong>Usuarios</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/empleados")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-person-workspace me-2"></i> : null}
                <strong>Empleados</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/estadisticas")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-bar-chart-fill me-2"></i> : null}
                <strong>Estadísticas</strong>
              </Nav.Link>

              <Nav.Link
                onClick={() => navegarA("/Dashboard")}
                className={estaColapsado ? "text-black" : "text-white"}
              >
                {estaColapsado ? <i className="bi-speedometer2 me-2"></i> : null}
                <strong>Dashboard</strong>
              </Nav.Link>

              {estaLogueado ? (
                <Nav.Link
                  onClick={cerrarSesion}
                  className={estaColapsado ? "text-black" : "text-white"}
                >
                  {estaColapsado ? <i className="bi-box-arrow-right me-2"></i> : null}
                  <strong>Cerrar Sesión</strong>
                </Nav.Link>
              ) : (
                ubicacion.pathname === "/" && (
                  <Nav.Link
                    onClick={() => navegarA("/")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    {estaColapsado ? <i className="bi-box-arrow-in-right me-2"></i> : null}
                    <strong>Iniciar Sesión</strong>
                  </Nav.Link>
                )
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
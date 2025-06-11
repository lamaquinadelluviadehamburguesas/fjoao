import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ghostIcon from '../../assets/ghost.png';
import casaIcon from '../../assets/casa.png';
import biIcon from '../../assets/bi.png';
import diagramIcon from '../../assets/diagrama.png';
import empleadosIcon from '../../assets/empleado.png';
import MenuButton from './MenuButton';

const Encabezado = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [esUsuarioNuevo, setEsUsuarioNuevo] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si el usuario está logueado y su rol
  useEffect(() => {
    const verificarUsuario = () => {
      const usuario = localStorage.getItem('usuario');
      const contraseña = localStorage.getItem('contraseña');
      const rol = localStorage.getItem('rol');
      
      if (!usuario || !contraseña) {
        if (location.pathname !== '/') {
          navigate('/');
        }
        return;
      }

      // Si es el usuario eli o tiene rol admin, tiene acceso completo
      if (usuario.toLowerCase() === 'eli' || rol === 'admin') {
        setEsUsuarioNuevo(false);
        return;
      }

      // Para otros usuarios, verificar su rol
      setEsUsuarioNuevo(rol === 'nuevo');
    };

    verificarUsuario();
  }, [navigate, location.pathname]);

  // Manejar cierre de sesión
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('contraseña');
    localStorage.removeItem('rol');
    navigate('/');
  };

  // Verificar si el usuario está logueado
  const isLoggedIn = () => {
    return localStorage.getItem('usuario') && localStorage.getItem('contraseña');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to={isLoggedIn() ? '/inicio' : '/'}>
          hola mundo <img src={ghostIcon} alt="ghost" style={{ width: '1.2rem', marginLeft: '5px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" disabled={!isLoggedIn()} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Dropdown show={showDropdown} onToggle={() => setShowDropdown(!showDropdown)} disabled={!isLoggedIn()}>
              <MenuButton onClick={() => setShowDropdown(!showDropdown)} disabled={!isLoggedIn()} />
              <Dropdown.Menu>
                {/* Mostrar todas las opciones para usuarios no nuevos */}
                {!esUsuarioNuevo && (
                  <>
                    <Dropdown.Item as={Link} to="/inicio">
                      Inicio <img src={casaIcon} alt="casa" style={{ width: '1.2rem', marginLeft: '20px' }} />
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/productos">
                      Productos
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/categorias">
                      Categorías
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/clientes">
                      Clientes
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/ventas">
                      Ventas
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/compras">
                      Compras
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/usuarios">
                      Usuarios
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/empleados">
                      Empleados <img src={empleadosIcon} alt="empleados" style={{ width: '1.2rem', marginLeft: '20px' }} />
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/estadisticas">
                      Estadísticas <img src={diagramIcon} alt="estadisticas" style={{ width: '1.2rem', marginLeft: '20px' }} />
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/Dashboard">
                      Dashboard <img src={biIcon} alt="dashboard" style={{ width: '1.2rem', marginLeft: '20px' }} />
                    </Dropdown.Item>
                  </>
                )}

                {/* Siempre mostrar el catálogo */}
                <Dropdown.Item as={Link} to="/catalogoProductos">
                  Catálogo
                </Dropdown.Item>

                <Dropdown.Divider />

                {/* Siempre mostrar cerrar sesión */}
                <Dropdown.Item onClick={cerrarSesion}>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
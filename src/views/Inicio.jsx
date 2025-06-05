import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";
import Proposito from "../components/Proposito";
import PiePagina from "../components/PiePagina";
import cafeImage from "../assets/imagenes/cafe.png";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1">
        <div className="text-center my-4">
          <h1>¡Bienvenido, {nombreUsuario}!</h1>
          <p>Estás en la página de inicio.</p>
          <Button variant="danger" onClick={cerrarSesion}>Cerrar Sesión</Button>
        </div>

        <div className="text-center mb-5">
          <Image 
            src={cafeImage} 
            alt="Imagen de café" 
            fluid 
            style={{ 
              maxHeight: '400px', 
              objectFit: 'cover',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        </div>
        
        <Proposito />
      </Container>
      
      <PiePagina />
    </div>
  );
};

export default Inicio;
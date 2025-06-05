import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginForm from "../components/login/LoginForm";
import RegistroForm from "../components/login/RegistroForm";
import "../app.css";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const navegar = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Intentando iniciar sesión con:", nombreUsuario);
      
      const respuesta = await fetch("http://localhost:3000/api/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          usuario: nombreUsuario, 
          contraseña: contraseña 
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const datos = await respuesta.json();
      
      if (datos && datos.verificado) {
        localStorage.setItem("usuario", nombreUsuario);
        localStorage.setItem("contraseña", contraseña);
        
        if (nombreUsuario.toLowerCase() === 'eli') {
          localStorage.setItem("rol", "admin");
          navegar("/inicio");
        } else {
          localStorage.setItem("rol", datos.rol || "nuevo");
          navegar(datos.rol === "nuevo" ? "/catalogoProductos" : "/inicio");
        }
      } else {
        setError(datos.mensaje || "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error al conectar con el servidor. Por favor, intenta de nuevo.");
    }
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError(null);

    if (nombreUsuario.toLowerCase() === 'eli') {
      setError("Este nombre de usuario no está disponible");
      return;
    }

    try {
      // Primero verificamos si el usuario existe
      const respuestaVerificacion = await fetch("http://localhost:3000/api/verificarUsuarioExistente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: nombreUsuario }),
      });

      if (!respuestaVerificacion.ok) {
        // Si el endpoint no existe, procedemos directamente con el registro
        if (respuestaVerificacion.status === 404) {
          await registrarUsuario();
          return;
        }
        throw new Error('Error al verificar usuario existente');
      }

      const datosVerificacion = await respuestaVerificacion.json();

      if (datosVerificacion.existe) {
        setError("Este nombre de usuario ya está registrado");
        return;
      }

      await registrarUsuario();

    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error al conectar con el servidor. Por favor, intenta de nuevo.");
    }
  };

  const registrarUsuario = async () => {
    try {
      const respuestaRegistro = await fetch("http://localhost:3000/api/registrarusuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          usuario: nombreUsuario, 
          contraseña: contraseña,
          rol: 'nuevo'
        }),
      });

      if (!respuestaRegistro.ok) {
        throw new Error('Error al registrar usuario');
      }

      const datosRegistro = await respuestaRegistro.json();

      if (datosRegistro.success) {
        localStorage.setItem("usuario", nombreUsuario);
        localStorage.setItem("contraseña", contraseña);
        localStorage.setItem("rol", "nuevo");
        navegar("/catalogoProductos");
      } else {
        setError(datosRegistro.mensaje || "Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error al registrar el usuario. Por favor, intenta de nuevo.");
    }
  };

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const rolGuardado = localStorage.getItem("rol");
    
    if (usuarioGuardado) {
      if (usuarioGuardado.toLowerCase() === 'eli' || rolGuardado === 'admin') {
        navegar("/inicio");
      } else {
        navegar(rolGuardado === 'nuevo' ? "/catalogoProductos" : "/inicio");
      }
    }
  }, [navegar]);

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      {!mostrarRegistro ? (
        <LoginForm
          email={nombreUsuario}
          password={contraseña}
          error={error}
          setEmail={setNombreUsuario}
          setPassword={setContraseña}
          manejarEnvio={manejarEnvio}
          irARegistro={() => setMostrarRegistro(true)}
        />
      ) : (
        <RegistroForm
          email={nombreUsuario}
          password={contraseña}
          error={error}
          setEmail={setNombreUsuario}
          setPassword={setContraseña}
          manejarRegistro={manejarRegistro}
          volverALogin={() => setMostrarRegistro(false)}
        />
      )}
    </Container>
  );
};

export default Login;
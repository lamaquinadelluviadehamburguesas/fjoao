import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import Productos from "./views/Productos";
import Categorias from "./views/Categorias";
import Clientes from "./views/Clientes";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Usuarios from "./views/Usuarios";
import Empleados from "./views/Empleados";
import CatalogoProductos from "./views/CatalogoProductos";
import Estadisticas from "./views/Estadisticas"; // Nuevo componente para estadísticas
import Dashboard from "./views/Dashboard"; // Componente con el iframe de Power BI
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/catalogoProductos" element={<CatalogoProductos />} />
          <Route path="/estadisticas" element={<Estadisticas />} /> {/* Usa Estadisticas aquí */}
          <Route path="/Dashboard" element={<Dashboard />} /> {/* Usa Dashboard aquí */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
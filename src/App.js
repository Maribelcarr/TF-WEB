import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormCarga from './FormCarga';
import ProductForm from './ProductForm';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/todos">Productos</Link> | <Link to="/agregarProducto">Agregar Producto</Link>
        </nav>
        <Routes>
          <Route path="/todos" element={<FormCarga />} />
          <Route path="/agregarProducto" element={<ProductForm />} />
          <Route path="/editarProducto/:id" element={<ProductForm />} />
          <Route path="*" element={<div>Página no encontrada</div>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;



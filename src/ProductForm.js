import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState ('');
  const [peso, setPeso] = useState ('');
  const [precio, setPrecio] =useState ('');
  const [stock, setStock] = useState ('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/info/${id}`)
        .then(response => response.json())
        .then(data => {
          setNombre(data.nombre);
          setCategoria(data.categoria);
          setDescripcion(data.descripcion);
          setPeso(data.peso);
          setPrecio(data.precio);
          setStock(data.stock);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:4000/editarProducto/${id}` : 'http://localhost:4000/agregarProducto';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, categoria, descripcion, peso, precio, stock }),
    })
      .then(() => navigate('/todos'))
      .catch(error => console.error('Error saving product:', error));
  };

  return (
    <div>
      <h2>{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div>
          <label>Categoria</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </div>
         
        <div>
          <label>Descripcion</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <div>
          <label>Peso</label>
          <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} required />
        </div>

         <div>
          <label>Precio</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <div>
          <label>Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>

        <button type="submit">{id ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
};

export default ProductForm;















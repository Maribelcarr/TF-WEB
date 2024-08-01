import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FormCarga = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/todos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('Expected an array but got:', data);
          setError('Error al cargar productos.');
          setProductos([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error al cargar productos');
        setProductos([]); 
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }



  const eliminarProducto = (id) => {
    fetch(`http://localhost:4000/eliminarProducto/${id}`, { method: 'DELETE' })
      .then(() => {
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };



  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.categoria}  - {producto.descripcion} -   {producto.peso}- {producto.precio} - {producto.stock}
            <Link to={`/editarProducto/${producto.id}`}>Editar</Link>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCarga;

import React, { useState, useEffect } from 'react';
import { getCreditProducts } from '../firebase/creditService';

import CreditCard from '../components/CreditCard'; 
import LoadingSpinner from '../components/LoadingSpinner'; 

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);   
        
        const data = await getCreditProducts(); 
        setProducts(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
        <h1>⚠️ Error al cargar los datos</h1>
        <p>{error}</p>
        <p>Por favor, verifique su conexión y el estado de su Firebase Console.</p>
      </div>
    );
  }
  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Productos Crediticios Disponibles</h2>
      {products.length === 0 ? (
        <p>No se encontraron productos crediticios en la base de datos. Cree algunos en Firebase Console.</p>
      ) : (
        <div className="products-list">
            {products.map(product => (
            <CreditCard key={product.id} product={product} /> 
            ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
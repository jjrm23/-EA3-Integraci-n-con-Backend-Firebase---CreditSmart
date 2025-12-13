import React from 'react';

function CreditCard({ product }) { 
  if (!product) {
    return null; 
  }

  return (
    <div 
      className="credit-card" 
      style={{ 
        border: '1px solid #ccc', 
        padding: '15px', 
        margin: '10px 0', 
        borderRadius: '5px', 
        backgroundColor: '#f9f9f9'
      }}
    >
      <h3>{product.nombre || 'Producto Desconocido'}</h3>
      <p>Tasa de Interés: <strong>{product.tasaInteres}%</strong></p>
      <p>Monto Máximo: ${product.montoMaximo ? product.montoMaximo.toLocaleString() : 'N/A'}</p>
      <button style={{ 
          padding: '8px 15px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '3px' 
      }}>
        Solicitar Ahora
      </button>
    </div>
  );
}

export default CreditCard;
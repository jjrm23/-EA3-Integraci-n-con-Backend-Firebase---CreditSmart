import React, { useState, useEffect } from 'react';
import { getMyRequests } from '../firebase/creditService';
import LoadingSpinner from '../components/LoadingSpinner'; 

function MyRequestsPage() {
  const userEmail = "test@user.com"; 
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userEmail) {
        setError("Error: Email del usuario no disponible para filtrar.");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await getMyRequests(userEmail); 
        setRequests(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userEmail]); 

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
        <h1>⚠️ Error al cargar solicitudes</h1>
        <p>{error}</p>
        <p>Verifique que el email de prueba (`{userEmail}`) esté configurado correctamente en el código.</p>
      </div>
    );
  }
  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Mis Solicitudes de Crédito</h2>
      <p>Consultando solicitudes para: <strong>{userEmail}</strong>. Total: {requests.length}</p>

      {requests.length === 0 ? (
        <p style={{ marginTop: '20px', padding: '15px', borderLeft: '4px solid orange', backgroundColor: '#fff8e1' }}>
            No tienes solicitudes registradas con este email. ¡Crea una ahora!
        </p>
      ) : (
        <table className="requests-table" style={tableStyles}>
          <thead>
            <tr style={headerStyles}>
              <th style={cellStyles}>ID de Solicitud</th>
              <th style={cellStyles}>Producto</th>
              <th style={cellStyles}>Monto</th>
              <th style={cellStyles}>Fecha Solicitud</th>
              <th style={cellStyles}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={rowStyles}>
                <td style={cellStyles}>{req.id.substring(0, 6)}...</td>
                <td style={cellStyles}>{req.producto || 'N/A'}</td>
                <td style={cellStyles}>${req.monto ? req.monto.toLocaleString() : '0'}</td>
                <td style={cellStyles}>
                  {new Date(req.fechaSolicitud).toLocaleDateString()}
                </td>
                <td style={{ ...cellStyles, ...getStatusStyle(req.estado) }}>
                  <strong>{req.estado}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
};

const headerStyles = {
    backgroundColor: '#004d99', 
    color: 'white',
    textAlign: 'left'
};

const cellStyles = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
};

const rowStyles = {
    transition: 'background-color 0.2s'
};

const getStatusStyle = (status) => {
    switch (status) {
        case 'Pendiente':
            return { color: '#ffc107', backgroundColor: '#fff3cd' };
        case 'Aprobada':
            return { color: '#28a745', backgroundColor: '#d4edda' };
        case 'Rechazada':
            return { color: '#dc3545', backgroundColor: '#f8d7da' };
        default:
            return {};
    }
};

export default MyRequestsPage;
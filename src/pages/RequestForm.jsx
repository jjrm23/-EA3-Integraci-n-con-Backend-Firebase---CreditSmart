import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createCreditRequest } from '../firebase/creditService';

function RequestForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    monto: 0,
    producto: '' 
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'monto' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!formData.nombre.trim() || !formData.email.trim() || formData.monto <= 1000 || !formData.producto.trim()) {
      setMessage("🚨 Por favor, asegúrese de completar todos los campos y que el monto sea mayor a $1,000.");
      return;
    }

    setLoading(true);
    try {
      const newRequestId = await createCreditRequest(formData);
      setFormData({ nombre: '', email: '', monto: 0, producto: '' }); 
      
      setMessage(`✅ Solicitud enviada con éxito. ID: ${newRequestId}. Redireccionando...`);
      
      setTimeout(() => {
        navigate('/mis-solicitudes'); 
      }, 2500);

    } catch (error) {
      setMessage(`❌ Error al enviar la solicitud: ${error.message}`); 
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Crear Nueva Solicitud de Crédito</h2>
      {message && <p style={{ padding: '10px', border: '1px solid', color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        
        {}
        <label>Nombre Completo:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} disabled={loading} required />
        
        {}
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={loading} required />
        
        {}
        <label>Monto Solicitado:</label>
        <input type="number" name="monto" value={formData.monto} onChange={handleChange} disabled={loading} required min="1000" />
        
        {}
        <label>Producto a solicitar:</label>
        <select name="producto" value={formData.producto} onChange={handleChange} disabled={loading} required>
          <option value="">Seleccione un producto</option>
          <option value="Hipotecario">Crédito Hipotecario</option>
          <option value="Vehicular">Crédito Vehicular</option>
          <option value="Personal">Crédito Personal</option>
        </select>
        
        <button type="submit" disabled={loading} style={{ marginTop: '20px', padding: '10px', backgroundColor: loading ? '#ccc' : '#007bff', color: 'white' }}>
          {loading ? 'Guardando Solicitud...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}

export default RequestForm;
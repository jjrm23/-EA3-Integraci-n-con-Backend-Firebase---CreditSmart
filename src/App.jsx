import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react'; 
import HomePage from './pages/HomePage';         
import RequestForm from './pages/RequestForm';   
import MyRequestsPage from './pages/MyRequestsPage'; 

const Navbar = () => (
  <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
      <li><Link to="/">Home (Productos)</Link></li>
      <li><Link to="/solicitar">Solicitar Crédito</Link></li>
      <li><Link to="/mis-solicitudes">Mis Solicitudes</Link></li>
    </ul>
  </nav>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content" style={{ padding: '20px' }}>
        <Routes>
          {}
          <Route path="/" element={<HomePage />} />
          
          {}
          <Route path="/solicitar" element={<RequestForm />} />
          
          {}
          <Route path="/mis-solicitudes" element={<MyRequestsPage />} />

          {}
          <Route path="*" element={<h1>404 | Página No Encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
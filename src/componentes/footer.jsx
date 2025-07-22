import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const location = useLocation();

  // Mostrar solo si NO estamos en / (login)
  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="footer-container">
      <p>&copy; 2025 FormularioWeb - Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;

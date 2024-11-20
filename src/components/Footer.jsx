/*
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p><strong>Florida Express Cochabamba</strong></p>
      <p>Cochabamba - Cercado, Bolivia</p>
      <div className="credits">
        <p>© ATT 2024 | All Rights Reserved | Developed by the department</p>
        <p>LLanos Vega Juan Carlos - Programación Web</p>
      </div>
      <div className="social-icons">
        <ul>
          <li><a href="#">SÍGUENOS</a></li>
          <li><a href="#"><i className="fab fa-youtube"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          <li><a href="#"><i className="fab fa-telegram-plane"></i></a></li>
          <li><a href="#"><i className="fas fa-map-marker-alt"></i></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
*/

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="locations">
        <p>Florida Express Cochabamba</p>
        <p>Cochabamba - Cercado, Bolivia</p>
      </div>
      <div className="credits">
        <p>© ATT 2024 | Todos los derechos reservados | Desarrollado por el departamento</p>
        <p>LLanos Vega Juan Carlos - Programación Web</p>
      </div>
      <div className="footer-indicators">
        <span className="indicator"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
      </div>
    </footer>
  );
};

export default Footer;
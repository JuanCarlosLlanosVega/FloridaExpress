import React from 'react';
import logo from '../assets/9.JPG'; // Imagen del logo

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo Florida Express Cbba." className="logo-image" />
        <span className="logo-text">Florida Express Cbba.</span>
      </div>
      <div className="menu-icon">☰</div>
    </header>
  );
};

export default Header;
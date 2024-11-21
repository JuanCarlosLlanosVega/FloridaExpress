
/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <main className="admin-container">
      <h2>Administración</h2>
      <div className="admin-buttons">
        <button className="btn-admin" onClick={() => navigate('/registro-flota')}>
          <i className="fas fa-bus"></i> Flotas
        </button>
        <button className="btn-admin" onClick={() => navigate('/registro-conductor')}>
          <i className="fas fa-user-tie"></i> Conductores
        </button>
        <button className="btn-admin"><i className="fas fa-map-marked-alt"></i> Rutas</button>
        <button className="btn-admin"><i className="fas fa-calendar-alt"></i> Salidas</button>
        <button className="btn-admin"><i className="fas fa-map-pin"></i> Paradas</button>
        <button className="btn-admin"><i className="fas fa-ticket-alt"></i> Boletos</button>
        <button className="btn-admin"><i className="fas fa-money-check-alt"></i> Pagos</button>
        <button className="btn-admin"><i className="fas fa-credit-card"></i> Facturación</button>
      </div>
    </main>
  );
};

export default Admin;
*/

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [showFlotasMenu, setShowFlotasMenu] = useState(false);

  // Función para manejar el clic en el botón "Flotas"
  const handleFlotasClick = () => {
    setShowFlotasMenu(!showFlotasMenu);
  };

  return (
    <main className="admin-container">
      <h2>Administración</h2>
      <div className="admin-buttons">
        /* Botón para Flotas con menú desplegable */
        /*
        <button className="btn-admin" onClick={handleFlotasClick}>
          <i className="fas fa-bus"></i> Flotas
        </button>

        /* Menú desplegable para opciones de Flotas */
        /*
        {showFlotasMenu && (
          <div className="dropdown-menu">

            <button
              className="dropdown-item"
              onClick={() => navigate('/registro-flota')}
            >
              Registrar Flotas
            </button>
            <button
              className="dropdown-item"
              onClick={() => navigate('/lista-flotas')}
            >
              Lista Flotas
            </button>


          </div>
        )}

        <button className="btn-admin" onClick={() => navigate('/registro-conductor')}>
          <i className="fas fa-user-tie"></i> Conductores
        </button>
        <button className="btn-admin"><i className="fas fa-map-marked-alt"></i> Rutas</button>
        <button className="btn-admin"><i className="fas fa-calendar-alt"></i> Salidas</button>
        <button className="btn-admin"><i className="fas fa-map-pin"></i> Paradas</button>
        <button className="btn-admin"><i className="fas fa-ticket-alt"></i> Boletos</button>
        <button className="btn-admin"><i className="fas fa-money-check-alt"></i> Pagos</button>
        <button className="btn-admin"><i className="fas fa-credit-card"></i> Facturación</button>
      </div>
    </main>
  );
};

export default Admin;
*/

/*

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [showFlotasMenu, setShowFlotasMenu] = useState(false);
  const [showConductoresMenu, setShowConductoresMenu] = useState(false);

  // Función para manejar el clic en el botón "Flotas"
  const handleFlotasClick = () => {
    setShowFlotasMenu(!showFlotasMenu);
  };

  // Función para manejar el clic en el botón "Conductores"
  const handleConductoresClick = () => {
    setShowConductoresMenu(!showConductoresMenu);
  };

  return (
    <main className="admin-container">
      <h2>Administración</h2>
      <div className="admin-buttons">
        /* Botón para Flotas con menú desplegable */
        /*
        <button className="btn-admin" onClick={handleFlotasClick}>
          <i className="fas fa-bus"></i> Flotas
        </button>

        {showFlotasMenu && (
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => navigate('/registro-flota')}
            >
              Registrar Flotas
            </button>
            <button
              className="dropdown-item"
              onClick={() => navigate('/lista-flotas')}
            >
              Lista Flotas
            </button>
          </div>
        )}

        /* Botón para Conductores con menú desplegable */
        /*
        <button className="btn-admin" onClick={handleConductoresClick}>
          <i className="fas fa-user-tie"></i> Conductores
        </button>

        {showConductoresMenu && (
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => navigate('/registro-conductor')}
            >
              Registrar Conductor
            </button>
            <button
              className="dropdown-item"
              onClick={() => navigate('/lista-conductores')}
            >
              Lista Conductores
            </button>
          </div>
        )}

        /* Otros botones adicionales */
        /*
        <button className="btn-admin" onClick={() => navigate('/rutas')}>
          <i className="fas fa-map-marked-alt"></i> Rutas
        </button>
        <button className="btn-admin" onClick={() => navigate('/salidas')}>
          <i className="fas fa-calendar-alt"></i> Salidas
        </button>
        <button className="btn-admin" onClick={() => navigate('/paradas')}>
          <i className="fas fa-map-pin"></i> Paradas
        </button>
        <button className="btn-admin" onClick={() => navigate('/boletos')}>
          <i className="fas fa-ticket-alt"></i> Boletos
        </button>
        <button className="btn-admin" onClick={() => navigate('/pagos')}>
          <i className="fas fa-money-check-alt"></i> Pagos
        </button>
        <button className="btn-admin" onClick={() => navigate('/facturacion')}>
          <i className="fas fa-credit-card"></i> Facturación
        </button>
      </div>
    </main>
  );
};

export default Admin;
*/

/*
HOY

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [showFlotasMenu, setShowFlotasMenu] = useState(false);
  const [showConductoresMenu, setShowConductoresMenu] = useState(false);
  const [showRutasMenu, setShowRutasMenu] = useState(false);

  // Función para manejar el clic en el botón "Flotas"
  const handleFlotasClick = () => {
    setShowFlotasMenu(!showFlotasMenu);
  };

  // Función para manejar el clic en el botón "Conductores"
  const handleConductoresClick = () => {
    setShowConductoresMenu(!showConductoresMenu);
  };

  // Función para manejar el clic en el botón "Rutas"
  const handleRutasClick = () => {
    setShowRutasMenu(!showRutasMenu);
  };

  return (
    <main className="admin-container">
      <h2>Administración</h2>
      <div className="admin-buttons">
        /* Menú desplegable para Flotas *
        <button className="btn-admin" onClick={handleFlotasClick}>
          <i className="fas fa-bus"></i> Flotas
        </button>
        {showFlotasMenu && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/registro-flota')}>
              Registrar Flotas
            </button>
            <button className="dropdown-item" onClick={() => navigate('/lista-flotas')}>
              Lista Flotas
            </button>
          </div>
        )}

        /* Menú desplegable para Conductores 

        <button className="btn-admin" onClick={handleConductoresClick}>
          <i className="fas fa-user-tie"></i> Conductores
        </button>
        {showConductoresMenu && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/registro-conductor')}>
              Registrar Conductor
            </button>
            <button className="dropdown-item" onClick={() => navigate('/lista-conductores')}>
              Lista Conductores
            </button>
          </div>
        )}

        /* Menú desplegable para Rutas 

        <button className="btn-admin" onClick={handleRutasClick}>
          <i className="fas fa-map-marked-alt"></i> Rutas
        </button>
        {showRutasMenu && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/registro-rutas')}>
              Registrar Ruta
            </button>
            <button className="dropdown-item" onClick={() => navigate('/lista-rutas')}>
              Lista Rutas
            </button>
          </div>
        )}

        /* Otros botones adicionales 

        <button className="btn-admin" onClick={() => navigate('/salidas')}>
          <i className="fas fa-calendar-alt"></i> Salidas
        </button>
        <button className="btn-admin" onClick={() => navigate('/paradas')}>
          <i className="fas fa-map-pin"></i> Paradas
        </button>
        <button className="btn-admin" onClick={() => navigate('/boletos')}>
          <i className="fas fa-ticket-alt"></i> Boletos
        </button>
        <button className="btn-admin" onClick={() => navigate('/pagos')}>
          <i className="fas fa-money-check-alt"></i> Pagos
        </button>
        <button className="btn-admin" onClick={() => navigate('/facturacion')}>
          <i className="fas fa-credit-card"></i> Facturación
        </button>
      </div>
    </main>
  );
};

export default Admin;
*/

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const [showFlotasMenu, setShowFlotasMenu] = useState(false);
  const [showConductoresMenu, setShowConductoresMenu] = useState(false);
  const [showRutasMenu, setShowRutasMenu] = useState(false);
  const [showSalidasMenu, setShowSalidasMenu] = useState(false);

  // Funciones para manejar menús desplegables
  const handleFlotasClick = () => {
    setShowFlotasMenu(!showFlotasMenu);
  };

  const handleConductoresClick = () => {
    setShowConductoresMenu(!showConductoresMenu);
  };

  const handleRutasClick = () => {
    setShowRutasMenu(!showRutasMenu);
  };

  const handleSalidasClick = () => {
    setShowSalidasMenu(!showSalidasMenu);
  };

  return (
    <main className="admin-container">
      <h2>Administración</h2>
      <div className="admin-buttons">
        {/* Menú desplegable para Flotas */}
        <button className="btn-admin" onClick={handleFlotasClick}>
          <i className="fas fa-bus"></i> Flotas
        </button>
        {showFlotasMenu && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/registro-flota')}>
              Registrar Flotas
            </button>
            <button className="dropdown-item" onClick={() => navigate('/lista-flotas')}>
              Lista Flotas
            </button>
          </div>
        )}

        {/* Menú desplegable para Conductores */}
        <button className="btn-admin" onClick={handleConductoresClick}>
          <i className="fas fa-user-tie"></i> Conductores
        </button>
        {showConductoresMenu && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/registro-conductor')}>
              Registrar Conductor
            </button>
            <button className="dropdown-item" onClick={() => navigate('/lista-conductores')}>
              Lista Conductores
            </button>
          </div>
        )}

        {/* Menú desplegable para Rutas */}
        <button className="btn-admin" onClick={handleRutasClick}>
          <i className="fas fa-map-marked-alt"></i> Rutas
        </button>
        {showRutasMenu && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => navigate('/registro-rutas')}>
              Registrar Ruta
            </button>
            <button className="dropdown-item" onClick={() => navigate('/lista-rutas')}>
              Lista Rutas
            </button>
          </div>
        )}

        {/* Menú desplegable para Salidas */}
        <button className="btn-admin" onClick={handleSalidasClick}>
          <i className="fas fa-calendar-alt"></i> Salidas
        </button>
        {showSalidasMenu && (
          <div className="dropdown-menu">

            <button className="dropdown-item" onClick={() => navigate('/registro-horario')}>
              Registrar Horario
            </button>

            <button className="dropdown-item" onClick={() => navigate('/lista-horarios')}>
              Lista Horarios
            </button>



          </div>
        )}

        {/* Otros botones adicionales */}
        <button className="btn-admin" onClick={() => navigate('/paradas')}>
          <i className="fas fa-map-pin"></i> Paradas
        </button>
        <button className="btn-admin" onClick={() => navigate('/boletos')}>
          <i className="fas fa-ticket-alt"></i> Boletos
        </button>
        <button className="btn-admin" onClick={() => navigate('/pagos')}>
          <i className="fas fa-money-check-alt"></i> Pagos
        </button>
        <button className="btn-admin" onClick={() => navigate('/facturacion')}>
          <i className="fas fa-credit-card"></i> Facturación
        </button>
      </div>
    </main>
  );
};

export default Admin;

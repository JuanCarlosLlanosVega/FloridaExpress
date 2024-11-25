import React from 'react';

const ViajeFlota = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Selección de Asientos</h1>
      <p>Por favor, seleccione sus asientos para el viaje.</p>

   
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
        }}
      >
    
        <div style={{ border: '1px solid black', padding: '20px' }}>
          <h3>Zona de asientos</h3>
          <p>(Aquí puedes implementar una funcionalidad para seleccionar asientos)</p>
        </div>
      </div>

      
      <button
        style={{
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Continuar
      </button>
    </div>
  );
};

export default ViajeFlota;

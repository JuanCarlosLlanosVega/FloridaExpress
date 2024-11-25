import React, { useState } from 'react';

const SeleccionAsientos = () => {
  // Estado para los asientos seleccionados
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

  // Manejar selección y deselección de asientos
  const handleSeleccionAsiento = (numero) => {
    if (asientosSeleccionados.includes(numero)) {
      // Si el asiento ya está seleccionado, deseleccionarlo
      setAsientosSeleccionados(asientosSeleccionados.filter((asiento) => asiento !== numero));
    } else {
      // Si el asiento no está seleccionado, agregarlo
      setAsientosSeleccionados([...asientosSeleccionados, numero]);
    }
  };

  // Generar los asientos
  const generarAsientos = (inicio, fin) => {
    const asientos = [];
    for (let i = inicio; i <= fin; i++) {
      asientos.push(
        <div
          key={i}
          onClick={() => handleSeleccionAsiento(i)}
          style={{
            width: '40px',
            height: '40px',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            backgroundColor: asientosSeleccionados.includes(i) ? 'gray' : 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {i}
        </div>
      );
    }
    return asientos;
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Selección de Asientos</h1>

      {/* Indicadores de estado */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'gray',
              marginRight: '10px',
              borderRadius: '5px',
            }}
          ></div>
          Ocupado
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'white',
              border: '1px solid black',
              marginRight: '10px',
              borderRadius: '5px',
            }}
          ></div>
          Libre
        </div>
      </div>

      {/* Imágenes de planta alta y planta baja */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '50px', textAlign: 'center' }}>
          <img
            src={require('../assets/142.PNG')}
            alt="Planta Alta"
            style={{ width: '250px', height: 'auto' }}
          />
          <p>Planta Alta</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            src={require('../assets/143.PNG')}
            alt="Planta Baja"
            style={{ width: '250px', height: 'auto' }}
          />
          <p>Planta Baja</p>
        </div>
      </div>

      {/* Asientos */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {generarAsientos(1, 30)} {/* Generar asientos de 1 a 30 */}
        </div>
        <div style={{ width: '50px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {generarAsientos(31, 43)} {/* Generar asientos de 31 a 43 */}
        </div>
      </div>

      {/* Botón Continuar */}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => alert('Redireccionando a la próxima página...')}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SeleccionAsientos;


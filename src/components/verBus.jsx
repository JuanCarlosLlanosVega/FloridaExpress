import React from 'react';
import ReactImageMagnify from 'react-image-magnify'; // Importar la librería
import simImage from '../assets/sim.jpg';

const VerBus = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Información del Bus</h1>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Imagen del Bus',
            isFluidWidth: true,
            src: simImage,
          },
          largeImage: {
            src: simImage,
            width: 3000, // Ancho de la imagen ampliada
            height: 1000, // Altura de la imagen ampliada
          },
          lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }, // Estilo de la lupa
        }}
        style={{ margin: 'auto', maxWidth: '500px' }} // Ajusta el estilo del contenedor
      />
    </div>
  );
};

export default VerBus;

/*
import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mapear las rutas en el formato correcto
      const rutasFormat = rutasData.map(ruta => ({
        label: ruta.ruta, // Mostrar el campo 'ruta' (Ciudad Origen - Ciudad Destino)
        value: ruta.id,   // Usar el ID de la ruta
      }));

      setRutas(rutasFormat);
    };

    obtenerRutas();
  }, []);

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={rutas} // Opciones cargadas dinámicamente desde Firebase
        onChange={setRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

      
      {rutaSeleccionada && (
        <div style={{ marginTop: '20px' }}>
          <h3>Ruta Seleccionada</h3>
          <p>{rutaSeleccionada.label}</p>
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/


/*
import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios de la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mapear las rutas en el formato correcto
      const rutasFormat = rutasData.map(ruta => ({
        label: ruta.ruta, // Mostrar el campo 'ruta' (Ciudad Origen - Ciudad Destino)
        value: ruta.id,   // Usar el ID de la ruta
        horarios: {
          horarioSalida: ruta.horarioSalida,
          horarioLlegada: ruta.horarioLlegada,
        },
      }));

      setRutas(rutasFormat);
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios asociados a la ruta seleccionada
    const horariosFiltrados = rutas
      .filter((r) => r.value === ruta.value) // Coincidir con el ID de la ruta seleccionada
      .map((r) => ({
        label: `${r.horarios.horarioSalida} - ${r.horarios.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: `${r.horarios.horarioSalida} - ${r.horarios.horarioLlegada}`, // Usar como valor
      }));

    setHorarios(horariosFiltrados);
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={rutas} // Opciones cargadas dinámicamente desde Firebase
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

      
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtradas
            onChange={setHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      
      {horarioSeleccionado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Horario Seleccionado</h3>
          <p>{horarioSeleccionado.label}</p>
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/

/*
bien

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.label) // Coincidir por el nombre de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: `${r.horarioSalida} - ${r.horarioLlegada}`, // Usar como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={rutas.map(ruta => ({
          label: ruta.ruta, // Mostrar el nombre de la ruta
          value: ruta.ruta, // Usar el nombre de la ruta como identificador
        }))} // Generar opciones dinámicamente desde Firebase
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

    
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={setHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      
      {horarioSeleccionado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Horario Seleccionado</h3>
          <p>{horarioSeleccionado.label}</p>
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/


/*
import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
      }));

      // Filtrar rutas únicas (sin duplicados)
      const rutasUnicas = [...new Map(rutasData.map(ruta => [ruta.ruta, ruta])).values()];

      setRutas(rutasUnicas); // Guardar rutas únicas
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.label) // Coincidir por el nombre de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: `${r.horarioSalida} - ${r.horarioLlegada}`, // Usar como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={rutas.map(ruta => ({
          label: ruta.ruta, // Mostrar el nombre de la ruta
          value: ruta.ruta, // Usar el nombre de la ruta como identificador
        }))} // Generar opciones dinámicamente desde rutas únicas
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

     
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={setHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      
      {horarioSeleccionado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Horario Seleccionado</h3>
          <p>{horarioSeleccionado.label}</p>
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/

/*
MUY BUENO 

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.value) // Coincidir por el valor de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: `${r.horarioSalida} - ${r.horarioLlegada}`, // Usar como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={[...new Map(rutas.map(ruta => [ruta.ruta, { label: ruta.ruta, value: ruta.ruta }])).values()]} // Rutas únicas
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

      
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={setHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      
      {horarioSeleccionado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Horario Seleccionado</h3>
          <p>{horarioSeleccionado.label}</p>
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/

/*
EXCELENTE

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado
  const [precio, setPrecio] = useState(null); // Precio asociado al horario seleccionado
  const [tipoServicio, setTipoServicio] = useState(null); // Tipo de servicio asociado al horario seleccionado

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
        precioBs: doc.data().precioBs,
        tipoServicio: doc.data().tipoServicio,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.value) // Coincidir por el valor de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: r, // Pasar todo el objeto del horario como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
    setPrecio(null); // Reiniciar precio
    setTipoServicio(null); // Reiniciar tipo de servicio
  };

  // Manejar selección de horario
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
    setPrecio(horario.value.precioBs); // Establecer precio basado en el horario seleccionado
    setTipoServicio(horario.value.tipoServicio); // Establecer tipo de servicio basado en el horario seleccionado
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={[...new Map(rutas.map(ruta => [ruta.ruta, { label: ruta.ruta, value: ruta.ruta }])).values()]} // Rutas únicas
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

      
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={handleHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      
      {precio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Precio</label>
          <p>{precio} Bs</p>
        </div>
      )}

      
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Tipo de Servicio</label>
          <p>{tipoServicio}</p>
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/

/*
muy excelente 
import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado
  const [precio, setPrecio] = useState(null); // Precio asociado al horario seleccionado
  const [tipoServicio, setTipoServicio] = useState(null); // Tipo de servicio asociado al horario seleccionado
  const [fechaViaje, setFechaViaje] = useState(new Date()); // Fecha de viaje seleccionada

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
        precioBs: doc.data().precioBs,
        tipoServicio: doc.data().tipoServicio,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.value) // Coincidir por el valor de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: r, // Pasar todo el objeto del horario como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
    setPrecio(null); // Reiniciar precio
    setTipoServicio(null); // Reiniciar tipo de servicio
  };

  // Manejar selección de horario
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
    setPrecio(horario.value.precioBs); // Establecer precio basado en el horario seleccionado
    setTipoServicio(horario.value.tipoServicio); // Establecer tipo de servicio basado en el horario seleccionado
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

     
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={[...new Map(rutas.map(ruta => [ruta.ruta, { label: ruta.ruta, value: ruta.ruta }])).values()]} // Rutas únicas
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

     
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={handleHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

    
      {precio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Precio</label>
          <p>{precio} Bs</p>
        </div>
      )}

     
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Tipo de Servicio</label>
          <p>{tipoServicio}</p>
        </div>
      )}

      
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Selecciona Fecha de Viaje</label>
          <DatePicker
            selected={fechaViaje}
            onChange={(date) => setFechaViaje(date)} // Manejar cambio de fecha
            minDate={new Date()} // Solo fechas a partir del día actual
            dateFormat="yyyy-MM-dd" // Formato de fecha
            placeholderText="Selecciona una fecha"
          />
        </div>
      )}
    </div>
  );
};

export default Viajes;
*/


/*
penultimo

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado
  const [precio, setPrecio] = useState(null); // Precio asociado al horario seleccionado
  const [tipoServicio, setTipoServicio] = useState(null); // Tipo de servicio asociado al horario seleccionado
  const [fechaViaje, setFechaViaje] = useState(new Date()); // Fecha de viaje seleccionada
  const [estadoRuta, setEstadoRuta] = useState(null); // Estado de la ruta (Activo o Fuera de Servicio)
  const [mostrarModal, setMostrarModal] = useState(false); // Controlar el modal

  const db = getFirestore(); // Instancia de Firestore

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
        precioBs: doc.data().precioBs,
        tipoServicio: doc.data().tipoServicio,
        estado: doc.data().estado, // Estado de la ruta
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.value) // Coincidir por el valor de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: r, // Pasar todo el objeto del horario como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
    setPrecio(null); // Reiniciar precio
    setTipoServicio(null); // Reiniciar tipo de servicio
    setEstadoRuta(null); // Reiniciar estado de la ruta
  };

  // Manejar selección de horario
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
    setPrecio(horario.value.precioBs); // Establecer precio basado en el horario seleccionado
    setTipoServicio(horario.value.tipoServicio); // Establecer tipo de servicio basado en el horario seleccionado
    setEstadoRuta(horario.value.estado); // Guardar el estado de la ruta seleccionada
  };

  // Manejar clic en el botón Buscar
  const handleBuscar = () => {
    if (estadoRuta !== 'Activo') {
      // Mostrar modal si la ruta no está activa
      setMostrarModal(true);
    } else {
      // Redirigir a ViajeFlota.jsx si la ruta está activa
      window.location.href = '/viajeFlota';
    }
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={[...new Map(rutas.map(ruta => [ruta.ruta, { label: ruta.ruta, value: ruta.ruta }])).values()]} // Rutas únicas
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

     
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={handleHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      
      {precio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Precio</label>
          <p>{precio} Bs</p>
        </div>
      )}

      
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Tipo de Servicio</label>
          <p>{tipoServicio}</p>
        </div>
      )}

   
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Selecciona Fecha de Viaje</label>
          <DatePicker
            selected={fechaViaje}
            onChange={(date) => setFechaViaje(date)} // Manejar cambio de fecha
            minDate={new Date()} // Solo fechas a partir del día actual
            dateFormat="yyyy-MM-dd" // Formato de fecha
            placeholderText="Selecciona una fecha"
          />
        </div>
      )}

 
      {tipoServicio !== null && (
        <button
          onClick={handleBuscar}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Buscar
        </button>
      )}

     
      {mostrarModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setMostrarModal(false)} // Cerrar modal al hacer clic
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <h2>Esta ruta por el momento se encuentra fuera de servicio.</h2>
            <button
              onClick={() => setMostrarModal(false)} // Cerrar modal
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viajes;

*/

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore
import { useNavigate } from 'react-router-dom'; // Para redirigir programáticamente

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Ruta seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado
  const [precio, setPrecio] = useState(null); // Precio asociado al horario seleccionado
  const [tipoServicio, setTipoServicio] = useState(null); // Tipo de servicio asociado al horario seleccionado
  const [fechaViaje, setFechaViaje] = useState(new Date()); // Fecha de viaje seleccionada

  const db = getFirestore(); // Instancia de Firestore
  const navigate = useNavigate(); // Hook para redirigir programáticamente

  // Cargar rutas y horarios desde Firebase
  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map(doc => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
        precioBs: doc.data().precioBs,
        tipoServicio: doc.data().tipoServicio,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ruta
  const handleRutaSeleccionada = (ruta) => {
    setRutaSeleccionada(ruta);

    // Filtrar los horarios que coincidan con la ruta seleccionada
    const horariosFiltrados = rutas
      .filter(r => r.ruta === ruta.value) // Coincidir por el valor de la ruta seleccionada
      .map(r => ({
        label: `${r.horarioSalida} - ${r.horarioLlegada}`, // Mostrar horario de salida y llegada
        value: r, // Pasar todo el objeto del horario como valor
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
    setPrecio(null); // Reiniciar precio
    setTipoServicio(null); // Reiniciar tipo de servicio
  };

  // Manejar selección de horario
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
    setPrecio(horario.value.precioBs); // Establecer precio basado en el horario seleccionado
    setTipoServicio(horario.value.tipoServicio); // Establecer tipo de servicio basado en el horario seleccionado
  };

  // Manejar clic en el botón Buscar
  const handleBuscar = () => {
    navigate('/viajeFlota'); // Redirigir directamente a la página ViajeFlota.jsx
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      {/* Campo Ciudad Origen - Ciudad Destino */}
      <label>Ciudad Origen - Ciudad Destino</label>
      <Select
        options={[...new Map(rutas.map(ruta => [ruta.ruta, { label: ruta.ruta, value: ruta.ruta }])).values()]} // Rutas únicas
        onChange={handleRutaSeleccionada} // Manejar selección
        placeholder="Seleccione una ruta"
      />

      {/* Campo Horario Salida - Horario Llegada */}
      {rutaSeleccionada && (
        <>
          <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
          <Select
            options={horarios} // Opciones de horarios filtrados
            onChange={handleHorarioSeleccionado} // Manejar selección de horario
            placeholder="Seleccione un horario"
          />
        </>
      )}

      {/* Campo Precio */}
      {precio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Precio</label>
          <p>{precio} Bs</p>
        </div>
      )}

      {/* Campo Tipo de Servicio */}
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Tipo de Servicio</label>
          <p>{tipoServicio}</p>
        </div>
      )}

      {/* Campo Selecciona Fecha de Viaje */}
      {tipoServicio !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Selecciona Fecha de Viaje</label>
          <DatePicker
            selected={fechaViaje}
            onChange={(date) => setFechaViaje(date)} // Manejar cambio de fecha
            minDate={new Date()} // Solo fechas a partir del día actual
            dateFormat="yyyy-MM-dd" // Formato de fecha
            placeholderText="Selecciona una fecha"
          />
        </div>
      )}

      {/* Botón Buscar */}
      {tipoServicio !== null && (
        <button
          onClick={handleBuscar}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default Viajes;
